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
  @ViewChild('confettiCanvas') confettiCanvas!: ElementRef<HTMLCanvasElement>;

  audio: HTMLAudioElement | null = null;
  previousUrl: string | null = null;
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
  showStatusText = false;
  isCorrect = false;
  blockAnswer = false;
  lastQuestion: any;

  // signal
  allAnswers = signal<string[]>([]);
  instruction = signal<string>('');

  constructor(private route: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParamMap.subscribe(async params => {
      const ids = params.getAll('id');
      if (!ids) return;

      const numericIds = ids.map(id => Number(id));
      await this.loadAllExercises(numericIds);

      /*
      const id = params.get('ids');
      if (!id) return;
      console.log('Received ID:', id);

      this.parsed = await fetchRestEndpoint(API_URL + `exercises/${id}`, 'GET');
      console.log(this.parsed);
      this.previousUrl = sessionStorage.getItem('previousUrl') || null;

      this.renderAbcSafely();*/

    });
  }

  async loadAllExercises(exerciseIds: number[]) {
    if (!exerciseIds.length) return;
    const fetchPromises = exerciseIds.map(id => fetchRestEndpoint(API_URL + `exercises/${id}`, 'GET'));
    this.parsed = await Promise.all(fetchPromises);
    this.previousUrl = sessionStorage.getItem('previousUrl') || null;
    this.renderAbcSafely();
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
      let allContents: any[] = [];
      console.log(this.parsed);
      for (const ex of this.parsed) {
        if (!ex.exerciseContents) continue; // absichern
        const mappedContents = ex.exerciseContents.map((item: any) => ({
          ...item,
          notesToRead: item.notesToRead ? item.notesToRead.replace(/%/g, '\n') : item.notesToRead,
          notationType: ex.notationType,
          exerciseModus: ex.exerciseModus,
          exerciseType: ex.exerciseType
        }));
        allContents.push(...mappedContents);
      }

      const duplicated = [...allContents, ...allContents];

      this.shuffledContents = this.shuffleArray(duplicated);

      this.totalSegments = duplicated.length;

      this.exerciseModus = this.shuffledContents[0].exerciseModus;
      this.notationType = this.shuffledContents[0].notationType;
      this.exerciseType = this.shuffledContents[0].exerciseType;

      this.setUpForUI();

      switch (this.exerciseModus) {
        case 'Schreiben':
          return;
        case 'Lesen':
          this.renderCurrentNote();
          return;
      }
/*
      const exercises = Array.isArray(this.parsed) ? this.parsed : [this.parsed];

      for (const parsedExercise of exercises) {
        console.log(parsedExercise);
        let exerciseContents = parsedExercise.exerciseContents;
        const exerciseModus = parsedExercise.exerciseModus;
        const notationType = parsedExercise.notationType;
        const exerciseType = parsedExercise.exerciseType;

        exerciseContents = exerciseContents.map((item: any) => ({
          ...item,
          notesToRead: item.notesToRead
            ? item.notesToRead.replace(/%/g, '\n')
            : item.notesToRead
        }));

        const duplicated = [...exerciseContents, ...exerciseContents];
        const totalSegments = Number(duplicated.length);
        const shuffledContents = this.shuffleArray(duplicated);

        // Setze die UI-Variablen pro Übung
        this.totalSegments = totalSegments;
        this.shuffledContents = shuffledContents;
        this.exerciseModus = exerciseModus;
        this.notationType = notationType;
        this.exerciseType = exerciseType;

        this.setUpForUI();

        switch (exerciseModus) {
          case 'Schreiben':
            continue; // weiter zur nächsten Übung
          case 'Lesen':
            this.renderCurrentNote();
            continue;
        }
      }*/
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

    if(this.lastQuestion !== undefined) {
      if(currentQuestion.notationType !== this.lastQuestion.notationType) {
          this.firstAttemptSuccess = true;
          this.exerciseModus = currentQuestion.exerciseModus;
          this.notationType = currentQuestion.notationType;
          this.exerciseType = currentQuestion.exerciseType;
      }
    }

    this.correctAnswers = currentQuestion.correctAnswer;
    this.instruction.set(currentQuestion.instruction);
    this.lastQuestion = currentQuestion;
  }

  ngAfterViewInit(): void {
    this.tryRenderAbc();
  }

  private tryRenderAbc(): void {
    const currentQuestion = this.shuffledContents[this.currentIndex];
    if (!this.abcContainer || !currentQuestion?.notesToRead) return;

    let abc = currentQuestion.notesToRead.trim();
    const noteCount = (abc.match(/[A-Ga-g]/g) || []).length;

    if (noteCount < 8) {
      const missing = 8 - noteCount;
      abc += " " + Array(missing).fill("x4").join(" ");
    }

    abcjs.renderAbc(
      this.abcContainer.nativeElement,
      abc,
      {
        add_classes: true,
        staffwidth: 800,
        scale: 3,
        wrap: { minSpacing: 1, maxSpacing: 1, preferredMeasuresPerLine: 1 },
        paddingright: 0,
        paddingbottom: 0
      }
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

  private launchConfetti(): void {
    const canvas = this.confettiCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const colors = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'];

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const particles: {
      x: number; y: number; vx: number; vy: number;
      color: string; size: number; life: number;
    }[] = [];

    const count = 30;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 5 + 2;
      particles.push({
        x: canvas.width / (2 * devicePixelRatio),
        y: canvas.height / (2 * devicePixelRatio) - 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1.5,
        life: 70 + Math.random() * 40
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.life--;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size * 0.6);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].life <= 0) particles.splice(i, 1);
      }

      if (particles.length > 0) requestAnimationFrame(animate);
    };

    animate();
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async checkIfRightButton(letter: string, button: HTMLButtonElement): Promise<void> {
    if (this.blockAnswer) return;
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
      this.evaluation = `${((this.firstAttemptCorrectCount / this.totalSegments) * 100).toFixed(2)}%`;
      this.progress++;
      this.currentIndex++;

      this.showStatusText = true;
      this.isCorrect = true;

      this.blockAnswer = true;
      await this.delay(1000);

      if(this.progress < this.totalSegments) {
        await this.launchConfetti();
        await this.delay(500);
      }
      this.blockAnswer = false;
      this.showStatusText = false;

      button.classList.remove('bg-green-500', 'text-white');

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
        this.saveExcercise();
      }
    } else {
      button.classList.add('bg-red-500', 'text-white');

      this.showStatusText = true;
      this.isCorrect = false;
      this.blockAnswer = true;
      await this.delay(1000);
      this.showStatusText = false;
      this.blockAnswer = false;
      this.firstAttemptSuccess = false;

      button.classList.remove('bg-red-500', 'text-white');
    }
  }

  async saveExcercise() {
    var jwt = sessionStorage.getItem('jwt');
    console.log(jwt);

    if(jwt != undefined) {
      const decoded = jwtDecode<MyJwtPayload>(jwt);
      const isPruefung = localStorage.getItem("isPruefung");

      if(isPruefung == "yes") {
        const exerciseAllocation = JSON.parse(localStorage.getItem("exerciseAllocation") || "[]");
        const percentString = this.evaluation;
        const value = parseFloat(percentString.replace("%", "")).toFixed(2);

        localStorage.removeItem("isPruefung");
        localStorage.removeItem("exerciseAllocation");

        await fetchRestEndpointWithAuthorization(API_URL + 'exam-simulation/completed', 'POST', {
          questionCount: this.totalSegments,
          exerciseAllocations: exerciseAllocation,
          achievedPercentage: value
        });
      } else {
        console.log(this.parsed[0].id);
        await fetchRestEndpointWithAuthorization(API_URL + 'usermanagement/completed-exercise', 'POST', {
          exerciseId: this.parsed[0].id,
          score: parseFloat(this.evaluation)
        });
      }
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
    if (this.blockAnswer) return;
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

  async checkIfRightAnswer(answer: string) {
    answer = answer.split('-')[0];
    if(answer === this.correctAnswers) {

      this.firstAttemptCorrectCount += this.firstAttemptSuccess ? 1 : 0;
      this.firstAttemptSuccess = true;
      this.evaluation = `${((this.firstAttemptCorrectCount / this.totalSegments) * 100).toFixed(2)}%`;
      this.progress++;
      this.currentIndex++;

      if(this.exerciseType === 'StammtoeneKlavier') {
        this.pianoComponent.changeMarkColor('green');
        sessionStorage.removeItem('selectedKey');
      } else {
        this.notesystemComponent.changeMarkColor('green');
      }

      this.showStatusText = true;
      this.isCorrect = true;

      this.blockAnswer = true;
      await this.delay(1000);

      if(this.progress < this.totalSegments) {
        await this.launchConfetti();
        await this.delay(500);
      } else {
        this.saveExcercise();
      }

      this.blockAnswer = false;
      this.showStatusText = false;

      if(this.progress < this.totalSegments) {
        this.setUpForUI();
      }
    } else {
      this.firstAttemptSuccess = false;

      if(this.exerciseType === 'StammtoeneKlavier') {
        this.pianoComponent.changeMarkColor('red');
        sessionStorage.removeItem('selectedKey');
      } else {
        this.notesystemComponent.changeMarkColor('red');
      }

      this.showStatusText = true;
      this.isCorrect = false;
      this.blockAnswer = true;
      await this.delay(1000);
      this.blockAnswer = false;
      this.showStatusText = false;
    }
  }
}
