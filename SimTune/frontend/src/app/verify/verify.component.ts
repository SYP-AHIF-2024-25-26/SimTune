import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { API_URL, fetchRestEndpoint } from '../api-calls/fetch-rest-endpoint';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
  verifiziert: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  async ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    console.log(token);


    if (token) {
      try {
        const isValid = await fetchRestEndpoint(API_URL + 'usermanagement/verify', 'POST', {
          token: token
        });
        console.log(isValid.message);

        this.verifiziert = isValid.message === "E-Mail erfolgreich verifiziert.";
      } catch (error) {
        console.error('Error verifying token:', error);
        this.verifiziert = false;
      }
    } else {
      this.verifiziert = false;
    }
  }
}
