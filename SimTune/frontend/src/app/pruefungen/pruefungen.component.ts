import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { API_URL, fetchRestEndpoint } from '../api-calls/fetch-rest-endpoint';
import { PianoComponent } from '../piano/piano.component';

@Component({
  selector: 'app-pruefungen',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pruefungen.component.html',
  styleUrl: './pruefungen.component.css'
})
export class PruefungenComponent {
  maxValue: number = 0;
  selectedNumber = signal<number>(1);
  isSimulationRunning = signal<boolean>(false);
  selectedTypes = signal<string[]>(['Stammtoene', 'Notensystem', 'Intervalle', 'Tonleitern', 'Lies', 'Schreib']);
  texts: { description: string; values: string, exerciseType: string}[] = [];

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    const stammtoene = await fetchRestEndpoint(API_URL + 'exercises/Stammtoene', 'GET');
    const notensystem = await fetchRestEndpoint(API_URL + 'exercises/Notensystem', 'GET');
    const intervalle = await fetchRestEndpoint(API_URL + 'exercises/Intervalle', 'GET');
    const tonleitern = await fetchRestEndpoint(API_URL + 'exercises/Tonleitern', 'GET');

    this.texts = [
      ...stammtoene.map((item: any) => ({ description: item.description, values: item.values, exerciseType: 'Stammtoene' })),
      ...notensystem.map((item: any) => ({ description: item.description, values: item.values, exerciseType: 'Notensystem' })),
      ...intervalle.map((item: any) => ({ description: item.description, values: item.values, exerciseType: 'Intervalle' })),
      ...tonleitern.map((item: any) => ({ description: item.description, values: item.values, exerciseType: 'Tonleitern' })),
    ];

    this.maxValue = this.texts.length;
  }

  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    const value = Number(inputValue);

    if (!isNaN(value) && value >= 1 && value <= this.maxValue && Number.isInteger(value)) {
      this.selectedNumber.set(value);
    } else if (inputValue === '') {
      this.selectedNumber.set(1);
    }
  }

  toggleType(type: string) {
    this.selectedTypes.update((types) =>
      types.includes(type)
        ? types.filter((t) => t !== type)
        : [...types, type]
    );
  }
  startSimulation() {
    this.isSimulationRunning.set(true);
    const selectedTypes = this.selectedTypes();
    const filteredTexts = this.texts.filter(text => {
      if (['Stammtoene', 'Notensystem', 'Intervalle', 'Tonleitern'].includes(text.exerciseType)) {
        return selectedTypes.includes(text.exerciseType);
      }
      return false;
    }).filter(text => {
      const isLiesSelected = selectedTypes.includes('Lies');
      const isSchreibSelected = selectedTypes.includes('Schreib');

      if(text.exerciseType == 'Tonleitern') {
        if(isLiesSelected) {
          return text.description.startsWith('Bestimme');
        }
      } else {
        if (isLiesSelected && isSchreibSelected) {
          return true;
        }
        if (isSchreibSelected && !isLiesSelected) {
          return !text.description.startsWith('Lies');
        }
        if (isLiesSelected && !isSchreibSelected) {
          return text.description.startsWith('Lies');
        }
      }

      return false;
    });

    const shuffledTexts = filteredTexts.sort(() => Math.random() - 0.5);
    const selectedTexts = shuffledTexts.slice(0, Math.min(this.selectedNumber(), shuffledTexts.length));

    sessionStorage.setItem('texts from pruefung', JSON.stringify(selectedTexts));
    sessionStorage.setItem('toneType', selectedTexts[0].exerciseType.trim());
    sessionStorage.setItem('previousUrl', this.router.url);

    let action = '';
    switch (true) {
      case selectedTexts[0].description.startsWith('Lies'):
        action = 'lies';
        break;
      case selectedTexts[0].description.startsWith('Markiere'):
        action = 'markiere';
        break;
      case selectedTexts[0].description.startsWith('Schreibe'):
        action = 'schreibe';
        break;
      case selectedTexts[0].description.startsWith('Bestimme'):
        action = 'bestimme';
        break;
    }

    this.router.navigate(['/task'], { queryParams: { action } });
  }
}
