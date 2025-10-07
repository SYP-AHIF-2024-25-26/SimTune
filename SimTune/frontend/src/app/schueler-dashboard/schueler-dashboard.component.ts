import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-schueler-dashboard',
  standalone: true,
  imports: [BrowserModule, FormsModule],
  templateUrl: './schueler-dashboard.component.html',
  styleUrl: './schueler-dashboard.component.css'
})
export class SchuelerDashboardComponent {
  gruppen: { name: string; status: 'pending' | 'accepted'; aufgaben: string[] }[] = [];
  eintrittsCode = '';
}
