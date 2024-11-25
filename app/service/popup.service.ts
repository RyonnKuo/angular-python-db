import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SESSION } from './ipssdk.service';
import { EnrollSessionDlgComponent } from '../dialog/enroll-session-dlg/enroll-session-dlg.component';
import { SessionModifyDlgComponent } from '../dialog/session-modify-dlg/session-modify-dlg.component';
import { CreateSessionDlgComponent } from '../dialog/create-session-dlg/create-session-dlg.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private dialog: MatDialog,
  ) {

  }

  sessionEnrollDlg(_userInfo: any,  _sessionInfo: SESSION, _tno: number) {
    return this.dialog.open(EnrollSessionDlgComponent, {
      width: '500px',
      height: '500px',
      data: {
        userInfo: _userInfo,
        sessionInfo: _sessionInfo,
        tno: _tno
      },
      disableClose: true,
    })
  }

  sessionModifyDlg(_sessionInfo: SESSION) {
    return this.dialog.open(SessionModifyDlgComponent, {
      width: '500px',
      height: '500px',
      data: {
        sessionInfo: _sessionInfo,
      },
      disableClose: true,
    })
  }

  createSessionDlg() {
    return this.dialog.open(CreateSessionDlgComponent, {
      width: '500px',
      height: '500px',
      data: {

      },
      disableClose: true,
    })
  }
}
