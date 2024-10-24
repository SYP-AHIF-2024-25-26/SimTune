import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-klavier',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './klavier.component.html',
  styleUrl: './klavier.component.css'
})
export class KlavierComponent {
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
    }
  }

  isCorrect(letter: string): boolean {
    return true;
  }
}
