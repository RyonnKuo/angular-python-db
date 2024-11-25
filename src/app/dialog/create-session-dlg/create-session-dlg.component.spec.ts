import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSessionDlgComponent } from './create-session-dlg.component';

describe('CreateSessionDlgComponent', () => {
  let component: CreateSessionDlgComponent;
  let fixture: ComponentFixture<CreateSessionDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSessionDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSessionDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
