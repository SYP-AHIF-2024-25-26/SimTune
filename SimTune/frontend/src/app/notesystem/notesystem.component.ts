import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import e from 'express';

@Component({
  selector: 'app-notesystem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notesystem.component.html',
  styleUrl: './notesystem.component.css'
})
export class NotesystemComponent {
  @Input() action: string | null = null;
  @Input() isIntervall: boolean = false;
  @Input() currentQuestion: string | null = null;
  @Output() enableButton = new EventEmitter<boolean>();

  allNotesRead = ['', 'a-2', 'g-2', 'f-2', 'e-2', 'd-2', 'c-2', 'h-1', 'a-1', 'g-1', 'f-1', 'e-1', 'd-1', 'c-1'];
  allNotes = ['', 'a', 'g', 'f', 'e', 'd', 'c', 'h', 'a', 'g', 'f', 'e', 'd', 'c'];
  allIntervalle = ['Prime', 'Sekunde', 'Terz', 'Quarte', 'Quinte', 'Sexte', 'Septime', 'Oktave']

  selectedCircle: { [key: number]: boolean } = {};
  selectedExtraCircle: { [key: number]: boolean } = {};
  selectedCircleColor: { [key: string]: string } = {};
  selectedExtraLine: { [key: number]: boolean } = {};
  hoveredExtraLine: { [key: number]: boolean } = {};
  isErasing: boolean = false;
  public isClickable: boolean = true;
  defaultCircleColor: string = 'black';

  ngOnChanges(): void {
    this.showCircle();
  }

  showExtraCircle(i: number): void {
    //if(Object.keys(this.selectedCircle).length + Object.keys(this.selectedExtraCircle).length >= 2) { return; }
    if(i !== undefined && this.isClickable === true) {
      this.isErasing === true ? delete this.selectedExtraCircle[i] : this.selectedExtraCircle[i] = true;
      sessionStorage.setItem('selectedExtraCircle', JSON.stringify(this.selectedExtraCircle));
    }
  }

  public getAllSelectedCircle() {
    return this.selectedCircle;
  }

  showCircle(i?: number): void {
    //if(Object.keys(this.selectedCircle).length + Object.keys(this.selectedExtraCircle).length >= 2) { return; }
    if(this.action === 'lies') {
      if(this.isIntervall === true && i === undefined) {
        this.selectedCircle = {};
        this.selectedExtraCircle = {};
        const intervalIndex = this.allIntervalle.indexOf(this.currentQuestion?.split('-')[0] || '');

        if (intervalIndex !== -1) {
          let startIndex = Math.floor(Math.random() * (this.allNotesRead.length - intervalIndex));
          startIndex++;

          if(this.allNotesRead[startIndex] === 'c-1') {
            startIndex--;
          } else if(this.allNotesRead[startIndex] === 'a-2') {
            startIndex++;
          }
          const endIndex = startIndex + intervalIndex;

          this.selectedCircle[startIndex] = true;
          this.selectedCircle[endIndex] = true;

          this.selectedExtraLine[startIndex] = true;
          this.selectedExtraLine[endIndex] = true;

          if(startIndex === endIndex) {
            this.selectedExtraCircle[endIndex] = true;
          }
        }

        sessionStorage.setItem('selectedCircle', JSON.stringify(this.selectedCircle));
        sessionStorage.setItem('selectedExtraCircle', JSON.stringify(this.selectedExtraCircle));

      } else if(this.isIntervall === false){
        this.selectedCircle = {};
        this.selectedExtraCircle = {};
        const index = this.allNotesRead.indexOf(this.currentQuestion || '');

        if (index !== -1) {
          this.selectedCircle[index] = true;
          this.selectedExtraLine[index] = true;

          setTimeout(() => {
            const audio = new Audio("/assets/sounds/" + this.currentQuestion + ".ogg");
            const volume = sessionStorage.getItem('volume');
            audio.volume = parseInt(volume || '100') / 100;
            audio.play();
          }, 100);
        }

        sessionStorage.setItem('selectedCircle', JSON.stringify(this.selectedCircle));
        return
      }
    }
    this.markOneCircle();

    const selectedExtraCircle = sessionStorage.getItem('selectedExtraCircle');
    if(i !== undefined && this.isClickable === true) {
      const note = this.allNotesRead[i-1];

      if(this.isErasing === false)
      {
        const audio = new Audio("/assets/sounds/" + note + ".ogg");
        const volume = sessionStorage.getItem('volume');
        audio.volume = parseInt(volume || '100') / 100;
        audio.play();
      }

      this.isErasing === true ? delete this.selectedCircle[i] : this.selectedCircle[i] = true;

      if(this.isErasing === true) {
        for(let extraLine in this.selectedExtraCircle) {
          if (this.selectedCircle[Number(extraLine) - 1] === undefined && this.selectedCircle[Number(extraLine) + 1] === undefined) {
            delete this.selectedExtraCircle[extraLine];
          }
        }
      }

      sessionStorage.setItem('selectedCircle', JSON.stringify(this.selectedCircle));
    }
  }

  public markOneCircle(): void {
    if(this.action === 'schreibe' && this.isIntervall && (sessionStorage.getItem('intervallAllowed') === 'yes')) {
      if (Object.keys(this.selectedCircle).length > 0) {
        setTimeout(() => this.markOneCircle(), 1000);
        return;
      }
      const intervalIndex = this.allIntervalle.indexOf(this.currentQuestion || '');

      const possibleStartNotes = this.allNotesRead.filter((_, index) =>
        index + intervalIndex < this.allNotesRead.length
      ).slice(1);

      const startIndex = Math.floor(Math.random() * (possibleStartNotes.length - 1)) + 1;
      this.selectedCircle[startIndex] = true;
      sessionStorage.setItem('intervallAllowed', 'no');
    }
  }

  public changeMarkColor(color: string) {
    const combinedKeys = new Set([
      ...Object.keys(this.selectedCircle),
      ...Object.keys(this.selectedExtraCircle)
    ]);

    for (const key of combinedKeys) {
      this.selectedCircleColor[key] = color;

      setTimeout(() => {
        delete this.selectedCircleColor[key];
      }, 1000);

      setTimeout(() => {
        delete this.selectedCircle[Number(key)];
        delete this.selectedExtraCircle[Number(key)];
        sessionStorage.setItem('selectedCircle', JSON.stringify(this.selectedCircle));
        sessionStorage.setItem('selectedExtraCircle', JSON.stringify(this.selectedExtraCircle));
      }, 1000);
    }

    sessionStorage.setItem('intervallAllowed', 'yes');
    if(this.isIntervall) {
      this.markOneCircle();
    }
  }


  toggleExtraLine(id: number): void {
    //if(Object.keys(this.selectedCircle).length + Object.keys(this.selectedExtraCircle).length >= 2) { return; }
    if (!this.isClickable) { return; }
    sessionStorage.setItem('intervallAllowed', 'no');

    if(this.isErasing === false && !this.selectedCircle[id]) {
      const note = this.allNotesRead[id-1];

      const audio = new Audio("/assets/sounds/" + note + ".ogg");
      const volume = sessionStorage.getItem('volume');
      audio.volume = parseInt(volume || '100') / 100;
      audio.play();

      this.selectedCircle[id] = true;
    } else if(this.isErasing === true && this.selectedCircle[id]) {
      delete this.selectedCircle[id];
    }

    for (let extraLine in this.selectedCircle) {
      if (this.selectedCircle[extraLine] === true) {
        this.selectedCircle[extraLine] = true;
      } else {
        delete this.selectedCircle[extraLine];
      }
    }

    sessionStorage.setItem('selectedCircle', JSON.stringify(this.selectedCircle));
    sessionStorage.setItem('selectedExtraCircle', JSON.stringify(this.selectedExtraCircle));
  }

  setHoveredExtraLine(id: number, isHovered: boolean): void {
    this.hoveredExtraLine[id] = isHovered;
  }

  eraser(): void {
    this.isErasing === true ? this.isErasing = false : this.isErasing = true;
  }

  getHueRotation(color: string): number {
    const hueMap: { [key: string]: number } = {
      red: 295,
      green: 84,
    };

    return hueMap[color.toLowerCase()] || 0;
  }
}

window.addEventListener("load", () => {
  sessionStorage.removeItem('selectedExtraCircle');
});
