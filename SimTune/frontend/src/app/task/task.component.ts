import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { PianoComponent } from "../piano/piano.component";
import { NotesystemComponent } from '../notesystem/notesystem.component';
import { Console } from 'node:console';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, RouterModule, PianoComponent, NotesystemComponent],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @ViewChild(PianoComponent) pianoComponent!: PianoComponent;
  @ViewChild(NotesystemComponent) notesystemComponent!: NotesystemComponent;

  allNotesNotensystem = ['', 'a', 'g', 'f', 'e', 'd', 'c', 'h', 'a', 'g', 'f', 'e', 'd', 'c'];
  allNotesNotensystemSounds = ['c-1', 'd-1', 'e-1', 'f-1', 'g-1', 'a-1', 'h-1', 'c-2', 'd-2', 'e-2', 'f-2', 'g-2', 'a-2'];
  intervalle = ["Prime: 1", "Sekunde: 2", "Terz: 3", "Quarte: 4", "Quinte: 5", "Sexte: 6", "Septime: 7", "Oktave: 8"];

  //brauche nur den key also 'G-Dur', ...
  dur_und_natürliches_moll = {
    'G_Dur': ['g-1', 'a-1', 'h-1', 'c-2', 'd-2', 'e-2', 'fis-2'],
    'e_Moll': ['e-1', 'fis-1', 'g-1', 'a-1', 'h-1', 'c-2', 'd-2'],
    'D_Dur': ['d-1', 'e-1', 'fis-1', 'g-1', 'a-1', 'h-1', 'cis-2'],
    'h_Moll': ['h-1', 'cis-2', 'd-2', 'e-2', 'fis-2', 'g-2', 'a-2'],
    'A_Dur': ['a-1', 'h-1', 'cis-2', 'd-2', 'e-2', 'fis-2', 'gis-2'],
    'fis_Moll': ['fis-1', 'gis-1', 'a-1', 'h-1', 'cis-2', 'd-2', 'e-2']
  };

  dur_und_moll = {
    'F_Dur': ['f-1', 'g-1', 'a-1', 'b-1', 'c-2', 'd-2', 'e-2'],
    'd_Moll': ['d-1', 'e-1', 'f-1', 'g-1', 'a-1', 'b-1', 'c-2'],

    'B_Dur': ['b-1', 'c-2', 'd-2', 'es-2', 'f-2', 'g-2', 'a-2'],
    'g_Moll': ['g-1', 'a-1', 'b-1', 'c-2', 'd-2', 'es-2', 'f-2'],

    'Es_Dur': ['es-1', 'f-1', 'g-1', 'as-1', 'b-1', 'c-2', 'd-2'],
    'c_Moll': ['c-1', 'd-1', 'es-1', 'f-1', 'g-1', 'as-1', 'b-1']
  };

  dur_moll_und_natürliches_moll = {
    ...this.dur_und_natürliches_moll,
    ...this.dur_und_moll,

    'C_Dur': ['c-1', 'd-1', 'e-1', 'f-1', 'g-1', 'a-1', 'h-1'],
    'a_Moll': ['a-1', 'h-1', 'c-2', 'd-2', 'e-2', 'f-2', 'g-2']
  };

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

  texts: { description: string, values: string, exerciseId: number, exerciseType: number, title: string | null }[] = []

  currentIndex: number = 0;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router) { }

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

      if (storedTexts) {
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

  setupQuestions(): void {
    const uniqueLetters = this.letters ? this.letters.split(',') : [];
    const filteredLetters = uniqueLetters.filter(letter => letter.trim() !== 'Orientierungstöne');
    this.totalQuestions = filteredLetters.length * 2;
    this.totalSegments = this.totalQuestions;

    if(this.toneType === 'Tonleitern') {
      let description = sessionStorage.getItem('descriptions');
      const values = description?.replace(/"/g, '').split(',')[1].split(' ');

      if (values) {
        const arrayName = values
          .map(v => v.replace('&', 'und'))
          .join('_');

          let selectedArray = {};
          if (arrayName === 'dur_und_natürliches_moll') {
            selectedArray = this.dur_und_natürliches_moll;
          } else if (arrayName === 'dur_und_moll') {
            selectedArray = this.dur_und_moll;
          } else if (arrayName === 'dur_und_moll_und_natürliches_moll') {
            selectedArray = this.dur_moll_und_natürliches_moll;
          }

          const keys = Object.keys(selectedArray);

          this.allQuestions = [...keys];
          this.totalSegments = this.allQuestions.length;
          this.totalQuestions = this.allQuestions.length;
      }
    }
    else if (this.action === 'lies') {
      filteredLetters.forEach(letter => {
        this.allQuestions.push(`${letter}-1`, `${letter}-2`);
      });
    } else {
      for (let i = 0; i < 2; i++) {
        this.allQuestions.push(...filteredLetters);
      }
    }

    this.randomizedQuestions = this.shuffleArray(this.allQuestions);
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

    processSelectedCircle(selectedCircle);
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

  checkIfRight(letter: string, button: HTMLButtonElement): void {
    if (this.isCorrect(letter)) {
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
    this.firstAttemptCorrect = true;
    if (this.questionIndex < this.randomizedQuestions.length - 1) {
      this.questionIndex++;
      this.currentQuestion = this.randomizedQuestions[this.questionIndex];

      if (this.action === 'lies') {
        if (this.toneType === 'Notensystem' || this.toneType === 'Intervalle') {
          this.notesystemComponent.currentQuestion = this.currentQuestion;
          this.notesystemComponent.isIntervall = this.toneType === 'Intervalle';
        } else if (this.toneType === 'Tonleitern') {
          //description muss die question sein


          this.pianoComponent.currentQuestion = this.currentQuestion;
        }
        else {
          this.pianoComponent.currentQuestion = this.currentQuestion;
        }
      }
    }
    this.checkCompletion();
  }

  extractData(element: string) {
    const [note, height] = element.split('-');
    return {
      note,
      height: +height,
    };
  }

  getNoteIndex(note: string) {
    return this.allNotesNotensystem.indexOf(note);
  }

  checkCompletion(): void {
    if (this.progress === this.totalSegments) {
      this.evaluation = `${((this.correctAnswers / this.totalQuestions) * 100).toFixed(2)}%`;

      this.audio = new Audio("/assets/sounds/Uebung-fertig.mp3");
      this.audio.play();
    }
  }

  get dashArray() {
    const incorrectAnswers = this.totalQuestions - this.correctAnswers;
    return incorrectAnswers * (2 * Math.PI * 45 / this.totalQuestions);
  }

  get dashOffset() {
    return 0;
  }

  goBack(): void {
    if (this.previousUrl) {

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

  eraser(): void {
    this.isErasing === true ? this.isErasing = false : this.isErasing = true;
  }
}
