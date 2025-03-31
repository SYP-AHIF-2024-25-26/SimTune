import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  showDialog: boolean = false;
  isClicked: boolean = false;

  email = signal('');
  benutzername = signal('');
  rolle = signal('');

  user: { [key: string]: string } = { 'Email': 'tobias.vieghofer@gmail.com', 'Benutzername': 'tobii1899',  'Rolle': 'Admin'};
  exercise: { [key: string]: string }[] = [
    { 'ÜbungsID': '1', 'Description': 'Lies c,d und e', 'Score': '79%', 'Attempts': '4', 'ExerciseTyp': 'Stammtöne' },
    { 'ÜbungsID': '12', 'Description': 'Lies c,d und e', 'Score': '93%', 'Attempts': '10', 'ExerciseTyp': 'Notensystem' },
    { 'ÜbungsID': '27', 'Description': 'Lies alle Intervalle', 'Score': '13%', 'Attempts': '1', 'ExerciseTyp': 'Intervalle' },
    { 'ÜbungsID': '30', 'Description': 'Bestimme die Tonleiter', 'Score': '100%', 'Attempts': '3', 'ExerciseTyp': 'Tonleitern' },
    { 'ÜbungsID': '1', 'Description': 'Lies c,d und e', 'Score': '79%', 'Attempts': '4', 'ExerciseTyp': 'Stammtöne' },
    { 'ÜbungsID': '12', 'Description': 'Lies c,d und e', 'Score': '93%', 'Attempts': '10', 'ExerciseTyp': 'Notensystem' },
    { 'ÜbungsID': '27', 'Description': 'Lies alle Intervalle', 'Score': '13%', 'Attempts': '1', 'ExerciseTyp': 'Intervalle' },
    { 'ÜbungsID': '30', 'Description': 'Bestimme die Tonleiter', 'Score': '100%', 'Attempts': '3', 'ExerciseTyp': 'Tonleitern' },
    { 'ÜbungsID': '1', 'Description': 'Lies c,d und e', 'Score': '79%', 'Attempts': '4', 'ExerciseTyp': 'Stammtöne' },
    { 'ÜbungsID': '12', 'Description': 'Lies c,d und e', 'Score': '93%', 'Attempts': '10', 'ExerciseTyp': 'Notensystem' },
    { 'ÜbungsID': '27', 'Description': 'Lies alle Intervalle', 'Score': '13%', 'Attempts': '1', 'ExerciseTyp': 'Intervalle' },
    { 'ÜbungsID': '30', 'Description': 'Bestimme die Tonleiter', 'Score': '100%', 'Attempts': '3', 'ExerciseTyp': 'Tonleitern' }
  ];
  filteredExercise = [...this.exercise];
  selectedTypes: Set<string> = new Set();
  showSortOptions = false;
  activeSort = signal<string | null>(null);
  selectedExerciseTypes = signal<string[]>([]);

  ngOnInit() {
    this.email.set(this.user['Email']);
    this.benutzername.set(this.user['Benutzername']);
    this.rolle.set(this.user['Rolle']);
  }

  confirmDelete() {
    this.showDialog = true;
  }

  deleteAccount() {
    this.isClicked = true;
    this.showDialog = false;
    alert('Konto gelöscht!');
  }

  cancelDelete() {
    this.isClicked = false;
    this.showDialog = false;
  }

  parseFloat(score: string) {
    return parseFloat(score.replace('%', ''));
  }

  toggleFilterVisibility() {
    this.showSortOptions = !this.showSortOptions;
    this.activeSort.set(null);
  }

  toggleSort(sortType: string) {
    if (this.activeSort() === sortType) {
      this.activeSort.set(null);
    } else {
      this.activeSort.set(sortType);
    }
  }

  isChecked(type: string): boolean {
    return this.selectedExerciseTypes().includes(type);
  }

  sortExercises(property: string, direction: 'asc' | 'desc') {
    this.filteredExercise.sort((a, b) => {
      const aValue = property === 'Score' ? parseFloat(a[property]) : parseInt(a[property], 10);
      const bValue = property === 'Score' ? parseFloat(b[property]) : parseInt(b[property], 10);

      if (direction === 'asc') {
        return aValue > bValue ? 1 : (aValue < bValue ? -1 : 0);
      } else {
        return aValue < bValue ? 1 : (aValue > bValue ? -1 : 0);
      }
    });
  }

  filterExerciseType(event: any, type: string) {
    const currentSelection = this.selectedExerciseTypes();
    if (event.target.checked) {
      this.selectedTypes.add(type);
    } else {
      this.selectedTypes.delete(type);
    }

    if (this.selectedTypes.size > 0) {
      this.filteredExercise = this.exercise.filter(ex => this.selectedTypes.has(ex['ExerciseTyp']));
      this.selectedExerciseTypes.set([...currentSelection, type]);
    } else {
      this.filteredExercise = [...this.exercise];
      this.selectedExerciseTypes.set(currentSelection.filter(t => t !== type));
    }
  }
}
