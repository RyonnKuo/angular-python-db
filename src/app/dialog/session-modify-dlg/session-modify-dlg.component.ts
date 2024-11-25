import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IpssdkService, SESSION } from 'src/app/service/ipssdk.service';
import { GlobalService } from 'src/app/service/global.service';

enum SESSION_INPUT {
  sdesc = 0,
  enddate,
  price
}

@Component({
  selector: 'app-session-modify-dlg',
  templateUrl: './session-modify-dlg.component.html',
  styleUrls: ['./session-modify-dlg.component.scss']
})
export class SessionModifyDlgComponent implements OnInit, OnDestroy {

  SESSION_INPUT = SESSION_INPUT;
  session: SESSION | undefined;
  cid: number = 0;
  startdate: string | undefined;
  enddate: string | undefined;
  sname: string = '';
  sdesc: string = '';
  price: number = 0;

  isDelete: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private gos: GlobalService,
    public dialogRef: MatDialogRef<SessionModifyDlgComponent>,
  ) { }


  get disabledSubmitBtn () {
    return isNaN(this.cid) || this.sdesc == undefined || this.enddate == '' || isNaN(this.price);
  }
  ngOnInit(): void {
    if (this.data.sessionInfo) {
      this.session = this.data.sessionInfo;
      console.log(`[modify session dlg] default session: ${JSON.stringify(this.session)}`);

      if (this.session) {
        this.cid = this.session.cid;
        this.startdate = this.session.startdate;
        this.enddate = this.session.enddate;
        this.sname = this.session.sname;
        this.sdesc = this.session.sdesc;
        this.price = this.session.price;
      }
    }

    if (this.data.isDelete) {
      this.isDelete = true;
    }
  }

  ngOnDestroy(): void {

  }

  closeDialog() {

    this.dialogRef.close(false);
  }

  keyUp(type: SESSION_INPUT, value: any) {
    console.log(`[modify session dlg] keyup input type: ${type}, input value: ${value}`);

    switch (type) {
      case SESSION_INPUT.enddate:
        this.enddate = value;
        break;
      case SESSION_INPUT.price:
        this.price = value;
        break;
      case SESSION_INPUT.sdesc:
        this.sdesc = value;
        break;
      default:
        break;
    }
  }

  onSubmit() {

    var modifyType = this.isDelete? 0: 1;

    const session_fix = {
      cid: this.cid,
      startdate: this.startdate || '',
      enddate: this.enddate || '',
      sname: this.sname,
      sdesc: this.sdesc,
      price: this.price,
      modifyType: modifyType
    }

    this.dialogRef.close(session_fix);
  }

}
