import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
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
  public isClickable: boolean = true;
  currentColor = signal('gray');
  selectedKey: string | null = null;

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

  onKeyClick(keyId: string) {
    if (!this.isClickable) { return; }

    if (this.selectedKey === keyId) {
      this.selectedKey = null;
      this.enableButton.emit(false);
      localStorage.removeItem('selectedKey');
    } else {
      this.currentColor.set('gray');
      this.selectedKey = keyId;
      this.enableButton.emit(true);
      localStorage.setItem('selectedKey', keyId);
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
}
