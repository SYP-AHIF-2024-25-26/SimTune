import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskData } from './task-data';
import { CommonModule } from '@angular/common';

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

  texts: { text: string; value: string }[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.content.set(data['content']);
    });
    this.route.data.subscribe(data => {
      this.breadcrumb_elements.set(data['breadcrumbElements']);
    })

    this.taskType.set(this.content()?.['task-type']);

    switch (this.taskType()) {
      case 'stammtoene':
        // call the database (select * from Tasks where task-type = 'stammtoene')
        this.texts = [
          { text: "Lies c, d und e", value: "c,d,e" },
          { text: "Markiere c, d und e", value: "c,d,e" },
          { text: "Lies e, f und g", value: "e,f,g" },
          { text: "Markiere e, f und g", value: "e,f,g" },
          { text: "Lies c bis g", value: "c,d,e,f,g" },
          { text: "Markiere c bis g", value: "c,d,e,f,g" },
          { text: "Lies g, a, h und c", value: "g,a,h,c" },
          { text: "Markiere g, a, h und c", value: "g,a,h,c" },
          { text: "Lies Orientierungstöne", value: "Orientierungstöne,c,d,e,f,g,a,h" },
          { text: "Lies alle Stammtöne", value: "c,d,e,f,g,a,h" },
          { text: "Markiere alle Stammtöne", value: "c,d,e,f,g,a,h" },
        ];
        break;
      case 'notensystem':
        this.texts = [
          { text: "Lies c, d und e", value: "c,d,e" },
          { text: "Schreibe c, d und e", value: "c,d,e" },
          { text: "Lies e, f und g", value: "e,f,g" },
          { text: "Schreibe e, f und g", value: "e,f,g" },
          { text: "Lies c bis g", value: "c,d,e,f,g" },
          { text: "Schreibe c bis g", value: "c,d,e,f,g" }
        ];
      break;
      default:
        break;
    }
  }

  goToTask(text: string): void {
    const action = text.startsWith('Markiere') ? 'markiere' : 'lies';
    const foundItem = this.texts.find(item => item.text === text);
    const letters = foundItem ? foundItem.value : '';
    const index = foundItem ? this.texts.indexOf(foundItem) : 0;
    localStorage.setItem('texts', JSON.stringify(this.texts));

    this.router.navigate(['/task'], { queryParams: { action, letters, index } });
  }
}
