import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-lehrer-dashboard',
  standalone: true,
  imports: [BrowserModule, FormsModule],
  templateUrl: './lehrer-dashboard.component.html',
  styleUrl: './lehrer-dashboard.component.css'
})
export class LehrerDashboardComponent {
  gruppen: { name: string; key: string; schueler: string[]; beitrittsanfragen: string[]; aufgaben: string[] }[] = [];
  neueGruppe = '';
}
