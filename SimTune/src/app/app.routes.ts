import { Routes } from '@angular/router';
import { UebungenComponent } from './uebungen/uebungen.component';
import { PruefungenComponent } from './pruefungen/pruefungen.component';
import { UnterlagenComponent } from './unterlagen/unterlagen.component';
import { HomepageComponent } from './homepage/homepage.component';
import { StammtoeneComponent } from './stammtoene/stammtoene.component';
import { intervalleData, toeneData, uebungenData } from './uebungen/task-data';
import { TaskComponent } from './task/task.component';
import { PianoComponent } from './piano/piano.component';
import { NotesystemComponent } from './notesystem/notesystem.component';
import { url } from 'node:inspector';

export const routes: Routes = [
  {
    path: 'uebungen',
    component: UebungenComponent,
    data: {
      content: uebungenData,
      breadcrumbElements: [{ label: 'Übungen', url: '/uebungen' }],
    },
  },
  {
    path: 'toene',
    component: UebungenComponent,
    data: {
      content: toeneData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
      ],
    },
  },
  {
    path: 'stammtoene',
    component: StammtoeneComponent,
    data: {
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Klavier', url: '/toene' },
        { label: 'Stammtöne', url: '/stammtoene' },
      ],
    },
  },
  {
    path: 'rhythmus',
    component: UebungenComponent,
    data: {
      content: toeneData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
      ],
    },
  },
  {
    path: 'intervalle',
    component: UebungenComponent,
    data: {
      content: intervalleData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Intervalle', url: '/intervalle' },
      ],
    },
  },
  {
    path: 'akkorde',
    component: UebungenComponent,
    data: {
      content: intervalleData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Akkorde', url: '/akkorde' },
      ],
    },
  },
  {
    path: 'tonleitern',
    component: UebungenComponent,
    data: {
      content: intervalleData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonleitern', url: '/tonleitern' },
      ],
    },
  },
  {
    path: 'tonarten',
    component: UebungenComponent,
    data: {
      content: intervalleData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonarten', url: '/tonarten' },
      ],
    },
  },
  { path: 'pruefungen', component: PruefungenComponent },
  { path: 'unterlagen', component: UnterlagenComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'task', component: TaskComponent },
  { path: 'piano', component: PianoComponent },
  { path: 'notesystem', component: NotesystemComponent },
  { path: '', redirectTo: '/notesystem', pathMatch: 'full' },
];
