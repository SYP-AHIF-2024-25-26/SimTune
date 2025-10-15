import { Routes } from '@angular/router';
import { UebungenComponent } from './uebungen/uebungen.component';
import { PruefungenComponent } from './pruefungen/pruefungen.component';
import { UnterlagenComponent } from './unterlagen/unterlagen.component';
import { HomepageComponent } from './homepage/homepage.component';
import { intervalleData, notenSystemData, stammtoeneData, toeneData, tonleiternData, uebungenData } from './uebungen/task-data';
import { TaskComponent } from './task/task.component';
import { PianoComponent } from './piano/piano.component';
import { NotesystemComponent } from './notesystem/notesystem.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { Verify } from 'crypto';
import { VerifyComponent } from './verify/verify.component';
import { SchuelerDashboardComponent } from './schueler-dashboard/schueler-dashboard.component';
import { LehrerDashboardComponent } from './lehrer-dashboard/lehrer-dashboard.component';

export const routes: Routes = [
  {
    path: 'uebungen',
    component: UebungenComponent,
    data: {
      content: uebungenData,
      breadcrumbElements: [{ label: 'Übungen', url: '/uebungen' }],
      taskType: ''
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
      taskType: ''
    },
  },
  {
    path: 'stammtoene-klavier',
    component: UebungenComponent,
    data: {
      content: stammtoeneData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Klavier', url: '/toene' },
        { label: 'Stammtöne', url: '/stammtoene-klavier' },
      ],
      taskType: 'StammtoeneKlavier'
    },
  },
  {
    path: 'versetzungszeichen-klavier',
    component: UebungenComponent,
    data: {
      content: stammtoeneData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Klavier', url: '/toene' },
        { label: 'Versetzungszeichen', url: '/versetzungszeichen-klavier' },
      ],
      taskType: 'VersetzungszeichenKlavier'
    },
  },
  {
    path: 'stammtoene-violinschluessel',
    component: UebungenComponent,
    data: {
      content: notenSystemData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Violinschlüssel', url: '/toene' },
        { label: 'Stammtöne', url: '/stammtoene-violinschluessel' },
      ],
      taskType: 'StammtoeneViolinschluessel'
    }
  },
  {
    path: 'versetzungszeichen-violinschluessel',
    component: UebungenComponent,
    data: {
      content: notenSystemData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Violinschlüssel', url: '/toene' },
        { label: 'Versetzungszeichen', url: '/versetzungszeichen-violinschluessel' },
      ],
      taskType: 'VersetzungszeichenViolinschluessel'
    }
  },
  {
    path: 'hilfslinien-violinschluessel',
    component: UebungenComponent,
    data: {
      content: notenSystemData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Violinschlüssel', url: '/toene' },
        { label: 'Hilfslinien', url: '/hilfslinien-violinschluessel' },
      ],
      taskType: 'HilfslinienViolinschluessel'
    }
  },
  {
    path: 'stammtoene-basschluessel',
    component: UebungenComponent,
    data: {
      content: notenSystemData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Bassschlüssel', url: '/toene' },
        { label: 'Stammtöne', url: '/stammtoene-basschluessel' },
      ],
      taskType: 'StammtoeneBassschluessel'
    }
  },
  {
    path: 'versetzungszeichen-basschluessel',
    component: UebungenComponent,
    data: {
      content: notenSystemData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Bassschlüssel', url: '/toene' },
        { label: 'Versetzungszeichen', url: '/versetzungszeichen-basschluessel' },
      ],
      taskType: 'VersetzungszeichenBassschluessel'
    }
  },
  {
    path: 'hilfslinien-basschluessel',
    component: UebungenComponent,
    data: {
      content: notenSystemData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Bassschlüssel', url: '/toene' },
        { label: 'Hilfslinien', url: '/hilfslinien-basschluessel' },
      ],
      taskType: 'HilfslinienBassschluessel'
    }
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
      taskType: 'Intervalle'
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
      content: tonleiternData,
      breadcrumbElements: [
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonleitern', url: '/tonleitern' },
      ],
      taskType: 'Tonleitern'
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
        {label: 'Tonarten', url: '/tonarten' },
      ],
      taskType: 'Tonarten'
    },
  },
  { path: 'pruefungen', component: PruefungenComponent },
  { path: 'unterlagen', component: UnterlagenComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'task', component: TaskComponent },
  { path: 'piano', component: PianoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile-page', component: ProfilePageComponent },
  { path: 'verify', component: VerifyComponent},
  { path: 'schueler-dashboard', component: SchuelerDashboardComponent},
  { path: 'lehrer-dashboard', component: LehrerDashboardComponent},
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
];
