import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { STUDENT, SESSION } from 'src/app/service/ipssdk.service';
import { GlobalService } from 'src/app/service/global.service';
import { PythonApiService } from 'src/app/service/python-api.service';

enum ENROLL_INPUT {
  coupon = 0,
  cardid,
  cardenddate,
  cardtype
}

@Component({
  selector: 'app-enroll-session-dlg',
  templateUrl: './enroll-session-dlg.component.html',
  styleUrls: ['./enroll-session-dlg.component.scss']
})
export class EnrollSessionDlgComponent implements OnInit, OnDestroy {

  ENROLL_INPUT = ENROLL_INPUT;
  sessionInfo!: SESSION;
  userInfo!: STUDENT;

  coupon: string = '';
  cardid: any;
  cardenddate: any;
  cardtype: string = '';

  constructor(
    public dialogRef: MatDialogRef<EnrollSessionDlgComponent>,
    private gos: GlobalService,
    private pas: PythonApiService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {


  }

  get disabledSubmitBtn() {
    return this.coupon == '' || this.cardid == undefined || this.cardenddate == undefined || this.cardtype == '';
  }

  ngOnInit(): void {
    if (this.data.sessionInfo) {
      this.sessionInfo = this.data.sessionInfo;
      console.log(`[enroll dlg] sessionInfo: ${JSON.stringify(this.sessionInfo)}`);
    }
    if (this.gos.currentUser) {
      this.userInfo = this.gos.currentUser;
      console.log(`[enroll dlg] userInfo: ${JSON.stringify(this.userInfo)}`);
    }
    console.log(`[enroll dlg] init done`)
  }

  ngOnDestroy(): void {

  }

  closeDialog(tf: boolean) {

    this.dialogRef.close(tf);
  }

  keyUp(type: ENROLL_INPUT, value: any) {
    console.log(`[enroll dlg] keyup input type: ${type}, input value: ${value}`);

    // coupon, tdate, cardid, cardenddate, cardtype
    switch (type) {
      case ENROLL_INPUT.coupon:
        this.coupon = value;
        break;
      case ENROLL_INPUT.cardid:
        this.cardid = value;
        break;
      case ENROLL_INPUT.cardenddate:
        if (this.gos.isValidDate(value)) {
          this.cardenddate = value;
        }
        break;
      case ENROLL_INPUT.cardtype:
        this.cardtype = value;
        break;
      default:
        break;
    }
  }

  onSubmit() {

    const now = new Date;
    const formattedDate = now.toISOString().split('T')[0];

    if (this.userInfo && this.sessionInfo) {
      console.log(`[enroll dlg] onSubmit sId: ${this.userInfo.sid}`);
      console.log(`[enroll dlg] onSubmit startdate: ${this.sessionInfo.startdate}`);
      console.log(`[enroll dlg] onSubmit sname: ${this.sessionInfo.sname}`);
      console.log(`[enroll dlg] onSubmit tno: ${0}`);
      console.log(`[enroll dlg] onSubmit coupon: ${this.coupon}`);
      console.log(`[enroll dlg] onSubmit amount: ${this.sessionInfo.price}`);
      console.log(`[enroll dlg] onSubmit tdate: ${now}`);
      console.log(`[enroll dlg] onSubmit cardid: ${this.cardid}`);
      console.log(`[enroll dlg] onSubmit cardenddate: ${this.cardenddate}`);
      console.log(`[enroll dlg] onSubmit cardtype: ${this.cardtype}`);

      this.pas.addEnroll(this.userInfo.sid, this.sessionInfo.startdate, this.sessionInfo.sname, 0, this.coupon, this.sessionInfo.price, formattedDate, this.cardid, this.cardenddate, this.cardtype);
    }
    this.closeDialog(true);
  }
}
