import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebungenSubpageComponent } from './uebungen-subpage.component';

describe('UebungenSubpageComponent', () => {
  let component: UebungenSubpageComponent;
  let fixture: ComponentFixture<UebungenSubpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UebungenSubpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UebungenSubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
