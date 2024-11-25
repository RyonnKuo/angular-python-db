import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IpssdkService, SESSION } from 'src/app/service/ipssdk.service';
import { GlobalService } from 'src/app/service/global.service';

enum SESSION_INPUT {
  cid = 0,
  startdate,
  sname,
  sdesc,
  enddate,
  price
}

@Component({
  selector: 'app-create-session-dlg',
  templateUrl: './create-session-dlg.component.html',
  styleUrls: ['./create-session-dlg.component.scss']
})
export class CreateSessionDlgComponent implements OnInit, OnDestroy {

  SESSION_INPUT = SESSION_INPUT;
  cid: number = 101;
  sname: string = '';
  startdate: string = '';
  sdesc: string = '';
  enddate: string = '';
  price: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private gos: GlobalService,
    public dialogRef: MatDialogRef<CreateSessionDlgComponent>,
  ) { }

  get disabledSubmitBtn () {
    return isNaN(this.cid) || (this.cid !== 101 && this.cid !== 102) || this.sdesc == '' || this.enddate == '' || isNaN(this.price) || this.price == 0 || this.sname == '' || this.startdate == '';
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  closeDialog() {

    this.dialogRef.close(false);
  }

  keyUp(type: SESSION_INPUT, value: any) {
    console.log(`[create session dlg] keyup input type: ${type}, input value: ${value}`);

    switch (type) {
      case SESSION_INPUT.cid:
        this.cid = value;
        break;
      case SESSION_INPUT.startdate:
        this.startdate = value;
        break;
      case SESSION_INPUT.sname:
        this.sname = value;
        break;
      case SESSION_INPUT.sdesc:
        this.sdesc = value;
        break;
      case SESSION_INPUT.enddate:
        this.enddate = value;
        break;
      case SESSION_INPUT.price:
        this.price = value;
        break;
      default:
        break;
    }
  }

  onSubmit() {
    const create_session: SESSION = {
      cid: this.cid,
      startdate: this.startdate || '',
      enddate: this.enddate || '',
      sname: this.sname,
      sdesc: this.sdesc,
      price: this.price
    }
    this.dialogRef.close(create_session);
  }
}
