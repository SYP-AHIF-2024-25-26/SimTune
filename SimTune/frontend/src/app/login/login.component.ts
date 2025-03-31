import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  email = signal<string | "">("");
  username = signal<string | "">("");
  password = signal<string | "">("");

  async login(): Promise<void> {
    const jwt = await fetchRestEndpoint(API_URL + 'usermanagement/login', 'POST', {
      email: this.email(),
      password: this.password()
    });
    console.log(jwt);
  }
}
