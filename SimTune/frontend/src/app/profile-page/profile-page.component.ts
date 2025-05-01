import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { API_URL, fetchRestEndpointWithAuthorization } from '../api-calls/fetch-rest-endpoint';

interface MyJwtPayload {
  sub: string;
  jti: string;
  aud: string;
  exp: number;
  iss: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
}

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

  constructor(private router: Router) {}

  exercise: { [key: string]: string }[] = [];
  filteredExercise = [...this.exercise];
  selectedTypes: Set<string> = new Set();
  showSortOptions = false;
  activeSort = signal<string | null>(null);
  selectedExerciseTypes = signal<string[]>([]);

  async ngOnInit() {
    var jwt = sessionStorage.getItem("jwt")!;
    const decoded = jwtDecode<MyJwtPayload>(jwt);

    this.email.set(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
    this.benutzername.set(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
    this.rolle.set('not defined');

    await this.getExercises();
    this.filteredExercise = [...this.exercise];
  }

  async getExercises() {
    var userExercises = await fetchRestEndpointWithAuthorization(API_URL + 'usermanagement/completed-exercises', 'GET', );
    if (Array.isArray(userExercises)) {
      const mapped = userExercises.map(ex => ({
        'ÜbungsID': ex.exerciseId.toString(),
        'Description': ex.description,
        'Score': ex.highestScore.toString() + '%',
        'Attempts': ex.attempts.toString(),
        'ExerciseTyp': ex.exerciseType
          .replace(/ae/g, 'ä')
          .replace(/oe/g, 'ö')
          .replace(/ue/g, 'ü')
      }));

      this.exercise.push(...mapped);
    }
  }

  goBack() {
    const previousUrl = sessionStorage.getItem('previousUrl');

    if (previousUrl) {
      this.router.navigate([previousUrl]);
    } else {
      this.router.navigate(['/homepage']);
    }
  }

  confirmDelete() {
    this.showDialog = true;
  }

  deleteAccount() {
    this.isClicked = true;
    this.showDialog = false;
    alert('Konto gelöscht!');
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/']);
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
