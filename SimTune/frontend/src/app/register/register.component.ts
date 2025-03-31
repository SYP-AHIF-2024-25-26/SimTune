import { Component, signal } from '@angular/core';
import { API_URL, fetchRestEndpoint } from '../api-calls/fetch-rest-endpoint';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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


  async signUp(): Promise<void> {
    await fetchRestEndpoint(API_URL + 'usermanagement/register', 'POST', {
      email: this.email(),
      username: this.username(),
      password: this.password()
    });
  }
}
