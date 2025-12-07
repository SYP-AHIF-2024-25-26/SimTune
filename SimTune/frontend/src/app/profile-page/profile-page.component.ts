import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { API_URL, fetchRestEndpoint, fetchRestEndpointWithAuthorization } from '../api-calls/fetch-rest-endpoint';

interface MyJwtPayload {
  sub: string;
  jti: string;
  aud: string;
  exp: number;
  iss: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
}

export interface ExamStatsResponse {
  bestExamPercentage: number;
  worstExamPercentage: number;
  averagePercentage: number;
  totalExamsCompleted: number;
  last5Exams: ExamResult[];
  allExams: ExamResult[];
}

export interface ExamResult {
  id: number;
  questionCount: number;
  exerciseAllocations: string[];
  achievedPercentage: number;
  completedAt: string;
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
  test: { [key: string]: string }[] = [];
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  exerciseTypes: string[] = ['Töne', 'Rythmus', 'Intervalle', 'Akkorde', 'Tonleitern', 'Tonarten'];
  testTypes: string[] = ['Töne', 'Rythmus', 'Intervalle', 'Akkorde', 'Tonleitern', 'Tonarten'];
  selectedTypes: string[] = [...this.testTypes];
  showSortOptions = false;
  progress = signal<number>(0);
  activeSort = signal<string | null>(null);
  currentSortCol: string | null = null;
  selectedExerciseTypes = signal<string[]>([]);
  selected: "simulation" | "exercise" = "simulation";

  async ngOnInit() {
    var jwt = sessionStorage.getItem("jwt")!;
    const decoded = jwtDecode<MyJwtPayload>(jwt);

    this.email.set(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
    this.benutzername.set(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
    this.rolle.set('not defined');

    await this.getExercises();
    await this.getTests();
    this.progress.set(await this.getProgress());
  }

  async getTests() {
    var userTests: ExamStatsResponse = await fetchRestEndpointWithAuthorization(API_URL + 'exam-simulation/completed', 'GET', );
    if (userTests && userTests.allExams.length > 0) {
      const mapped = userTests.allExams.map(ex => ({
        'Id': ex.id.toString(),
        'Question Count': ex.questionCount.toString(),
        'Exercise Allocation': ex.exerciseAllocations.join(', '),
        'Achieved Percentage': ex.achievedPercentage.toString() + '%',
        'Completed At': ex.completedAt.toString()
      }));

      this.test.push(...mapped);
    }
  }

  async getExercises() {
    var userExercises = await fetchRestEndpointWithAuthorization(API_URL + 'usermanagement/completed-exercises', 'GET', );
    if (Array.isArray(userExercises)) {
      const mapped = userExercises.map(ex => ({
        'ÜbungsID': ex.exerciseId.toString(),
        'Exercise Allocation': ex.exerciseAllocation,
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

  toggle() {
    this.selected = this.selected === "simulation" ? "exercise" : "simulation";

    this.selectedTypes = this.selected === "simulation"
    ? [...this.testTypes]
    : [...this.exerciseTypes];

    this.filteredExercise;
  }

  get filteredExercise() {
    const source = this.selected === "simulation" ? this.test : this.exercise;
    let filtered: {[key: string]: string}[];

    if(this.selected === "simulation") {
      filtered = source.filter(ex => {
        const allocationArray = ex['Exercise Allocation']
          .split(',')
          .map(x => x.trim());

        return allocationArray.some(a => this.selectedTypes.includes(a));
      });
    } else {
      filtered = source.filter(ex =>
        this.selectedTypes.includes(ex['Exercise Allocation'])
      );
    }

    return filtered.sort((a, b) => {
      const col = this.currentSortCol;
      if (!col) return 0;

      const dir = this.sortDirection[col];
      const aVal = a[col];
      const bVal = b[col];

      if (aVal < bVal) return dir === 'asc' ? -1 :  1;
      if (aVal > bVal) return dir === 'asc' ?  1 : -1;
      return 0;
    });
  }


  async getProgress() {
    const results = await Promise.all(
      //['Intervalle', 'Tonleitern', 'StammtoeneKlavier', 'VersetzungszeichenKlavier', 'StammtoeneViolinschluessel', 'VersetzungszeichenViolinschluessel', 'HilfslinienViolinschluessel', 'HilfslinienBassschluessel', 'VersetzungszeichenBasschluessel', 'StammtoeneBassschluessel']
      ['Intervalle', 'Tonleitern']
        .map(type => fetchRestEndpoint(API_URL + 'exercises/' + type, 'GET'))
    );
    const allExercises = results.flat();

    if (allExercises.length === 0) return 0;
    const completedCount = (this.selected === "simulation") ? this.test.length : this.exercise.length;
    return Math.round((completedCount / allExercises.length) * 100);
  }

  sortData(column: string) {
    const dir = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    this.sortDirection[column] = dir;
    this.currentSortCol = column;
  }

  toggleType(type: string) {
    if (this.selectedTypes.includes(type)) {
      this.selectedTypes = this.selectedTypes.filter(t => t !== type);
    } else {
      this.selectedTypes.push(type);
    }
  }
}
