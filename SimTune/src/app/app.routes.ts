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

export const routes: Routes = [
  { path: 'uebungen', component: UebungenComponent, data: { content: uebungenData } },
  { path: 'toene', component: UebungenComponent, data: { content: toeneData } },
  { path: 'intervalle', component: UebungenComponent, data: { content: intervalleData } },
  { path: 'pruefungen', component: PruefungenComponent},
  { path: 'unterlagen', component: UnterlagenComponent},
  { path: 'homepage', component: HomepageComponent},
  { path: 'stammtoene', component: StammtoeneComponent},
  { path: 'task', component: TaskComponent},
  { path: 'piano', component: PianoComponent},
  { path: 'notesystem', component: NotesystemComponent},
  { path: '', redirectTo: '/notesystem', pathMatch: 'full' }
];
