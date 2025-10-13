import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal, ViewChild } from '@angular/core';
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

  /*
  // Notensystem
  allNotesNotensystem = ['', 'a', 'g', 'f', 'e', 'd', 'c', 'h', 'a', 'g', 'f', 'e', 'd', 'c'];
  allNotesNotensystemSounds = ['c-1', 'd-1', 'e-1', 'f-1', 'g-1', 'a-1', 'h-1', 'c-2', 'd-2', 'e-2', 'f-2', 'g-2', 'a-2'];

  //Intervalle
  intervalle = ["Prime: 1", "Sekunde: 2", "Terz: 3", "Quarte: 4", "Quinte: 5", "Sexte: 6", "Septime: 7", "Oktave: 8"];

  // Tonleitern
  dur_und_natürliches_moll = ['G_Dur', 'e_Moll', 'D_Dur', 'h_Moll', 'A_Dur', 'fis_Moll'];
  dur_und_moll = ['F_Dur', 'd_Moll', 'B_Dur', 'g_Moll', 'Es_Dur', 'c_Moll'];
  dur_moll_und_natürliches_moll = [...this.dur_und_natürliches_moll, ...this.dur_und_moll, 'C_Dur', 'a_Moll'];

  action: string | null = null;
  letters: string | null = null;
  isIntervall: boolean = false;
  currentQuestion: string = '';
  randomizedQuestions: string[] = [];
  allQuestions: string[] = [];
  questionIndex: number = 0;
  selectedKey: string | null = null;
  lastPressedLetter: string | null = null;
  progress: number = 0;
  correctAnswers: number = 0;
  totalSegments: number = 0;
  totalQuestions: number = 0;
  usedLetters: Set<string> = new Set();
  showHelpMessage = false;
  isErasing: boolean = false;
  private firstAttemptCorrect: boolean = true;
  audio: HTMLAudioElement | null = null;
  evaluation: string = '';
  Math: any;
  buttonDisabled = true;
  toneType: string = '';
  previousUrl: string | null = null;
  currentAbcVisualObj: any = null;
  pruefungQuestionIndex: number = 0;
  pruefungQuestionLength: number = 0;
  currentQuestionPruefung!: { description: string, values: string, exerciseId: number, exerciseType: string, title: string | null };

  texts: { description: string, values: string, exerciseId: number, exerciseType: string, title: string | null }[] = []

  currentIndex: number = 0;
  currentAbcVisualObj: any = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.progress = 0;
    this.questionIndex = 0;
    this.correctAnswers = 0;
    this.evaluation = '';

    this.route.queryParams.subscribe(params => {
      this.currentIndex = +params['index'] || 0;
      this.action = params['action'];
      this.letters = params['letters'];
      const storedTexts = sessionStorage.getItem('texts');
      this.toneType = sessionStorage.getItem('toneType') || '';

      const selectedTexts = JSON.parse(sessionStorage.getItem('texts from pruefung') || '[]');

      if(selectedTexts.length > 0) {
        this.texts = selectedTexts.map((text: any) => {
          return {
            description: text.description,
            values: text.values,
            exerciseId: text.exerciseId,
            exerciseType: text.exerciseType,
            title: text.title || null
          };
        });

        this.setupQuestionsPruefung();
      } else if (storedTexts) {
        this.texts = JSON.parse(storedTexts);

        if (this.letters) {
          this.setupQuestions();
        }
      }
    });

    const currentUrl = this.router.url;

    if (!this.previousUrl) {
      this.previousUrl = sessionStorage.getItem('previousUrl') || null;
    }
  }

  ngAfterViewInit(): void {
    if (this.pianoComponent) {
      this.pianoComponent.isClickable = this.action !== 'lies';
    } else if(this.notesystemComponent) {
      this.notesystemComponent.isClickable = this.action !== 'lies';
    }
  }

  setupQuestionsPruefung(): void {
    this.currentQuestionPruefung = this.texts[this.pruefungQuestionIndex];
    this.toneType = this.currentQuestionPruefung.exerciseType;
    this.letters = this.currentQuestionPruefung.values;
    this.questionIndex = 0;
    sessionStorage.setItem('descriptions', this.currentQuestionPruefung.description);
    this.pruefungQuestionIndex++;

    if(this.toneType === 'Tonleitern') {
      let description = sessionStorage.getItem('descriptions');
      const values = description?.replace(/"/g, '').split(',')[1].split(' ');

      if (values) {
        const arrayName = values
          .map(v => v.replace('&', 'und'))
          .join('_');

          let selectedArray: string[] = [];
          if (arrayName === 'dur_und_natürliches_moll') {
            selectedArray = this.dur_und_natürliches_moll;
          } else if (arrayName === 'dur_und_moll') {
            selectedArray = this.dur_und_moll;
          } else if (arrayName === 'dur_und_moll_und_natürliches_moll') {
            selectedArray = this.dur_moll_und_natürliches_moll;
          }

          this.allQuestions = selectedArray;
          this.totalSegments += this.allQuestions.length;
          this.pruefungQuestionLength += this.allQuestions.length;
      }
    } else {
      this.pruefungQuestionLength += this.currentQuestionPruefung.values.replace(/Orientierungstöne/g, '').split(',').length * 2;
    }

    switch (true) {
      case this.currentQuestionPruefung.description.startsWith('Lies'):
        this.action = 'lies';
        break;
      case this.currentQuestionPruefung.description.startsWith('Markiere'):
        this.action = 'markiere';
        break;
      case this.currentQuestionPruefung.description.startsWith('Schreibe'):
        this.action = 'schreibe';
        break;
      case this.currentQuestionPruefung.description.startsWith('Bestimme'):
        this.action = 'bestimme';
        break;
    }

    if(this.action === 'markiere') {
      this.buttonDisabled = false;
    }

    this.setupQuestions();
  }

  setupQuestions(): void {
    sessionStorage.setItem('intervallAllowed', 'yes');
    const uniqueLetters = this.letters ? this.letters.split(',') : [];
    const filteredLetters = uniqueLetters.filter(letter => letter.trim() !== 'Orientierungstöne');
    this.allQuestions = [];

    if(this.toneType === 'Tonleitern') {
      let description = sessionStorage.getItem('descriptions');
      const values = description?.replace(/"/g, '').split(',')[1].split(' ');

      if (values) {
        const arrayName = values
          .map(v => v.replace('&', 'und'))
          .join('_');

          let selectedArray: string[] = [];
          if (arrayName === 'dur_und_natürliches_moll') {
            selectedArray = this.dur_und_natürliches_moll;
          } else if (arrayName === 'dur_und_moll') {
            selectedArray = this.dur_und_moll;
          } else if (arrayName === 'dur_und_moll_und_natürliches_moll') {
            selectedArray = this.dur_moll_und_natürliches_moll;
          }

          this.allQuestions = selectedArray;
          this.totalSegments = this.allQuestions.length;
          this.totalQuestions = this.allQuestions.length;
      }
    }
    else if (this.action === 'lies') {
      filteredLetters.forEach(letter => {
        this.allQuestions.push(`${letter}-1`, `${letter}-2`);
      });

      const index = this.allQuestions.indexOf('h-2');
      if (index != -1) {
        this.allQuestions.splice(index, 1);
      }
    } else {
      for (let i = 0; i < 2; i++) {
        this.allQuestions.push(...filteredLetters);
      }
    }

    this.randomizedQuestions = this.shuffleArray(this.allQuestions);

    if(this.texts[0].exerciseId == undefined && this.letters && this.totalSegments == 0) {
      for (const item of this.texts) {
        if(this.toneType === 'Tonleitern') {
          this.totalSegments += item.values.replace(/\s+/g, '').split(',').length * 2;
        } else {
          this.totalSegments += item.values.replace(/Orientierungstöne/g, '').split(',').filter(value => value.trim()).length * 2;

          if(this.action === 'lies' && this.toneType != 'Stammtoene') {
            if (item.values.replace(/Orientierungstöne/g, '').split(',').length * 2 != this.allQuestions.length) {
              this.totalSegments--;
            }
          }
        }
      }
      this.totalQuestions = this.totalSegments;
    } else if(this.totalSegments == 0) {
      this.totalQuestions = this.randomizedQuestions.length;
      this.totalSegments = this.totalQuestions;
    }

    this.currentQuestion = this.randomizedQuestions[this.questionIndex];
    this.isIntervall = this.toneType === 'Intervalle';
  }

  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  checkIfRightMark() {
    const selectedKey = sessionStorage.getItem('selectedKey');
    const letter = selectedKey?.split('-')[0];

    if (letter && this.isCorrect(letter)) {
      this.updateProgress();
      this.pianoComponent.changeMarkColor('green');

      if (this.firstAttemptCorrect) {
        this.correctAnswers++;
      }

      this.nextQuestion();
    } else {
      this.firstAttemptCorrect = false;
      this.pianoComponent.changeMarkColor('red');
    }

    setTimeout(() => {
      this.pianoComponent.selectedKey = null;
    }, 500);
  }

  checkIfRightNotensystemIntervalle() {
    const selectedCircle = sessionStorage.getItem('selectedCircle');
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

    const allCircles = this.notesystemComponent.getAllSelectedCircle();
    processSelectedCircle(JSON.stringify(allCircles));
    processSelectedCircle(selectedExtraCircle);

    if (notes.length === 2) {
      const interval = Math.abs(indices[1] - indices[0]);

      if(this.intervalle[interval].split(':')[0] === this.currentQuestion) {
        this.updateProgress();

        this.notesystemComponent.changeMarkColor('green');

        if (this.firstAttemptCorrect) {
          this.correctAnswers++;
        }

        this.nextQuestion();
      } else {
        this.firstAttemptCorrect = false;
        this.notesystemComponent.changeMarkColor('red');
      }
    }
  }

  checkIfRightNotensystem() {
    const selectedCircle = sessionStorage.getItem('selectedCircle');
    let notes: string[] = [];

    if (selectedCircle) {
      const parsedSelectedCircle = JSON.parse(selectedCircle);

      for (const key in parsedSelectedCircle) {
        if (parsedSelectedCircle[key]) {
          const note = this.allNotesNotensystem[+key];
          notes.push(note);
        }
      }
    }

    if (notes.length === 1) {
      if (notes[0] === this.currentQuestion) {
        this.updateProgress();

        this.notesystemComponent.changeMarkColor('green');

        if (this.firstAttemptCorrect) {
          this.correctAnswers++;
        }

        this.nextQuestion();
      } else {
        this.firstAttemptCorrect = false;
        this.notesystemComponent.changeMarkColor('red');
      }
    }
  }

  async checkIfRight(letter: string, button: HTMLButtonElement): Promise<void> {
    this.setButtonsDisabled(true);
    if (this.isCorrect(letter)) {
      const audios: HTMLAudioElement[] = [];
      if(this.toneType === 'Tonleitern') {
        const allNotes = this.pianoComponent.arrays[this.currentQuestion];


        for (const eachNote of allNotes) {
          try {
            const audio = new Audio(`/assets/sounds/${eachNote}.ogg`);
            audio.play();
            audios.push(audio);
          } catch {
            console.warn(`Fehler beim Abspielen von: ${eachNote}`);
          }

          await new Promise(resolve => setTimeout(resolve, 500));
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        setTimeout(() => {
          audios.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
          });
        }, 2000);
      }

      this.updateProgress();

      if (this.firstAttemptCorrect) {
        this.correctAnswers++;
      }

      this.nextQuestion();
    } else {
      button.classList.add('bg-red-500', 'text-white');
      this.firstAttemptCorrect = false;
      setTimeout(() => {
        button.classList.remove('bg-red-500', 'text-white');
      }, 1000);
    }
    this.setButtonsDisabled(false);
  }

  setButtonsDisabled(disabled: boolean): void {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn) => {
      (btn as HTMLButtonElement).disabled = disabled;
    });
  }

  isCorrect(letter: string): boolean {
    this.lastPressedLetter = letter;
    setTimeout(() => {
      this.lastPressedLetter = null;
    }, 1000);

    let correct = false;
    if(this.toneType === 'Tonleitern') {
      let letterSplit = '';

      if (!letter.includes(' ')) {
        letterSplit = letter;
      } else {
        letterSplit = letter.split(' ')[1];
      }

      correct = letterSplit === this.currentQuestion.split('_')[1];
    } else {
      correct = letter === this.currentQuestion.split('-')[0];
    }

    if (correct) {
      this.usedLetters.add(letter);
    }

    return correct;
  }

  updateProgress(): void {
    if (this.progress < this.totalSegments) {
      this.progress++;
    }
  }

  nextQuestion(): void {
    if(this.texts[0].exerciseId == undefined && this.letters) {
      if(this.pruefungQuestionLength == this.progress && this.totalSegments != this.progress) {
        this.setupQuestionsPruefung();
      }
    }

    sessionStorage.setItem('intervallAllowed', 'yes');
    if(this.toneType === 'Intervalle') {
      this.notesystemComponent.markOneCircle();
    }

    this.firstAttemptCorrect = true;
    if (this.questionIndex < this.randomizedQuestions.length - 1) {
      //if(this.texts[0].exerciseId != undefined) {
      this.questionIndex++; //}
      this.currentQuestion = this.randomizedQuestions[this.questionIndex];
      //if(this.texts[0].exerciseId == undefined) { this.questionIndex++; }

      if (this.action === 'lies') {
        if (this.toneType === 'Notensystem' || this.toneType === 'Intervalle') {
          this.notesystemComponent.currentQuestion = this.currentQuestion;
          this.notesystemComponent.isIntervall = this.toneType === 'Intervalle';
        } else {
          this.pianoComponent.currentQuestion = this.currentQuestion;
        }
      }
    }
    this.checkCompletion();
  }

  //
  extractData(element: string) {
    const [note, height] = element.split('-');
    return {
      note,
      height: +height,
    };
  }//

  //
  //getNoteIndex(note: string) {
    //return this.allNotesNotensystem.indexOf(note);
  //}
  //

  async checkCompletion(): Promise<void> {
    if (this.progress === this.totalSegments) {
      this.evaluation = `${((this.correctAnswers / this.totalQuestions) * 100).toFixed(2)}%`;
      sessionStorage.removeItem('texts from pruefung');

      this.audio = new Audio("/assets/sounds/Uebung-fertig.mp3");
      this.audio.play();

      var jwt = sessionStorage.getItem('jwt');

      if(jwt != undefined) {
        const decoded = jwtDecode<MyJwtPayload>(jwt);

        await fetchRestEndpointWithAuthorization(API_URL + 'usermanagement/completed-exercise', 'POST', {
          exerciseId: this.texts[this.currentIndex].exerciseId,
          score: parseFloat(this.evaluation)
        });
      }
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

  onSelectedKeyChanged(selectedKey: boolean) {
    this.buttonDisabled = !selectedKey;
  }

  nextTask(): void {
    if(this.texts[0].exerciseId !== undefined) {
      this.usedLetters.clear();
      this.audio!.pause();
      this.audio!.currentTime = 0;

      const nextIndex = (this.currentIndex + 1) % this.texts.length;
      let nextAction = '';

      if (this.texts[nextIndex].description.startsWith('Schreibe')) {
        nextAction = 'schreibe';
      } else {
        nextAction = this.texts[nextIndex].description.startsWith('Markiere') ? 'markiere' : 'lies';
      }

      const nextLetters = this.texts[nextIndex].values;

      this.router.navigate(['/task'], { queryParams: { action: nextAction, letters: nextLetters, index: nextIndex } });
      this.ngOnInit();
    }
  }

  eraser(): void {
    this.isErasing === true ? this.isErasing = false : this.isErasing = true;
  }

  get dashArray() {
    const incorrectAnswers = this.totalQuestions - this.correctAnswers;
    return incorrectAnswers * (2 * Math.PI * 45 / this.totalQuestions);
  }

  get dashOffset() {
    return 0;
  }*/

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
  storedTexts: any = null;

  // signal
  allAnswers = signal<string[]>([]);
  instruction = signal<string>('');

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.storedTexts = sessionStorage.getItem('texts');
    this.previousUrl = sessionStorage.getItem('previousUrl') || null;
    const parsed = this.storedTexts ? JSON.parse(this.storedTexts) : null;
    console.log(parsed);

    if (parsed) {
      let exerciseContents = parsed.exerciseContents;
      this.exerciseModus = parsed.exerciseModus;
      this.notationType = parsed.notationType;
      this.exerciseType = parsed.exerciseType;

      exerciseContents = exerciseContents.map((item: any) => ({
        ...item,
        notesToRead: item.notesToRead
          ? item.notesToRead.replace(/%/g, '\n')
          : item.notesToRead
      }));

      const duplicated = [...exerciseContents, ...exerciseContents];

      this.totalSegments = Number(duplicated.length);

      this.shuffledContents = this.shuffleArray(duplicated);
    }
  }

  ngAfterViewInit(): void {
    this.setUpForUI();

    switch (this.exerciseModus) {
      case 'Schreiben':
        console.error('No texts found in sessionStorage.');
        return;
      case 'Lesen':
        this.renderCurrentNote();
        return;
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

      /*ABCJS Rendering*/
      abcjs.renderAbc("abc-container", currentQuestion.notesToRead, {
        responsive: "resize",
        add_classes: true,
        staffwidth: 500,
        scale: 2
      });
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
    if (letter === this.correctAnswers) {
      button.classList.add('bg-green-500', 'text-white');

      // Play audio if this is a "Lesen" exercise with abcjs rendering
      if (this.exerciseModus === 'Lesen' && this.shuffledContents[this.currentIndex]?.notesToRead) {
        // Use current question's notation for correct audio playback
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
            /*
            await fetchRestEndpointWithAuthorization(API_URL + 'usermanagement/completed-exercise', 'POST', {
              exerciseId: this.storedTexts[this.currentIndex].exerciseId,
              score: parseFloat(this.evaluation)
            });*/
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
      // Create temporary container
      const tempDiv = document.createElement('div');
      tempDiv.id = 'temp-audio-' + Date.now();
      tempDiv.style.display = 'none';
      document.body.appendChild(tempDiv);

      // Render ABC notation
      const visualObj = abcjs.renderAbc(tempDiv.id, abcNotation);

      if (visualObj && visualObj.length > 0) {
        // Create synth
        const synth = new abcjs.synth.CreateSynth();

        // Simple init with minimal options
        await synth.init({
          visualObj: visualObj[0]
        });

        // Prime and start
        await synth.prime();
        synth.start();

        // Auto-stop after 5 seconds for longer playback
        setTimeout(() => {
          try {
            synth.stop();
          } catch (e) {
            // Ignore errors on stop
          }
        }, 5000);
      }

      // Cleanup
      setTimeout(() => {
        if (document.body.contains(tempDiv)) {
          document.body.removeChild(tempDiv);
        }
      }, 100);

    } catch (error) {
      console.warn('ABC audio failed:', error);
    }
  }

  nextTask(): void {
    let parsed = null;
    if (this.storedTexts) {
      parsed = JSON.parse(this.storedTexts);
    }

    if(parsed?.id !== undefined) {
      //this.audio!.pause();
      //this.audio!.currentTime = 0;

      const nextIndex = (this.currentIndex + 1) % this.storedTexts.length;
      let nextAction = '';

      /*
      if (this.storedTexts[nextIndex].description.startsWith('Schreibe')) {
        nextAction = 'schreibe';
      } else {
        nextAction = this.storedTexts[nextIndex].description.startsWith('Markiere') ? 'markiere' : 'lies';
      }*/

      const nextLetters = this.storedTexts[nextIndex].values;
      const id = this.storedTexts[nextIndex];
      console.log(this.storedTexts[nextIndex], JSON.parse(this.storedTexts));

      /*Get aber nur eine excercise mit der id von mir*/

      this.router.navigate(['/task'], { queryParams: { action: 'schreibe', letters: nextLetters, index: nextIndex } });
      this.ngOnInit();
    }
  }

  // schreiben

  // Klavier
  buttonDisabled = true;

  onSelectedKeyChanged(selectedKey: boolean) {
    this.buttonDisabled = !selectedKey;
  }

  checkRightWriting() {
    const selectedCircle = sessionStorage.getItem('selectedCircle');
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

    const allCircles = this.notesystemComponent.getAllSelectedCircle();
    processSelectedCircle(JSON.stringify(allCircles));
    processSelectedCircle(selectedExtraCircle);

    switch(notes.length) {
      case 1:
        this.checkIfRightAnswer(notes[0]);
        break;
      case 2:
        this.checkIfRightAnswer(this.intervalNames[Math.abs(indices[1] - indices[0])]!);
        break;
    }
  }

  checkIfRightAnswer(notes: string) {
    if(notes === this.correctAnswers) {
      console.log('correct');
    }
  }
}
