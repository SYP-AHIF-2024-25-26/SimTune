import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, RouterModule, FormsModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  volume: number = 100;

  ngOnInit(): void {
    this.volume = parseInt(sessionStorage.getItem('volume') ?? '100');
  }

  adjustVolume(): void {
    sessionStorage.setItem('volume', this.volume.toString());
  }
}
