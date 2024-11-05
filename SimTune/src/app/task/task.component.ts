import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { PianoComponent } from "../piano/piano.component";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, RouterModule, PianoComponent],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  action: string | null = null;
  letters: string | null = null;
  availableLetters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  currentQuestion: string = '';
  randomizedQuestions: string[] = [];
  questionIndex: number = 0;
  lastPressedLetter: string | null = null;
  progress: number = 0;
  correctAnswers: number = 0;
  totalSegments: number = 0;
  totalQuestions: number = 0;
  showHelpMessage = false;
  private firstAttemptCorrect: boolean = true;
  evaluation: string = '';
  Math: any;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
      this.letters = params['letters'];
      if (this.letters) {
        this.setupQuestions();
      }
    });
  }

  setupQuestions(): void {
    const uniqueLetters = this.letters ? this.letters.split(',') : [];
    const filteredLetters = uniqueLetters.filter(letter => letter.trim() !== 'Orientierungstöne');
    this.totalQuestions = filteredLetters.length * 3;
    this.totalSegments = this.totalQuestions;

    const allQuestions = [];
    for (let i = 0; i < 3; i++) {
      allQuestions.push(...filteredLetters);
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
    return letter === this.currentQuestion;
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
    }
    this.checkCompletion();
  }

  checkCompletion(): void {
    if (this.progress === this.totalSegments) {
      this.evaluation = `${((this.correctAnswers / this.totalQuestions) * 100).toFixed(2)}%`;
      console.log('Fertig! Alle Segmente sind blau.');
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
    this.location.back();
  }

  extendQuestion(): void {
    this.showHelpMessage = !this.showHelpMessage;
  }
}
