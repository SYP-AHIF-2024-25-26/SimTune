import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-piano',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './piano.component.html',
  styleUrl: './piano.component.css'
})
export class PianoComponent {
  @Output() enableButton = new EventEmitter<boolean>();
  @ViewChild('myDiv') myDiv!: ElementRef;
  @Input() action: string | null = null;
  @Input() currentQuestion: string = '';
  @Input() toneType: string = '';
  public isClickable: boolean = true;
  currentColor = signal('gray');
  selectedKey: string | null = null;
  allNotesRead = ['a-2', 'g-2', 'f-2', 'e-2', 'd-2', 'c-2', 'h-1', 'a-1', 'g-1', 'f-1', 'e-1', 'd-1', 'c-1'];

  whiteKeys = [
    { id: 'c-1' }, { id: 'd-1' }, { id: 'e-1' }, { id: 'f-1' },
    { id: 'g-1' }, { id: 'a-1' }, { id: 'h-1' }, { id: 'c-2' },
    { id: 'd-2' }, { id: 'e-2' }, { id: 'f-2' }, { id: 'g-2' },
    { id: 'a-2' }, { id: 'h-2' }
  ];

  blackKeys = [
    { id: 'cis-1' },
    { id: 'dis-1' },
    { id: 'fis-1' },
    { id: 'gis-1' },
    { id: 'ais-1' },
    { id: 'cis-2' },
    { id: 'dis-2' },
    { id: 'fis-2' },
    { id: 'gis-2' },
    { id: 'ais-2' }
  ];

  arrays: Record<string, string[]> = {
    'G_Dur': ['g-1', 'a-1', 'h-1', 'c-2', 'd-2', 'e-2', 'fis-2'],
    'e_Moll': ['e-1', 'fis-1', 'g-1', 'a-1', 'h-1', 'c-2', 'd-2'],
    'D_Dur': ['d-1', 'e-1', 'fis-1', 'g-1', 'a-1', 'h-1', 'cis-2'],
    'h_Moll': ['h-1', 'cis-2', 'd-2', 'e-2', 'fis-2', 'g-2', 'a-2'],
    'A_Dur': ['a-1', 'h-1', 'cis-2', 'd-2', 'e-2', 'fis-2', 'gis-2'],
    'fis_Moll': ['fis-1', 'gis-1', 'a-1', 'h-1', 'cis-2', 'd-2', 'e-2']
  };

  dur_und_moll = {
    'F-Dur': ['f-1', 'g-1', 'a-1', 'b-1', 'c-2', 'd-2', 'e-2'],
    'd-Moll': ['d-1', 'e-1', 'f-1', 'g-1', 'a-1', 'b-1', 'c-2'],

    'B-Dur': ['b-1', 'c-2', 'd-2', 'es-2', 'f-2', 'g-2', 'a-2'],
    'g-Moll': ['g-1', 'a-1', 'b-1', 'c-2', 'd-2', 'es-2', 'f-2'],

    'Es-Dur': ['es-1', 'f-1', 'g-1', 'as-1', 'b-1', 'c-2', 'd-2'],
    'c-Moll': ['c-1', 'd-1', 'es-1', 'f-1', 'g-1', 'as-1', 'b-1']
  };

  dur_moll_und_natürliches_moll = {
    ...this.dur_und_moll,

    'C-Dur': ['c-1', 'd-1', 'e-1', 'f-1', 'g-1', 'a-1', 'h-1'],
    'a-Moll': ['a-1', 'h-1', 'c-2', 'd-2', 'e-2', 'f-2', 'g-2']
  };

  onKeyClick(keyId: string) {
    if (!this.isClickable) { return; }

    if (this.selectedKey === keyId) {
      this.selectedKey = null;
      this.enableButton.emit(false);
      sessionStorage.removeItem('selectedKey');
    } else {
      this.currentColor.set('gray');
      this.selectedKey = keyId;
      this.enableButton.emit(true);

      sessionStorage.setItem('selectedKey', keyId);

      const audio = new Audio("/assets/sounds/Notensystem-" + keyId + ".mp4");
      audio.play();
    }
  }

  public changeMarkColor(color: string) {
    this.currentColor.set(color);
    this.isClickable = false;

    setTimeout(() => {
      this.currentColor.set('gray');
      this.isClickable = true;
    }, 500);
  }

  isMarked(keyId: string) {
    if(this.action === 'markiere') { return this.selectedKey === keyId; }

    if(this.toneType === 'Tonleitern'){
      let tonleiter = this.currentQuestion.replace('-', '_');

      let selectedArray = this.arrays[tonleiter];

      for (let note of selectedArray) {
        if(this.action === 'bestimme' && note === keyId) { return true; }
      }
      return false;
    }

    return this.action === 'lies' && this.currentQuestion === keyId;
  }
}
