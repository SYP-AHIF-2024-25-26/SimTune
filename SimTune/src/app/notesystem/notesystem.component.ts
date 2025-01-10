import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-notesystem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notesystem.component.html',
  styleUrl: './notesystem.component.css'
})
export class NotesystemComponent {
  @Input() action: string | null = null;
  @Input() currentQuestion: string | null = null;
  @Output() enableButton = new EventEmitter<boolean>();

  allNotesRead = ['', 'a-2', 'g-2', 'f-2', 'e-2', 'd-2', 'c-2', 'h-1', 'a-1', 'g-1', 'f-1', 'e-1', 'd-1', 'c-1'];
  allNotes = ['', 'a', 'g', 'f', 'e', 'd', 'c', 'h', 'a', 'g', 'f', 'e', 'd', 'c'];

  selectedCircle: { [key: number]: boolean } = {};
  selectedCircleColor: { [key: number]: string } = {};
  selectedExtraLine: { [key: number]: boolean } = {};
  hoveredExtraLine: { [key: number]: boolean } = {};
  isErasing: boolean = false;
  public isClickable: boolean = true;
  defaultCircleColor: string = '#000000';

  ngOnChanges(): void {
    this.showCircle();
  }


  showCircle(i?: number): void {
    if(this.action === 'lies') {
      this.selectedCircle = {};
      const index = this.allNotesRead.indexOf(this.currentQuestion || '');

      if (index !== -1) {
        this.selectedCircle[index] = true;
        this.selectedExtraLine[index] = true;
      }

      sessionStorage.setItem('selectedCircle', JSON.stringify(this.selectedCircle));
      return
    }
    if(i !== undefined) {
      this.isErasing === true ? delete this.selectedCircle[i] : this.selectedCircle[i] = true;
      sessionStorage.setItem('selectedCircle', JSON.stringify(this.selectedCircle));
    }
  }

  public changeMarkColor(color: string) {
    for (const key in this.selectedCircle) {
      if (this.selectedCircle[key]) {
        this.selectedCircleColor[key] = color;

        setTimeout(() => {
          this.selectedCircleColor[key] = this.defaultCircleColor;
        }, 1000);

        setTimeout(() => {
          delete this.selectedCircle[key];
          sessionStorage.setItem('selectedCircle', JSON.stringify(this.selectedCircle));
        }, 1000);
      }
    }
  }

  toggleExtraLine(id: number): void {
    /*
    if(this.isErasing === false && !this.selectedExtraLine[id]) {
      this.selectedExtraLine[id] = true;
    } else if(this.isErasing === true && this.selectedExtraLine[id]) {
      delete this.selectedExtraLine[id];
    }

    for (let extraLine in this.selectedExtraLine) {
      if (this.selectedExtraLine[extraLine] === true) {
        this.selectedCircle[extraLine] = true;
      } else {
        delete this.selectedExtraLine[extraLine];
      }
    }
    */
    if(this.isErasing === false && !this.selectedCircle[id]) {
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
  }

  setHoveredExtraLine(id: number, isHovered: boolean): void {
    //if (!this.selectedExtraLine[id]) {
    //if(this.selectedCircle[id]) {
    this.hoveredExtraLine[id] = isHovered;
    //}
  }

  eraser(): void {
    this.isErasing === true ? this.isErasing = false : this.isErasing = true;
  }

  getHueRotation(color: string): number {
    const hueMap: { [key: string]: number } = {
      red: 0,
      orange: 30,
      yellow: 60,
      green: 120,
      blue: 240,
      purple: 270,
    };

    return hueMap[color.toLowerCase()] || 0;
  }

  /*
  answer(): void {
    let allSelctedNotes: string = "";

    for (let extraLine in this.hoveredExtraLine) {
      if (this.hoveredExtraLine[extraLine] === false) {
        delete this.hoveredExtraLine[extraLine];
      }
    }

    for (let extraLine in this.hoveredExtraLine) {
      if (this.hoveredExtraLine[extraLine] === true) {
        this.selectedCircle[extraLine] = true;
      }
    }

    for (let eachNote in this.selectedCircle) {
      allSelctedNotes += this.allNotes[eachNote] + " ";
    }

    console.log(allSelctedNotes, this.selectedCircle)

    localStorage.setItem('selectedKey', allSelctedNotes);
  }
  */
}
