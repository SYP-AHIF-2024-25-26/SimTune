import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { API_URL, fetchRestEndpoint } from '../api-calls/fetch-rest-endpoint';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginError = signal<string | null>(null);
  email = signal<string | "">("");
  username = signal<string | "">("");
  password = signal<string | "">("");

  constructor(private router: Router) { }

  async login(): Promise<void> { //UserDTO
    try {
      const jwt = await fetchRestEndpoint(API_URL + 'usermanagement/login', 'POST', {
        email: this.email(),
        password: this.password()
      });

      console.log(jwt.token);
      sessionStorage.setItem("jwt", jwt.token);
      this.router.navigate(['/']);
    } catch (error) {
      console.error("Fehler beim Login:", error);
      this.loginError.set('Login fehlgeschlagen. Bitte überprüfe deine Eingaben.');
    }
  }
}
