import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesystemComponent } from './notesystem.component';

describe('NotesystemComponent', () => {
  let component: NotesystemComponent;
  let fixture: ComponentFixture<NotesystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
