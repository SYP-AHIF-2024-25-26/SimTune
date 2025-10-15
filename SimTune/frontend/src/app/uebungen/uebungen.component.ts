import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskData } from './task-data';
import { CommonModule } from '@angular/common';
import { API_URL, fetchRestEndpoint, fetchRestEndpointWithAuthorization } from '../api-calls/fetch-rest-endpoint';

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

  //texts: { exerciseId: number, description: string; values: string, done: boolean}[] = [];
  texts: any[] = [];
  toneType: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.route.data.subscribe(data => {
      this.content.set(data['content']);
    });
    this.route.data.subscribe(data => {
      this.breadcrumb_elements.set(data['breadcrumbElements']);
    })

    this.route.data.subscribe(data => {
      this.taskType.set(data['taskType']);
    });
    var userExercises;

    if (this.taskType() !== undefined && this.taskType() !== '') {
      this.texts = await fetchRestEndpoint(API_URL + 'exercises/' + this.taskType(), 'GET');
    }
    this.markDoneExercises();
  }

  async markDoneExercises() {
    var userExercises;
    if(sessionStorage.getItem('jwt') !== null) {
      userExercises = await fetchRestEndpointWithAuthorization(API_URL + 'usermanagement/completed-exercises', 'GET', );
    } else {
      return;
    }
    const completedDescriptions = userExercises.map((ex: { exerciseId: any; }) => ex.exerciseId);
    this.texts = this.texts.map(t => ({
      ...t,
      done: completedDescriptions.includes(t.exerciseId)
    }));
  }

  goToTask(text: string): void {
    let action = '';

    if(text.startsWith('Schreibe')) {
      action = 'schreibe';
    } else {
      action = text.startsWith('Markiere') ? 'markiere' : 'lies';
    }

    if (text.startsWith('Bestimme')) {
      action = 'bestimme';
      const foundItem = this.texts.find(item => item.description === text);
      sessionStorage.setItem('descriptions', JSON.stringify(foundItem?.description));
    }

    const foundItem = this.texts.find(item => item.description === text);

    sessionStorage.setItem('previousUrl', this.router.url);

    this.router.navigate(['/task'], { queryParams: { id: foundItem?.id } });
  }
}
