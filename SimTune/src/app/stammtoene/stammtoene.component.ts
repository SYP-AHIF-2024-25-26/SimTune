import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-stammtoene',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stammtoene.component.html',
  styleUrl: './stammtoene.component.css'
})
export class StammtoeneComponent {
  texts: { text: string; value: string }[] = [
    { text: "Lies c, d und e", value: "c,d,e" },
    { text: "Markiere c, d und e", value: "c,d,e" },
    { text: "Lies e, f und g", value: "e,f,g" },
    { text: "Markiere e, f und g", value: "e,f,g" },
    { text: "Lies c bis g", value: "c,d,e,f,g" },
    { text: "Markiere c bis g", value: "c,d,e,f,g" },
    { text: "Lies g, a, h und c", value: "g,a,h,c" },
    { text: "Markiere g, a, h und c", value: "g,a,h,c" },
    { text: "Lies Orientierungstöne", value: "Orientierungstöne,c,d,e,f,g,a,h" },
    { text: "Lies alle Stammtöne", value: "c,d,e,f,g,a,h" },
    { text: "Markiere alle Stammtöne", value: "c,d,e,f,g,a,h" },
  ];
  currentIndex: number = 0;
  breadcrumb_elements = signal<{ label: string; url: string}[] | undefined>(undefined);


  constructor(private router: Router, private route: ActivatedRoute) {}

  goToTask(text: string): void {
    const action = text.startsWith('Markiere') ? 'markiere' : 'lies';
    const foundItem = this.texts.find(item => item.text === text);
    const letters = foundItem ? foundItem.value : '';
    const index = foundItem ? this.texts.indexOf(foundItem) : 0;

    this.router.navigate(['/task'], { queryParams: { action, letters, index } });
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.breadcrumb_elements.set(data['breadcrumbElements']);
    })
  }
}
