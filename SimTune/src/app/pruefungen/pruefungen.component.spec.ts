import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruefungenComponent } from './pruefungen.component';

describe('PruefungenComponent', () => {
  let component: PruefungenComponent;
  let fixture: ComponentFixture<PruefungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruefungenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruefungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
