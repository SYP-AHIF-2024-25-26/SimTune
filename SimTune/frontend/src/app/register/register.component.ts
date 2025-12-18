import { Component, signal } from '@angular/core';
import { API_URL, fetchRestEndpoint } from '../api-calls/fetch-rest-endpoint';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = signal<string | "">("");
  username = signal<string | "">("");
  password = signal<string | "">("");
  confirmPassword = signal<string | "">("");
  errorMessage = signal<string>("");
  errorHighlighted = signal<boolean>(false);
  showModal = signal<boolean>(false);

  constructor(private router: Router) { }


  async signUp(): Promise<void> {
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const error = [
      [this.email() == "", "E-Mail darf nicht leer sein."],
      [!isValidEmail(this.email()), "E-Mail ist ungültig."],
      [this.username() == "", "Benutzername darf nicht leer sein."],
      [this.username().length > 20, "Benutzername darf maximal 20 Zeichen lang sein."],
      [this.password() == "", "Passwort darf nicht leer sein."],
      [this.confirmPassword() == "", "Passwortbestätigung darf nicht leer sein."],
      [this.password() !== this.confirmPassword(), "Passwörter stimmen nicht überein."],
    ].find(([condition]) => condition)?.[1];


    if(error == undefined) {
      try {
      const response = await fetchRestEndpoint(API_URL + 'usermanagement/register', 'POST', {
        email: this.email(),
        username: this.username(),
        password: this.password()
      });

      this.errorMessage.set("");

      this.showModal.set(true);
    } catch (error) {
      console.error("Fehler beim Registrieren:", error);
      this.errorHighlighted.set(true);

      setTimeout(() => {
        this.errorHighlighted.set(false);
      }, 1000);

      this.errorMessage.set("E-Mail schon in Verwendung.");
    }
    } else {
      this.errorHighlighted.set(true);

      setTimeout(() => {
        this.errorHighlighted.set(false);
      }, 1000);

      this.errorMessage.set(typeof error === 'string' ? error : '');
    }
  }

  closeModal() {
    this.showModal.set(false);
    this.router.navigate(['/']);
  }
}
