import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../app.component';
import * as abcjs from 'abcjs';

export interface Question {
  id: number;
  instruction: string;
  notesToRead: string;
  correctAnswer: string;
  possibleAnswers: string;
  allAnswers: string;
}

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
  @Input() currentQuestion: Question | null = null;
  @Input() toneType: string = '';
  @Input() volume!: number;
  public isClickable: boolean = true;
  correctAnswer = '';
  currentColor = signal('gray');
  selectedKey: string | null = null;
  allNotesRead = ['a-2', 'g-2', 'f-2', 'e-2', 'd-2', 'c-2', 'h-1', 'a-1', 'g-1', 'f-1', 'e-1', 'd-1', 'c-1'];
  isMobile: boolean = typeof window !== 'undefined' ? window.innerWidth < 640 : false;

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

  public arrays: Record<string, string[]> = {
    'G_Dur': ['g-1', 'a-1', 'h-1', 'c-2', 'd-2', 'e-2', 'fis-2'],
    'e_Moll': ['e-1', 'fis-1', 'g-1', 'a-1', 'h-1', 'c-2', 'd-2'],
    'D_Dur': ['d-1', 'e-1', 'fis-1', 'g-1', 'a-1', 'h-1', 'cis-2'],
    'h_Moll': ['h-1', 'cis-2', 'd-2', 'e-2', 'fis-2', 'g-2', 'a-2'],
    'A_Dur': ['a-1', 'h-1', 'cis-2', 'd-2', 'e-2', 'fis-2', 'gis-2'],
    'fis_Moll': ['fis-1', 'gis-1', 'a-1', 'h-1', 'cis-2', 'd-2', 'e-2'],
    'F_Dur': ['f-1', 'g-1', 'a-1', 'ais-1', 'c-2', 'd-2', 'e-2'],
    'd_Moll': ['d-1', 'e-1', 'f-1', 'g-1', 'a-1', 'ais-1', 'c-2'],
    'B_Dur': ['ais-1', 'c-2', 'd-2', 'dis-2', 'f-2', 'g-2', 'a-2'],
    'g_Moll': ['g-1', 'a-1', 'ais-1', 'c-2', 'd-2', 'dis-2', 'f-2'],
    'Es_Dur': ['dis-1', 'f-1', 'g-1', 'gis-1', 'ais-1', 'c-2', 'd-2'],
    'c_Moll': ['c-1', 'd-1', 'dis-1', 'f-1', 'g-1', 'gis-1', 'ais-1'],
    'C_Dur': ['c-1', 'd-1', 'e-1', 'f-1', 'g-1', 'a-1', 'h-1'],
    'a_Moll': ['a-1', 'h-1', 'c-2', 'd-2', 'e-2', 'f-2', 'g-2']
  };

  frequency: number = 440;


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

      sessionStorage.setItem('selectedKey', this.selectedKey);

      // Spiele den Ton mit abcjs ab
      this.playNoteSound(keyId);
    }
  }

  private async playNoteSound(keyId: string): Promise<void> {
    try {
      // Konvertiere keyId zu ABC Notation (z.B. "c-1" -> "C", "d-2" -> "d")
      let noteName = keyId.split('-')[0];
      const octave = parseInt(keyId.split('-')[1]);

      // Konvertiere deutsche Notation "h" zu englischer Notation "b"
      if (noteName === 'h') {
        noteName = 'b';
      } else if (noteName === 'his') {
        noteName = 'bis';
      }

      // ABC Notation: Großbuchstaben = tiefe Oktave, Kleinbuchstaben = mittlere Oktave
      let abcNote = octave === 1 ? noteName.toUpperCase() : noteName.toLowerCase();

      // Behandle Vorzeichen (cis -> ^C, dis -> ^D, etc.)
      if (noteName.includes('is')) {
        const baseNote = noteName.substring(0, noteName.length - 2);
        abcNote = '^' + (octave === 1 ? baseNote.toUpperCase() : baseNote.toLowerCase());
      }

      const abcNotation = `L:1/4\nK:C\n${abcNote}`;

      const tempDiv = document.createElement('div');
      tempDiv.style.display = 'none';
      document.body.appendChild(tempDiv);

      const visualObj = abcjs.renderAbc(tempDiv, abcNotation);

      if (visualObj && visualObj.length > 0) {
        const synth = new abcjs.synth.CreateSynth();
        await synth.init({ visualObj: visualObj[0] });
        await synth.prime();
        synth.start();

        setTimeout(() => {
          try {
            synth.stop();
            if (document.body.contains(tempDiv)) {
              document.body.removeChild(tempDiv);
            }
          } catch (e) {
            console.warn('Synth cleanup failed:', e);
          }
        }, 1000);
      }
    } catch (error) {
      console.warn('Piano audio playback failed:', error);
    }
  }

  public changeMarkColor(color: string) {
    this.currentColor.set(color);
    this.isClickable = false;

    setTimeout(() => {
      this.currentColor.set('gray');
      this.isClickable = true;
      this.selectedKey = null;
    }, 1500);
  }

  isMarked(keyId: string) {
    if(this.action === 'markiere') { return this.selectedKey === keyId; }

    if (this.action === 'Lesen') {
      const base = this.currentQuestion?.correctAnswer;
      if (!base) return false;

      let targetKey = base;

      // Wenn keine Oktave angegeben ist, wähle eine zufällige
      if (!base.includes('-')) {
        const randomVariant = Math.random() < 0.5 ? 1 : 2;
        targetKey = `${base}-${randomVariant}`;
        // Speichere die gewählte Variante zurück
        this.currentQuestion!.correctAnswer = targetKey;
      }

      // Auf Mobile: Konvertiere zweite Oktave zur ersten
      if (this.isMobile && targetKey.endsWith('-2')) {
        const noteName = targetKey.split('-')[0];
        targetKey = `${noteName}-1`;
      }

      return targetKey === keyId;
    }

    return this.selectedKey === keyId;
  }

  isFirstOctave(keyId: string): boolean {
    return keyId.endsWith('-1');
  }

  shouldShowMark(keyId: string): boolean {
    const marked = this.isMarked(keyId);
    const firstOctave = this.isFirstOctave(keyId);

    // Auf Desktop: Zeige alle Markierungen
    // Auf Mobile: Zeige nur erste Oktave
    if (!this.isMobile) {
      return marked;
    }

    return marked && firstOctave;
  }

  ngOnInit() {
    this.checkScreenSize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  private handleResize = () => {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 640;
    }
  }
}
