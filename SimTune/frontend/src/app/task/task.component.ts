import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Output, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PianoComponent } from "../piano/piano.component";
import { NotesystemComponent } from '../notesystem/notesystem.component';
import * as abcjs from 'abcjs';
import { jwtDecode } from 'jwt-decode';
import { API_URL, fetchRestEndpoint, fetchRestEndpointWithAuthorization, } from '../api-calls/fetch-rest-endpoint';

interface MyJwtPayload {
  sub: string;
  jti: string;
  aud: string;
  exp: number;
  iss: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, RouterModule, PianoComponent, NotesystemComponent],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @ViewChild(PianoComponent) pianoComponent!: PianoComponent;
  @ViewChild(NotesystemComponent) notesystemComponent!: NotesystemComponent;

  @ViewChild('abcContainer', { static: false }) abcContainer!: ElementRef;

  audio: HTMLAudioElement | null = null;
  previousUrl: string | null = null;
  showHelpMessage = false;
  shuffledContents: any[] = [];
  currentIndex = 0;
  progress: number = 0;
  totalSegments: number = 0;
  possibleAnswers: string[] | null = null;
  correctAnswers: string = '';
  lastPressedLetter: string | null = null;
  firstAttemptSuccess: boolean = true;
  exerciseModus: string = '';
  notationType: string = '';
  exerciseType: string = '';

  // Notensystem
  allNotesNotensystem = ['', 'a', 'g', 'f', 'e', 'd', 'c', 'h', 'a', 'g', 'f', 'e', 'd', 'c'];
  intervalNames = ['Prime','Sekunde','Terz','Quarte','Quinte','Sexte','Septime','Oktave'];

  // Progressbar
  evaluation: string = '';
  firstAttemptCorrectCount: number = 0;
  parsed: any = null;

  // signal
  allAnswers = signal<string[]>([]);
  instruction = signal<string>('');

  constructor(private route: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParamMap.subscribe(async params => {
      const id = params.get('id');
      if (!id) return;

      this.parsed = await fetchRestEndpoint(API_URL + `exercises/${id}`, 'GET');
      this.previousUrl = sessionStorage.getItem('previousUrl') || null;

      this.renderAbcSafely();
    });
  }

  renderAbcSafely(): void {
    this.currentIndex = 0;
    this.progress = 0;
    this.possibleAnswers = null;
    this.allAnswers.set([]);
    this.correctAnswers = '';
    this.evaluation = '';
    this.firstAttemptCorrectCount = 0;
    this.firstAttemptSuccess = true;

    if (this.parsed) {
      let exerciseContents = this.parsed.exerciseContents;
      this.exerciseModus = this.parsed.exerciseModus;
      this.notationType = this.parsed.notationType;
      this.exerciseType = this.parsed.exerciseType;

      exerciseContents = exerciseContents.map((item: any) => ({
        ...item,
        notesToRead: item.notesToRead
          ? item.notesToRead.replace(/%/g, '\n')
          : item.notesToRead
      }));

      const duplicated = [...exerciseContents, ...exerciseContents];
      this.totalSegments = Number(duplicated.length);
      this.shuffledContents = this.shuffleArray(duplicated);

      this.setUpForUI();
      switch (this.exerciseModus) {
        case 'Schreiben':
          return;
        case 'Lesen':
          this.renderCurrentNote();
          return;
      }
    }
  }

  shuffleArray<T>(array: T[]): T[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  get dashArray() {
    const incorrectAnswers = this.totalSegments - this.firstAttemptCorrectCount;
    return incorrectAnswers * (2 * Math.PI * 45 / this.totalSegments);
  }

  get dashOffset() {
    return 0;
  }

  setUpForUI(): void {
    const currentQuestion = this.shuffledContents[this.currentIndex];

    this.correctAnswers = currentQuestion.correctAnswer;
    this.instruction.set(currentQuestion.instruction);
  }

  ngAfterViewInit(): void {
    this.tryRenderAbc();
  }

  private tryRenderAbc(): void {
    const currentQuestion = this.shuffledContents[this.currentIndex];
    if (!this.abcContainer || !currentQuestion?.notesToRead) return;

    abcjs.renderAbc(
      this.abcContainer.nativeElement,
      currentQuestion.notesToRead,
      { responsive: 'resize', add_classes: true, staffwidth: 500, scale: 2 }
    );
  }

  async renderCurrentNote(): Promise<void> {
    if (
      this.shuffledContents &&
      this.shuffledContents.length > 0 &&
      this.shuffledContents[this.currentIndex].notesToRead
    ) {
      const currentQuestion = this.shuffledContents[this.currentIndex];

      let raw = currentQuestion.allAnswers;
      let splitted = raw.split(',').map((s: string) => s.trim());
      this.allAnswers.set(splitted);

      raw = currentQuestion.possibleAnswers;
      splitted = raw.split(',').map((s: string) => s.trim());
      this.possibleAnswers = splitted;

     requestAnimationFrame(() => this.tryRenderAbc());
    }
  }

  goBack(): void {
    if (this.previousUrl) {
      sessionStorage.removeItem('texts from pruefung');
      if(this.audio !== null) {
        this.audio!.pause();
        this.audio!.currentTime = 0;
      }

      this.router.navigateByUrl(this.previousUrl);
    } else {
      console.log('No previous URL found!');
    }
  }

  extendQuestion(): void {
    this.showHelpMessage = !this.showHelpMessage;
  }

  async checkIfRightButton(letter: string, button: HTMLButtonElement): Promise<void> {
    if (this.correctAnswers.includes("-")) {
      this.correctAnswers = this.correctAnswers.split("-")[0];
    }

    if (letter === this.correctAnswers) {
      button.classList.add('bg-green-500', 'text-white');

      if (this.exerciseModus === 'Lesen' && this.shuffledContents[this.currentIndex]?.notesToRead) {
        this.playAbcAudio(this.shuffledContents[this.currentIndex].notesToRead).catch(error => {
          console.warn('Audio playback failed:', error);
        });
      }

      this.firstAttemptCorrectCount += this.firstAttemptSuccess ? 1 : 0;
      this.firstAttemptSuccess = true;
      this.progress++;
      this.currentIndex++;

      setTimeout(() => button.classList.remove('bg-green-500', 'text-white'), 1000);

      if (this.progress < this.totalSegments) {
        this.setUpForUI();
        switch (this.exerciseModus) {
          case 'Schreiben':
            console.error('No texts found in sessionStorage.');
            return;
          case 'Lesen':
            this.renderCurrentNote();
            return;
        }
      } else {
        this.evaluation = `${((this.firstAttemptCorrectCount / this.totalSegments) * 100).toFixed(2)}%`;
        var jwt = sessionStorage.getItem('jwt');

          if(jwt != undefined) {
            const decoded = jwtDecode<MyJwtPayload>(jwt);

            await fetchRestEndpointWithAuthorization(API_URL + 'usermanagement/completed-exercise', 'POST', {
              exerciseId: this.parsed[this.currentIndex].exerciseId,
              score: parseFloat(this.evaluation)
            });
          }
      }
    } else {
      button.classList.add('bg-red-500', 'text-white');
      this.firstAttemptSuccess = false;
      setTimeout(() => button.classList.remove('bg-red-500', 'text-white'), 1000);
    }
  }

  async playAbcAudio(abcNotation: string): Promise<void> {
    try {
      const tempDiv = document.createElement('div');
      tempDiv.id = 'temp-audio-' + Date.now();
      tempDiv.style.display = 'none';
      document.body.appendChild(tempDiv);

      const visualObj = abcjs.renderAbc(tempDiv.id, abcNotation);

      if (visualObj && visualObj.length > 0) {
        const synth = new abcjs.synth.CreateSynth();

        await synth.init({
          visualObj: visualObj[0]
        });

        await synth.prime();
        synth.start();

        setTimeout(() => {
          try {
            synth.stop();
          } catch (e) {
          }
        }, 5000);
      }

      setTimeout(() => {
        if (document.body.contains(tempDiv)) {
          document.body.removeChild(tempDiv);
        }
      }, 100);

    } catch (error) {
      console.warn('ABC audio failed:', error);
    }
  }

  async nextTask(): Promise<void> {
    let parsed = null;
    if (this.parsed) {
      parsed = this.parsed;
    }

    if(this.parsed?.id !== undefined) {
      //this.audio!.pause();
      //this.audio!.currentTime = 0;
      const id = this.parsed.id + 1;

      const excercise = await fetchRestEndpoint(API_URL + `exercises/${id}`, 'GET');

      this.router.navigate(['/task'], { queryParams: { id: excercise?.id } });
      this.ngOnInit();
    }
  }

  // Klavier
  buttonDisabled = true;

  onSelectedKeyChanged(selectedKey: boolean) {
    this.buttonDisabled = !selectedKey;
  }

  checkRightWriting() {
    const selectedCircle = sessionStorage.getItem('selectedCircle');
    const selectedKey = sessionStorage.getItem('selectedKey');
    const selectedExtraCircle = sessionStorage.getItem('selectedExtraCircle');
    let notes: string[] = [];
    let indices: number[] = [];

    const processSelectedCircle = (selectedCircle: string | null) => {
      if (!selectedCircle) return;

      const parsedSelectedCircle = JSON.parse(selectedCircle);
      for (const key in parsedSelectedCircle) {
        if (parsedSelectedCircle[key]) {
          const noteIndex = +key;
          notes.push(this.allNotesNotensystem[noteIndex]);
          indices.push(noteIndex);
        }
      }
    };

    switch(this.exerciseType) {
      case 'StammtoeneKlavier':
        if (selectedKey !== null) {
          notes.push(selectedKey);
        }
        break;
      default:
        const allCircles = this.notesystemComponent.getAllSelectedCircle();
        processSelectedCircle(JSON.stringify(allCircles));
        processSelectedCircle(selectedExtraCircle);
        break;
    }

    switch(notes.length) {
      case 1:
        this.checkIfRightAnswer(notes[0]);
        break;
      case 2:
        this.checkIfRightAnswer(this.intervalNames[Math.abs(indices[1] - indices[0])]!);
        break;
    }
  }

  checkIfRightAnswer(answer: string) {
    answer = answer.split('-')[0];
    if(answer === this.correctAnswers) {

      this.firstAttemptCorrectCount += this.firstAttemptSuccess ? 1 : 0;
      this.firstAttemptSuccess = true;
      this.progress++;
      this.currentIndex++;

      if(this.exerciseType === 'StammtoeneKlavier') {
        this.pianoComponent.changeMarkColor('green');
        sessionStorage.removeItem('selectedKey');
      } else {
        this.notesystemComponent.changeMarkColor('green');
      }


      this.setUpForUI();
    } else {
      this.firstAttemptSuccess = false;

      this.notesystemComponent.changeMarkColor('red');
    }
  }
}
