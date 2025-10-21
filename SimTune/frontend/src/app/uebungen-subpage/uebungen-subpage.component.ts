import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-uebungen-subpage',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './uebungen-subpage.component.html',
  styleUrl: './uebungen-subpage.component.css'
})
export class UebungenSubpageComponent {

}
