import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskData } from './task-data';
import { CommonModule } from '@angular/common';
import { API_URL, fetchRestEndpoint } from '../api-calls/fetch-rest-endpoint';

@Component({
  selector: 'app-uebungen',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './uebungen.component.html',
  styleUrl: './uebungen.component.css'
})
export class UebungenComponent implements OnInit {
  content = signal<TaskData | undefined>(undefined);
  breadcrumb_elements = signal<{ label: string; url: string}[] | undefined>(undefined);
  taskType = signal<string | undefined>(undefined);

  texts: { description: string; values: string }[] = [];
  toneType: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.route.data.subscribe(data => {
      this.content.set(data['content']);
    });
    this.route.data.subscribe(data => {
      this.breadcrumb_elements.set(data['breadcrumbElements']);
    })

    this.taskType.set(this.content()?.['task-type']);

    switch (this.taskType()) {
      case 'stammtoene':
        this.texts = await fetchRestEndpoint(API_URL + 'exercises/Stammtoene', 'GET');

        this.toneType = 'Stammtoene';
        break;
      case 'notensystem':
        this.texts = await fetchRestEndpoint(API_URL + 'exercises/Notensystem', 'GET');
        
        this.toneType = 'Notensystem';
      break;
      case 'intervalle':
        this.texts = [
          { description: "Lies Prime bis Quinte", values: "Prime,Sekunde,Terz,Quarte,Quinte" },
          { description: "Schreibe Prime bis Quinte", values: "Prime,Sekunde,Terz,Quarte,Quinte" },
          { description: "Lies Sexte bis Oktave", values: "Sexte,Septime,Oktave" },
          { description: "Schreibe Sexte bis Oktave", values: "Sexte,Septime,Oktave" },
          { description: "Lies alle Intervalle", values: "Prime,Sekunde,Terz,Quarte,Quinte,Sexte,Septime,Oktave" },
          { description: "Schreibe alle Intervalle", values: "Prime,Sekunde,Terz,Quarte,Quinte,Sexte,Septime,Oktave" },
        ];

        this.toneType = 'Intervalle';
        break;
      default:
        break;
    }
  }

  goToTask(text: string): void {
    let action = '';
    if(text.startsWith('Schreibe')) {
      action = 'schreibe';
    } else {
      action = text.startsWith('Markiere') ? 'markiere' : 'lies';
    }
    const foundItem = this.texts.find(item => item.description === text);
    const letters = foundItem ? foundItem.values : '';
    const index = foundItem ? this.texts.indexOf(foundItem) : 0;

    sessionStorage.setItem('texts', JSON.stringify(this.texts));
    sessionStorage.setItem('toneType', this.toneType);

    sessionStorage.setItem('previousUrl', this.router.url);

    this.router.navigate(['/task'], { queryParams: { action, letters, index } });
  }
}
