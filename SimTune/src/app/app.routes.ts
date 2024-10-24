import { Routes } from '@angular/router';
import { UebungenComponent } from './uebungen/uebungen.component';
import { PruefungenComponent } from './pruefungen/pruefungen.component';
import { UnterlagenComponent } from './unterlagen/unterlagen.component';
import { HomepageComponent } from './homepage/homepage.component';
import { StammtoeneComponent } from './stammtoene/stammtoene.component';
import { toeneData, uebungenData } from './uebungen/task-data';
import { TaskComponent } from './task/task.component';

export const routes: Routes = [
  { path: 'uebungen', component: UebungenComponent, data: { content: uebungenData } },
  { path: 'toene', component: UebungenComponent, data: { content: toeneData } },
  { path: 'pruefungen', component: PruefungenComponent},
  { path: 'unterlagen', component: UnterlagenComponent},
  { path: 'homepage', component: HomepageComponent},
  { path: 'stammtoene', component: StammtoeneComponent},
  { path: 'task', component: TaskComponent},
  { path: '', redirectTo: '/homepage', pathMatch: 'full' }
];
