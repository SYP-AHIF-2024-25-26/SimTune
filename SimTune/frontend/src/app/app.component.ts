import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
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
  title = 'SimTune';
  volume: number = 100;
  lastVolume: number = 100;
  showMobileDropdown: boolean = false;
  showDesktopDropdown: boolean = false;

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

  getRoleFromJwt(): string | null {
    const token = sessionStorage.getItem('jwt');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch {
      return null;
    }
  }

  toggleMobileDropdown(): void {
    this.showMobileDropdown = !this.showMobileDropdown;
  }

  closeMobileDropdown(): void {
    this.showMobileDropdown = false;
  }

  toggleDesktopDropdown(): void {
    this.showDesktopDropdown = !this.showDesktopDropdown;
  }

  closeDesktopDropdown(): void {
    this.showDesktopDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Prüfe ob innerhalb eines Dropdowns oder Buttons geklickt wurde
    const clickedInsideDropdown = target.closest('.absolute, .mobile-dropdown') ||
                                   target.closest('button img[src*="ProfilePage"]')?.parentElement;

    if (!clickedInsideDropdown) {
      this.showMobileDropdown = false;
      this.showDesktopDropdown = false;
    }
  }
}
