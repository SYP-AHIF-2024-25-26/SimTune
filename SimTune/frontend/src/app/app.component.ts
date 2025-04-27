import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, RouterModule, FormsModule, CommonModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  volume: number = 100;
  lastVolume: number = 100;

  ngOnInit(): void {
    this.volume = parseInt(sessionStorage.getItem('volume') ?? '100');
    this.lastVolume = this.volume;
  }

  adjustVolume(): void {
    sessionStorage.setItem('volume', this.volume.toString());
    this.lastVolume = this.volume;
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('jwt') != null ? true : false;
  }

  noSound(): void {
    if(this.volume == 0) {
      this.volume = this.lastVolume;
    } else {
      this.volume = 0;
    }
  }
}
