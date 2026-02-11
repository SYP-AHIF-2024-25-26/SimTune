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

  constructor(private router: Router) {}

  exercise: { [key: string]: string }[] = [];
  test: { [key: string]: string }[] = [];
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  exerciseTypes: string[] = ['Töne', 'Rythmus', 'Intervalle', 'Akkorde', 'Tonleitern', 'Tonarten'];
  testTypes: string[] = ['Töne', 'Rythmus', 'Intervalle', 'Akkorde', 'Tonleitern', 'Tonarten'];
  selectedTypes: string[] = [...this.testTypes];
  selectedExerciseTypes: string[] = [...this.exerciseTypes];
  showSortOptions = false;
  progress = signal<number>(0);
  averagePercent = signal<number>(0);
  activeSort = signal<string | null>(null);
  currentSortCol: string | null = null;
  selected: "simulation" | "exercise" = "exercise";

  async ngOnInit() {
    var jwt = sessionStorage.getItem("jwt")!;
    const decoded = jwtDecode<MyJwtPayload>(jwt);

    this.email.set(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
    this.benutzername.set(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);

    const isSimulation = history.state?.isPruefung === true;
    this.selected = isSimulation ? "simulation" : "exercise";

    await Promise.all([
      this.getExercises(),
      this.getTests()
    ]);

    this.progress.set(await this.getProgress());
    const result = await this.getAveragePercent();

    this.averagePercent.set(
      typeof result === 'string'
        ? Number(result.replace('%', ''))
        : result
    );
  }

  async getAveragePercent() {
    if (this.test.length > 0) {
      const avg =
        this.test.reduce((sum, t) => {
          const value = Number(t['Achieved Percentage'].replace('%', ''));
          return sum + value;
        }, 0) / this.test.length;

      return avg.toFixed(2);
    }
    return 0;
  }

  async getTests() {
    var userTests: ExamStatsResponse = await fetchRestEndpointWithAuthorization(API_URL + 'exam-simulation/completed', 'GET', );
    if (userTests && userTests.allExams.length > 0) {
      const mapped = userTests.allExams.map(ex => ({
        'Id': ex.id.toString(),
        'Question Count': ex.questionCount.toString(),
        'Exercise Allocation': ex.exerciseAllocations.join(', '),
        'Achieved Percentage': ex.achievedPercentage.toString() + '%',
        'Completed At': new Date(ex.completedAt + 'Z').toString()
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

  async toggle() {
    this.selected = this.selected === "simulation" ? "exercise" : "simulation";

    this.selectedTypes = this.selected === "simulation"
    ? [...this.testTypes]
    : [...this.exerciseTypes];

    this.filteredExercise;
  }

  get activeList(): string[] {
    return this.selected === 'simulation'
      ? this.selectedTypes
      : this.selectedExerciseTypes;
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
        this.selectedExerciseTypes.includes(ex['Exercise Allocation'])
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
    const queryValue = this.selectedExerciseTypes.join(',');

    const url = `${API_URL}exercises/count-by-allocation?exerciseAllocations=${encodeURIComponent(queryValue)}`;

    const allExercises = await fetchRestEndpoint(url, 'GET');

    if (allExercises.exerciseCount === undefined) return 0;
    return Math.round((this.filteredExercise.length / allExercises.exerciseCount) * 100);
  }

  sortData(column: string) {
    const dir = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    this.sortDirection[column] = dir;
    this.currentSortCol = column;
  }

  async toggleType(type: string) {
    const list = this.selected === "exercise"
      ? this.selectedExerciseTypes
      : this.selectedTypes;

    this.toggleSelection(type, list);

    this.filteredExercise;
    this.progress.set(await this.getProgress());
  }

  toggleSelection(type: string, list: string[]) {
    const index = list.indexOf(type);

    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(type);
    }
  }
}
