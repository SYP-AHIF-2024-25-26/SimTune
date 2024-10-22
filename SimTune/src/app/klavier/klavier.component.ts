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
}