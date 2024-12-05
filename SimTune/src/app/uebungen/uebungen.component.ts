import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.content.set(data['content']);
    });
    this.route.data.subscribe(data => {
      this.breadcrumb_elements.set(data['breadcrumbElements']);
    })
  }

}
