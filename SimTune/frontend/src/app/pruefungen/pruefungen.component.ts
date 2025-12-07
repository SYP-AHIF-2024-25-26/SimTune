import { CommonModule } from '@angular/common';
import { Component, NgZone, signal, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { API_URL, fetchRestEndpoint, fetchRestEndpointWithAuthorization } from '../api-calls/fetch-rest-endpoint';
import { PianoComponent } from '../piano/piano.component';
import Plotly from 'plotly.js-basic-dist';
import { ExamStatsResponse } from '../profile-page/profile-page.component';

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
  last5: any[] = [];
  constructor(private router: Router, private ngZone: NgZone) {}

  async ngAfterViewInit() {
    var userTests: ExamStatsResponse = await fetchRestEndpointWithAuthorization(API_URL + 'exam-simulation/completed', 'GET', );
    if (userTests && userTests.allExams.length > 0) {
      const mapped = userTests.allExams.map(ex => ({
        achievedPercentageValue: ex.achievedPercentage,
        completedAtRaw: ex.completedAt.toString(),
        completedAtFormatted: new Date(ex.completedAt).toLocaleDateString('de-DE') + ' ' + new Date(ex.completedAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      }));

      const sorted = mapped.sort((a, b) =>
        new Date(b.completedAtRaw).getTime() - new Date(a.completedAtRaw).getTime()
      );

      this.last5 = sorted.slice(0, 5).reverse();
    }

    const xLabels = this.last5.map(x => x.completedAtFormatted);
    const values  = this.last5.map(x => x.achievedPercentageValue);

    while (xLabels.length < 5) {
      xLabels.unshift("");
      values.unshift(null);
    }

    const data = [{
      x: xLabels,
      y: values,
      type: "bar" as const,
      hovertemplate: "für mehr Infos klicken<extra></extra>",
      marker: { color: "#5a8dee" },
    }];

    const layout: Partial<Plotly.Layout> = {
      title: { text: "Simulationsergebnisse" },
      margin: { t: 100, l: 0, r: 10, b: 100 },
      paper_bgcolor: "#f3f4f6",
      plot_bgcolor: "#f3f4f6",
      xaxis: {
        title: { text: "Datum" },
        tickangle: -45,
        automargin: true
      },
      yaxis: {
        title: { text: "Erreichte Prozent", standoff: 30},
        dtick: 10,
        range: [0, 101],
        automargin: true
      },
    bargap: 0.25
    };

    Plotly.newPlot("plot", data, layout, {
      displayModeBar: false,
      responsive: true
    }).then((gd: any) => {
      gd.on("plotly_click", (event: any) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl("/profile-page");
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
    const uniqueIds = Array.from(new Set(allIds));

    const path = this.router.url;
    localStorage.setItem("previousUrl", path);

    localStorage.setItem("isPruefung", "yes");
    localStorage.setItem("exerciseAllocation", JSON.stringify(selectedTypes));

    this.router.navigate(['/task'], { queryParams: { id: uniqueIds } });
  }
}
