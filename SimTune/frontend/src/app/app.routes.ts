import { Routes } from '@angular/router';
import { UebungenComponent } from './uebungen/uebungen.component';
import { PruefungenComponent } from './pruefungen/pruefungen.component';
import { UnterlagenComponent } from './unterlagen/unterlagen.component';
import { HomepageComponent } from './homepage/homepage.component';
import { akkordeData, intervalleData, notenSystemData, rhythmusData, stammtoeneData, toeneData, tonartenData, tonleiternData, uebungenData } from './uebungen/task-data';
import { TaskComponent } from './task/task.component';
import { PianoComponent } from './piano/piano.component';
import { NotesystemComponent } from './notesystem/notesystem.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { VerifyComponent } from './verify/verify.component';
import { SchuelerDashboardComponent } from './schueler-dashboard/schueler-dashboard.component';
import { LehrerDashboardComponent } from './lehrer-dashboard/lehrer-dashboard.component';
import { UebungenSubpageComponent } from './uebungen-subpage/uebungen-subpage.component';

export const routes: Routes = [
  {
    path: 'uebungen',
    component: UebungenComponent,
    data: {
      content: uebungenData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' }
      ],
      taskType: ''
    },
  },
  {
    path: 'toene',
    component: UebungenComponent,
    data: {
      content: toeneData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
      ],
      taskType: ''
    },
  },
  {
    path: 'stammtoene-klavier',
    component: UebungenComponent,
    data: {
      content: stammtoeneData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Klavier', url: '/toene' },
        { label: 'Stammtöne', url: '/stammtoene-klavier' },
      ],
      taskType: 'StammtoeneKlavier'
    },
  },
  {
    path: 'versetzungszeichen-klavier',
    component: UebungenComponent,
    data: {
      content: stammtoeneData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Klavier', url: '/toene' },
        { label: 'Versetzungszeichen', url: '/versetzungszeichen-klavier' },
      ],
      taskType: 'VersetzungszeichenKlavier'
    },
  },
  {
    path: 'stammtoene-violinschluessel',
    component: UebungenComponent,
    data: {
      content: notenSystemData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Violinschlüssel', url: '/toene' },
        { label: 'Stammtöne', url: '/stammtoene-violinschluessel' },
      ],
      taskType: 'StammtoeneViolinschluessel'
    }
  },
  {
    path: 'versetzungszeichen-violinschluessel',
    component: UebungenComponent,
    data: {
      content: notenSystemData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Violinschlüssel', url: '/toene' },
        { label: 'Versetzungszeichen', url: '/versetzungszeichen-violinschluessel' },
      ],
      taskType: 'VersetzungszeichenViolinschluessel'
    }
  },
  {
    path: 'hilfslinien-violinschluessel',
    component: UebungenComponent,
    data: {
      content: notenSystemData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Violinschlüssel', url: '/toene' },
        { label: 'Hilfslinien', url: '/hilfslinien-violinschluessel' },
      ],
      taskType: 'HilfslinienViolinschluessel'
    }
  },
  {
    path: 'stammtoene-basschluessel',
    component: UebungenComponent,
    data: {
      content: notenSystemData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Bassschlüssel', url: '/toene' },
        { label: 'Stammtöne', url: '/stammtoene-basschluessel' },
      ],
      taskType: 'StammtoeneBassschluessel'
    }
  },
  {
    path: 'versetzungszeichen-basschluessel',
    component: UebungenComponent,
    data: {
      content: notenSystemData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Bassschlüssel', url: '/toene' },
        { label: 'Versetzungszeichen', url: '/versetzungszeichen-basschluessel' },
      ],
      taskType: 'VersetzungszeichenBassschluessel'
    }
  },
  {
    path: 'hilfslinien-basschluessel',
    component: UebungenComponent,
    data: {
      content: notenSystemData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Töne', url: '/toene' },
        { label: 'Bassschlüssel', url: '/toene' },
        { label: 'Hilfslinien', url: '/hilfslinien-basschluessel' },
      ],
      taskType: 'HilfslinienBassschluessel'
    }
  },
  {
    path: 'rhythmus',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
      ],
      taskType: ''
    },
  },
  {
    path: 'rhythmus-notenwerte-ganze-halbe',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Notenwerte', url: '/rhythmus' },
        { label: 'Ganze & Halbe Noten', url: '/rhythmus-notenwerte-ganze-halbe' },
      ],
      taskType: 'RhythmusNotenwerte'
    },
  },
  {
    path: 'rhythmus-notenwerte-viertel-achtel',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Notenwerte', url: '/rhythmus' },
        { label: 'Viertel & Achtel Noten', url: '/rhythmus-notenwerte-viertel-achtel' },
      ],
      taskType: 'RhythmusNotenwerte'
    },
  },
  {
    path: 'rhythmus-notenwerte-16tel-32stel',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Notenwerte', url: '/rhythmus' },
        { label: '16tel & 32stel Noten', url: '/rhythmus-notenwerte-16tel-32stel' },
      ],
      taskType: 'RhythmusNotenwerte'
    },
  },
  {
    path: 'rhythmus-notenwerte-alle',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Notenwerte', url: '/rhythmus' },
        { label: 'Alle Notenwerte', url: '/rhythmus-notenwerte-alle' },
      ],
      taskType: 'RhythmusNotenwerte'
    },
  },
  {
    path: 'rhythmus-pausen-ganze-halbe',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Pausenwerte', url: '/rhythmus' },
        { label: 'Ganze & Halbe Pausen', url: '/rhythmus-pausen-ganze-halbe' },
      ],
      taskType: 'RhythmusPausen'
    },
  },
  {
    path: 'rhythmus-pausen-viertel-achtel',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Pausenwerte', url: '/rhythmus' },
        { label: 'Viertel & Achtel Pausen', url: '/rhythmus-pausen-viertel-achtel' },
      ],
      taskType: 'RhythmusPausen'
    },
  },
  {
    path: 'rhythmus-pausen-16tel-32stel',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Pausenwerte', url: '/rhythmus' },
        { label: '16tel & 32stel Pausen', url: '/rhythmus-pausen-16tel-32stel' },
      ],
      taskType: 'RhythmusPausen'
    },
  },
  {
    path: 'rhythmus-pausen-alle',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Pausenwerte', url: '/rhythmus' },
        { label: 'Alle Pausenwerte', url: '/rhythmus-pausen-alle' },
      ],
      taskType: 'RhythmusPausen'
    },
  },
  {
    path: 'rhythmus-punktiert-noten-lang',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Verlängerungspunkte', url: '/rhythmus' },
        { label: 'Punktierte Noten (lang)', url: '/rhythmus-punktiert-noten-lang' },
      ],
      taskType: 'RhythmusPunktiertNoten'
    },
  },
  {
    path: 'rhythmus-punktiert-noten-kurz',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Verlängerungspunkte', url: '/rhythmus' },
        { label: 'Punktierte Noten (kurz)', url: '/rhythmus-punktiert-noten-kurz' },
      ],
      taskType: 'RhythmusPunktiertNoten'
    },
  },
  {
    path: 'rhythmus-punktiert-noten-alle',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Verlängerungspunkte', url: '/rhythmus' },
        { label: 'Alle punktierten Noten', url: '/rhythmus-punktiert-noten-alle' },
      ],
      taskType: 'RhythmusPunktiertNoten'
    },
  },
  {
    path: 'rhythmus-punktiert-pausen-lang',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Verlängerungspunkte', url: '/rhythmus' },
        { label: 'Punktierte Pausen (lang)', url: '/rhythmus-punktiert-pausen-lang' },
      ],
      taskType: 'RhythmusPunktiertPausen'
    },
  },
  {
    path: 'rhythmus-punktiert-pausen-kurz',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Verlängerungspunkte', url: '/rhythmus' },
        { label: 'Punktierte Pausen (kurz)', url: '/rhythmus-punktiert-pausen-kurz' },
      ],
      taskType: 'RhythmusPunktiertPausen'
    },
  },
  {
    path: 'rhythmus-punktiert-pausen-alle',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Verlängerungspunkte', url: '/rhythmus' },
        { label: 'Alle punktierten Pausen', url: '/rhythmus-punktiert-pausen-alle' },
      ],
      taskType: 'RhythmusPunktiertPausen'
    },
  },
  {
    path: 'rhythmus-mix-alle',
    component: UebungenComponent,
    data: {
      content: rhythmusData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Grundlagen', url: '/uebungen' },
        { label: 'Rhythmus', url: '/rhythmus' },
        { label: 'Gemischt', url: '/rhythmus' },
        { label: 'Alles gemischt', url: '/rhythmus-mix-alle' },
      ],
      taskType: 'RhythmusMix'
    },
  },
  {
    path: 'intervalle',
    component: UebungenComponent,
    data: {
      content: intervalleData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Intervalle', url: '/intervalle' },
      ],
      taskType: ''
    },
  },
  {
    path: 'intervalle-basis',
    component: UebungenComponent,
    data: {
      content: intervalleData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Intervalle', url: '/intervalle' },
        { label: 'Basis', url: '/intervalle-basis'},
      ],
      taskType: 'IntervalleBasis'
    },
  },
  {
    path: 'intervalle-rein',
    component: UebungenComponent,
    data: {
      content: intervalleData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Intervalle', url: '/intervalle' },
        { label: 'Feinbestimmung', url: '/intervalle'},
        { label: 'Reine Intervalle', url: '/intervalle-rein'}
      ],
      taskType: 'IntervalleRein'
    },
  },
  {
    path: 'intervalle-grossklein',
    component: UebungenComponent,
    data: {
      content: intervalleData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Intervalle', url: '/intervalle' },
        { label: 'Feinbestimmung', url: '/intervalle'},
        { label: 'gr/kl Intervalle', url: '/intervalle-grossklein'}
      ],
      taskType: 'IntervalleGrossKlein'
    },
  },
  {
    path: 'intervalle-vermindertuebermaessig',
    component: UebungenComponent,
    data: {
      content: intervalleData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Intervalle', url: '/intervalle' },
        { label: 'Feinbestimmung', url: '/intervalle'},
        { label: 'verminderte Intervalle', url: '/intervalle-intervalle-vermindertuebermaessig'}
      ],
      taskType: 'IntervalleVermindertUebermaessig'
    },
  },
  {
    path: 'akkorde',
    component: UebungenComponent,
    data: {
      content: akkordeData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Akkorde', url: '/akkorde' },
      ],
      taskType: ''
    },
  },
  {
    path: 'akkorde-dur',
    component: UebungenComponent,
    data: {
      content: akkordeData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Akkorde', url: '/akkorde' },
        { label: 'Dreiklänge Grundlagen', url: '/akkorde' },
        { label: 'Dur-Dreiklänge', url: '/akkorde-dur' },
      ],
      taskType: 'AkkordeDurDreiklang'
    },
  },
  {
    path: 'akkorde-moll',
    component: UebungenComponent,
    data: {
      content: akkordeData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Akkorde', url: '/akkorde' },
        { label: 'Dreiklänge Grundlagen', url: '/akkorde' },
        { label: 'Moll-Dreiklänge', url: '/akkorde-moll' },
      ],
      taskType: 'AkkordeMollDreiklang'
    },
  },
  {
    path: 'akkorde-dur-moll',
    component: UebungenComponent,
    data: {
      content: akkordeData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Akkorde', url: '/akkorde' },
        { label: 'Dreiklänge Grundlagen', url: '/akkorde' },
        { label: 'Dur oder Moll?', url: '/akkorde-dur-moll' },
      ],
      taskType: 'AkkordeDurMoll'
    },
  },
  {
    path: 'akkorde-vermindert',
    component: UebungenComponent,
    data: {
      content: akkordeData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Akkorde', url: '/akkorde' },
        { label: 'Erweiterte Dreiklänge', url: '/akkorde' },
        { label: 'Verminderte Dreiklänge', url: '/akkorde-vermindert' },
      ],
      taskType: 'AkkordeVermindertUebermaessig'
    },
  },
  {
    path: 'akkorde-uebermaessig',
    component: UebungenComponent,
    data: {
      content: akkordeData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Akkorde', url: '/akkorde' },
        { label: 'Erweiterte Dreiklänge', url: '/akkorde' },
        { label: 'Übermäßige Dreiklänge', url: '/akkorde-uebermaessig' },
      ],
      taskType: 'AkkordeVermindertUebermaessig'
    },
  },
  {
    path: 'akkorde-alle',
    component: UebungenComponent,
    data: {
      content: akkordeData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Akkorde', url: '/akkorde' },
        { label: 'Erweiterte Dreiklänge', url: '/akkorde' },
        { label: 'Alle Dreiklangsarten', url: '/akkorde-alle' },
      ],
      taskType: 'AkkordeAlleDreiklaenge'
    },
  },
  {
    path: 'akkorde-umkehrungen',
    component: UebungenComponent,
    data: {
      content: akkordeData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Akkorde', url: '/akkorde' },
        { label: 'Umkehrungen', url: '/akkorde' },
        { label: 'Dreiklangsumkehrungen', url: '/akkorde-umkehrungen' },
      ],
      taskType: 'AkkordeUmkehrungen'
    },
  },
  {
    path: 'tonleitern',
    component: UebungenComponent,
    data: {
      content: tonleiternData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonleitern', url: '/tonleitern' },
      ],
      taskType: ''
    },
  },
  {
    path: 'tonleitern-dur',
    component: UebungenComponent,
    data: {
      content: tonleiternData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonleitern', url: '/tonleitern' },
        { label: 'Dur', url: '/tonleitern-dur' },
      ],
      taskType: 'TonleiternDur'
    },
  },
  {
    path: 'tonleitern-moll-natuerlich',
    component: UebungenComponent,
    data: {
      content: tonleiternData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonleitern', url: '/tonleitern' },
        { label: 'Moll Natürlich', url: '/tonleitern-moll-natuerlich' },
      ],
      taskType: 'TonleiternMollNatuerlich'
    },
  },
  {
    path: 'tonleitern-moll-harmonisch',
    component: UebungenComponent,
    data: {
      content: tonleiternData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonleitern', url: '/tonleitern' },
        { label: 'Moll Harmonisch', url: '/tonleitern-moll-harmonisch' },
      ],
      taskType: 'TonleiternMollHarmonisch'
    },
  },
  {
    path: 'tonleitern-moll-melodisch',
    component: UebungenComponent,
    data: {
      content: tonleiternData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonleitern', url: '/tonleitern' },
        { label: 'Moll Melodisch', url: '/tonleitern-moll-melodisch' },
      ],
      taskType: 'TonleiternMollMelodisch'
    },
  },
  {
    path: 'tonleitern-vorzeichen',
    component: UebungenComponent,
    data: {
      content: tonleiternData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonleitern', url: '/tonleitern' },
        { label: 'Vorzeichen & Quintenzirkel', url: '/tonleitern-vorzeichen' },
      ],
      taskType: 'TonleiternVorzeichen'
    },
  },
  {
    path: 'tonleitern-mix',
    component: UebungenComponent,
    data: {
      content: tonleiternData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonleitern', url: '/tonleitern' },
        { label: 'Dur vs. Moll', url: '/tonleitern-mix' },
      ],
      taskType: 'TonleiternMix'
    },
  },
  {
    path: 'tonarten',
    component: UebungenComponent,
    data: {
      content: tonartenData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonarten', url: '/tonarten' },
      ],
      taskType: ''
    },
  },
  {
    path: 'tonarten-kreuz',
    component: UebungenComponent,
    data: {
      content: tonartenData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonarten', url: '/tonarten' },
        { label: 'Kreuz & B', url: '/tonarten' },
        { label: 'Kreuztonarten', url: '/tonarten-kreuz' },
      ],
      taskType: 'TonartenKreuz'
    },
  },
  {
    path: 'tonarten-b',
    component: UebungenComponent,
    data: {
      content: tonartenData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonarten', url: '/tonarten' },
        { label: 'Kreuz & B', url: '/tonarten' },
        { label: 'B-Tonarten', url: '/tonarten-b' },
      ],
      taskType: 'TonartenB'
    },
  },
  {
    path: 'tonarten-vorzeichen',
    component: UebungenComponent,
    data: {
      content: tonartenData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonarten', url: '/tonarten' },
        { label: 'Versetzungszeichen', url: '/tonarten' },
        { label: 'Kreuz, B & Auflösung', url: '/tonarten-vorzeichen' },
      ],
      taskType: 'TonartenVorzeichen'
    },
  },
  {
    path: 'tonarten-alle',
    component: UebungenComponent,
    data: {
      content: tonartenData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonarten', url: '/tonarten' },
        { label: 'Kreuz & B', url: '/tonarten' },
        { label: 'Alle Tonarten', url: '/tonarten-alle' },
      ],
      taskType: 'TonartenAlle'
    },
  },
  {
    path: 'tonarten-paralleltonarten',
    component: UebungenComponent,
    data: {
      content: tonartenData,
      breadcrumbElements: [
        { label: 'Home', url: '/homepage' },
        { label: 'Übungen', url: '/uebungen' },
        { label: 'Struktur', url: '/uebungen' },
        { label: 'Tonarten', url: '/tonarten' },
        { label: 'Paralleltonarten', url: '/tonarten' },
        { label: 'Dur ↔ Moll', url: '/tonarten-paralleltonarten' },
      ],
      taskType: 'TonartenParalleltonarten'
    },
  },
  { path: 'pruefungen', component: PruefungenComponent },
  { path: 'unterlagen', component: UnterlagenComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'task', component: TaskComponent },
  { path: 'piano', component: PianoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile-page', component: ProfilePageComponent },
  { path: 'verify', component: VerifyComponent},
  { path: 'schueler-dashboard', component: SchuelerDashboardComponent},
  { path: 'lehrer-dashboard', component: LehrerDashboardComponent},
  { path: 'uebungen-subpage', component:  UebungenSubpageComponent},
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
];
