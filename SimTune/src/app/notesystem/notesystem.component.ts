import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notesystem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notesystem.component.html',
  styleUrl: './notesystem.component.css'
})
export class NotesystemComponent {
  allNotes = ['', 'a-2', 'g-2', 'f-2', 'e-2', 'd-2', 'c-2', 'h-1', 'a-1', 'g-1', 'f-1', 'e-1', 'd-1', 'c-1'];

  selectedCircle: { [key: number]: boolean } = {};
  selectedExtraLine: { [key: number]: boolean } = {};
  hoveredExtraLine: { [key: number]: boolean } = {};
  isErasing: boolean = false;

  showCircle(i: number): void {
    this.isErasing === true ? delete this.selectedCircle[i] : this.selectedCircle[i] = true;
  }

  toggleExtraLine(id: number): void {
    if(this.isErasing === false && !this.selectedExtraLine[id]) {
      this.selectedExtraLine[id] = true;
    } else if(this.isErasing === true && this.selectedExtraLine[id]) {
      delete this.selectedExtraLine[id];
    }
  }

  setHoveredExtraLine(id: number, isHovered: boolean): void {
    if (!this.selectedExtraLine[id]) {
      this.hoveredExtraLine[id] = isHovered;
    }
  }

  eraser(): void {
    this.isErasing === true ? this.isErasing = false : this.isErasing = true;
  }

  answer(): void {
    let allSelctedNotes: string = "";

    for (let eachNote in this.selectedCircle) {
      allSelctedNotes += this.allNotes[eachNote] + " ";
    }

    console.log(allSelctedNotes, this.selectedCircle)

    localStorage.setItem('selectedKey', allSelctedNotes);
  }
}
