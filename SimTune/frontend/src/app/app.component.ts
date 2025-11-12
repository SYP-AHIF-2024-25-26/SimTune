import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

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
  showNavDropdown = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

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

  isActiveUebungen(): boolean {
    const currentUrl = this.router.url;

    return !(
      currentUrl.startsWith('/homepage') ||
      currentUrl.startsWith('/pruefungen')
    );
  }

  isActivePruefung(): boolean {
    const currentUrl = this.router.url;

    return currentUrl.startsWith('/pruefungen');
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
    if (this.showDesktopDropdown) {
      this.showNavDropdown = false;
    }
  }

  closeDesktopDropdown(): void {
    this.showDesktopDropdown = false;
  }

  toggleNavDropdown() {
    this.showNavDropdown = !this.showNavDropdown;
    if (this.showNavDropdown) {
      this.showDesktopDropdown = false;
    }
  }

  closeNavDropdown() {
    this.showNavDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Prüfe ob innerhalb der Dropdown-Container geklickt wurde
    const clickedInsideNav = target.closest('.nav-dropdown-container');
    const clickedInsideProfile = target.closest('.profile-dropdown-container');

    if (!clickedInsideNav) {
      this.showNavDropdown = false;
    }

    if (!clickedInsideProfile) {
      this.showDesktopDropdown = false;
    }
  }
}
