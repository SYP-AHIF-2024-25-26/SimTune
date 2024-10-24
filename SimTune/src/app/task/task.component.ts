import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  action: string | null = null;
  letters: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
      this.letters = params['letters'];
    });
  }

  checkIfRight(letter: string, button: HTMLButtonElement): void {
    if (this.isCorrect(letter)) {
      button.style.backgroundColor = '#1E9C27';
      button.style.color = 'white';

      setTimeout(() => {
        button.style.backgroundColor = 'none';
        button.style.color = 'black;';
      }, 2000)
    }
  }

  isCorrect(letter: string): boolean {
    return true;
  }
}
