import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LehrerDashboardComponent } from './lehrer-dashboard.component';

describe('LehrerDashboardComponent', () => {
  let component: LehrerDashboardComponent;
  let fixture: ComponentFixture<LehrerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LehrerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LehrerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
