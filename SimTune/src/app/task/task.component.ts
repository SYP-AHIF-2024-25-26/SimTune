import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { PianoComponent } from "../piano/piano.component";
import { NotesystemComponent } from '../notesystem/notesystem.component';

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
  action: string | null = null;
  letters: string | null = null;
  currentQuestion: string = '';
  randomizedQuestions: string[] = [];
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
  evaluation: string = '';
  Math: any;
  buttonDisabled = true;
  toneType: string = '';

  texts: {text: string, value: string}[] = [];

  currentIndex: number = 0;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router) {}

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
  }

  ngAfterViewInit(): void {
    if (this.pianoComponent) {
      this.pianoComponent.isClickable = this.action !== 'lies';
    }
  }

  setupQuestions(): void {
    const uniqueLetters = this.letters ? this.letters.split(',') : [];
    const filteredLetters = uniqueLetters.filter(letter => letter.trim() !== 'Orientierungstöne');
    this.totalQuestions = filteredLetters.length * 2;
    this.totalSegments = this.totalQuestions;

    const allQuestions = [];

    if (this.action === 'lies') {
      filteredLetters.forEach(letter => {
          allQuestions.push(`${letter}-1`, `${letter}-2`);
      });
    } else {
      for (let i = 0; i < 2; i++) {
          allQuestions.push(...filteredLetters);
      }
    }

    this.randomizedQuestions = this.shuffleArray(allQuestions);
    this.currentQuestion = this.randomizedQuestions[this.questionIndex];
  }

  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  checkIfRightMark(){
    const selectedKey = sessionStorage.getItem('selectedKey');
    const letter = selectedKey?.split('-')[0];

    if (letter && this.isCorrect(letter)) {
      this.updateProgress();
      this.pianoComponent.changeMarkColor('green');

      if(this.firstAttemptCorrect) {
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

    if(notes.length === 1) {
      if(notes[0] === this.currentQuestion) {
        this.updateProgress();

        this.notesystemComponent.changeMarkColor('green');

        if(this.firstAttemptCorrect) {
          this.correctAnswers++;
        }

        this.nextQuestion();
      } else {
        this.firstAttemptCorrect = false;
        this.notesystemComponent.changeMarkColor('red');
      }
    }

    console.log(notes[0]);
  }

  checkIfRight(letter: string, button: HTMLButtonElement): void {
    if (this.isCorrect(letter)) {
      this.updateProgress();

      if(this.firstAttemptCorrect) {
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

    const correct =  letter === this.currentQuestion.split('-')[0];

    if(correct) {
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

      if(this.action === 'lies') {
        this.pianoComponent.currentQuestion = this.currentQuestion;
      }
    }
    this.checkCompletion();
  }

  checkCompletion(): void {
    if (this.progress === this.totalSegments) {
      this.evaluation = `${((this.correctAnswers / this.totalQuestions) * 100).toFixed(2)}%`;
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
    this.router.navigate(['/stammtoene']);
  }

  extendQuestion(): void {
    this.showHelpMessage = !this.showHelpMessage;
  }

  onSelectedKeyChanged(selectedKey: boolean) {
    this.buttonDisabled = !selectedKey;
  }

  nextTask(): void {
    this.usedLetters.clear();

    const nextIndex = (this.currentIndex + 1) % this.texts.length;
    const nextAction = this.texts[nextIndex].text.startsWith('Markiere') ? 'markiere' : 'lies';
    const nextLetters = this.texts[nextIndex].value;

    this.router.navigate(['/task'], { queryParams: { action: nextAction, letters: nextLetters, index: nextIndex} });
    this.ngOnInit();
  }

  eraser(): void {
    this.isErasing === true ? this.isErasing = false : this.isErasing = true;
  }
}
