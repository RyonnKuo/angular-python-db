import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionModifyDlgComponent } from './session-modify-dlg.component';

describe('SessionModifyDlgComponent', () => {
  let component: SessionModifyDlgComponent;
  let fixture: ComponentFixture<SessionModifyDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionModifyDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionModifyDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
