import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollSessionDlgComponent } from './enroll-session-dlg.component';

describe('EnrollSessionDlgComponent', () => {
  let component: EnrollSessionDlgComponent;
  let fixture: ComponentFixture<EnrollSessionDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollSessionDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollSessionDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
