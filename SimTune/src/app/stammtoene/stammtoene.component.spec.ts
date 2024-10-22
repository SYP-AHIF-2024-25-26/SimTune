import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StammtoeneComponent } from './stammtoene.component';

describe('StammtoeneComponent', () => {
  let component: StammtoeneComponent;
  let fixture: ComponentFixture<StammtoeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StammtoeneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StammtoeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
