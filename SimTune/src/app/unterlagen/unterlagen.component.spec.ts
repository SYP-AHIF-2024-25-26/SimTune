import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnterlagenComponent } from './unterlagen.component';

describe('UnterlagenComponent', () => {
  let component: UnterlagenComponent;
  let fixture: ComponentFixture<UnterlagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnterlagenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnterlagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
