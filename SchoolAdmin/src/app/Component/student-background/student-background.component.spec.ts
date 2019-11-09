import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBackgroundComponent } from './student-background.component';

describe('StudentBackgroundComponent', () => {
  let component: StudentBackgroundComponent;
  let fixture: ComponentFixture<StudentBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
