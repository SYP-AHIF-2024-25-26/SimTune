import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchuelerDashboardComponent } from './schueler-dashboard.component';

describe('SchuelerDashboardComponent', () => {
  let component: SchuelerDashboardComponent;
  let fixture: ComponentFixture<SchuelerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchuelerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchuelerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
