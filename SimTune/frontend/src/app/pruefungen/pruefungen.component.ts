import { CommonModule } from '@angular/common';
import { Component, NgZone, signal, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { API_URL, fetchRestEndpoint } from '../api-calls/fetch-rest-endpoint';
import { PianoComponent } from '../piano/piano.component';
import Plotly from 'plotly.js-basic-dist';

@Component({
  selector: 'app-pruefungen',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pruefungen.component.html',
  styleUrl: './pruefungen.component.css'
})
export class PruefungenComponent {
  maxValue: number = 0;
  selectedNumber = signal<number | null>(5);
  isSimulationRunning = signal<boolean>(false);
  selectedTypes = signal<string[]>(['Töne', 'Rythmus', 'Intervalle', 'Tonleitern', 'Tonarten', 'Akkorde']);
  texts: { totalQuestions: number; questions: { exerciseId: number; contentId: number; description: string; exerciseType: string; exerciseAllocation: string;}[] } | null = null;
  errorMessage = '';
  constructor(private router: Router, private ngZone: NgZone) {}

    ngAfterViewInit() {
      const xLabels = ["03.12.2025", "02.12.2025", "01.12.2025", "30.11.2025", "29.11.2025", "28.11.2025"];
      const values  = [12, 18, 7, 15, 9, 30];

      const data = [{
        x: xLabels,
        y: values,
        type: "bar" as const,
        hovertemplate: "für mehr Infos klicken<extra></extra>",
        marker: { color: "#5a8dee" }
      }];

      const layout = {
        title: { text: "Simulationsergebnisse" },
        margin: { t: 100, l: 0, r: 10, b: 100 },
        paper_bgcolor: "#f3f4f6",
        plot_bgcolor: "#f3f4f6",
      };

      // 1) Plot zeichnen und das Graph-Div zurückbekommen
      Plotly.newPlot("plot", data, layout, {
        displayModeBar: false,
        responsive: true
      }).then((gd: any) => {

        // 2) Plotly-Event richtig anbinden
        gd.on("plotly_click", (event: any) => {
          console.log("plotly_click event:", event);   // zum Testen

          // 3) In Angular-Zone wechseln + Router benutzen
          this.ngZone.run(() => {
            this.router.navigateByUrl("/profile-page");
            // alternativ:
            // this.router.navigate(["/profile-page"]);
          });
        });

      });
    }


  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue === '') {
      this.selectedNumber.set(null);
      return;
    }
    const value = Number(inputValue);
    if (isNaN(value)) return;

    this.selectedNumber.set(value);
  }


  toggleType(type: string) {
    this.selectedTypes.update((types) =>
      types.includes(type)
        ? types.filter((t) => t !== type)
        : [...types, type]
    );
  }

  checkErrors(): boolean {
    this.errorMessage = '';

    if (this.selectedTypes().length === 0) {
      this.errorMessage = 'Bitte wählen Sie mindestens eine Übungsart aus.';
      return true;
    }

    const num = this.selectedNumber();
    if (!num || num < 1) {
      this.errorMessage = 'Bitte geben Sie eine gültige Fragenanzahl ein.';
      return true;
    }

    return false;
  }

  async startSimulation() {
    if(this.checkErrors()) { return; }

    this.isSimulationRunning.set(true);
    const selectedTypes = this.selectedTypes();
    const selectedTypesString = selectedTypes.join(',');

    const url = new URL(API_URL + 'exam-simulation/exercises');
    url.searchParams.append('questionCount', this.selectedNumber()!.toString());
    url.searchParams.append('exerciseAllocations', selectedTypesString);

    this.texts = await fetchRestEndpoint(url.toString(), 'GET');

    const allIds = this.texts!.questions.map(q => q.exerciseId);
    //const uniqueIds = Array.from(new Set(allIds));
    const uniqueIds = 1;

    const path = this.router.url;
    localStorage.setItem("previousUrl", path);

    localStorage.setItem("isPruefung", "yes");
    localStorage.setItem("exerciseAllocation", JSON.stringify(selectedTypes));

    this.router.navigate(['/task'], { queryParams: { id: uniqueIds } });
  }
}
