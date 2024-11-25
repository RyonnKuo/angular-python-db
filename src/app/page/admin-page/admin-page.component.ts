import { Component, OnInit } from '@angular/core';
import { PythonApiService } from 'src/app/service/python-api.service';
import { GlobalService } from 'src/app/service/global.service';
import { IpssdkService, SESSION, ENROLL } from 'src/app/service/ipssdk.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  session: SESSION[] = [];
  enroll: ENROLL[] = [];
  displayedSessionColumns: string[] = ['cid', 'sname', 'startdate', 'enddate', 'sdesc', 'price', 'action'];
  displayedEnrollColumns: string[] = ['sid', 'sname', 'startdate', 'tno', 'tdate', 'coupon', 'amount', 'cardid', 'cardenddate', 'cardtype'];

  constructor(
    private pas: PythonApiService,
    private gos: GlobalService,
    private popup: PopupService
  ) { }

  async ngOnInit() {

    this.updateEnrollData();
    this.updateSessionData();
  }

  async updateEnrollData() {

    const getEnrollRes = await this.pas.getAllEnroll();
    if (getEnrollRes.success) {
      type ENROLLTYPE = [number, Date, string, number, string, number, Date, number, Date, string];
      let enrollData = getEnrollRes.result;
      this.enroll = enrollData.map(([sid, startdate, sname, tno, coupon, amount, tdate, cardid, cardenddate, cardtype]: ENROLLTYPE) => ({
        sid,
        startdate: this.gos.formatDate(new Date(startdate)),
        sname,
        tno,
        coupon,
        amount,
        tdate: this.gos.formatDate(new Date(tdate)),
        cardid,
        cardenddate: this.gos.formatDate(new Date(cardenddate)),
        cardtype
      }));

      console.log(`[admin] enroll: ${JSON.stringify(this.enroll)}`);
    }
  }

  async updateSessionData() {

    const getSessionRes = await this.pas.getAllSession();
    if (getSessionRes.success) {
      type SESSIONTYPE = [number, Date, string, string, Date, number];
      let sessionData = getSessionRes.result;
      this.session = sessionData.map(([cid, startdate, sname, sdesc, enddate, price]: SESSIONTYPE) => ({
        cid,
        startdate: this.gos.formatDate(new Date(startdate)),
        sname,
        sdesc,
        enddate: this.gos.formatDate(new Date(enddate)),
        price
      }));

      console.log(`[admin] session: ${JSON.stringify(this.session)}`);
    }
  }


  modifySessionInfo(session: SESSION) {
    console.log(`session = ${JSON.stringify(session)}`);

    const dlg = this.popup.sessionModifyDlg(session);
    dlg.afterClosed().subscribe(result => {
      if (result) {
        console.log(`[admin] get modify session info: ${JSON.stringify(result)}`);
        console.log(`[admin] get modify session cid: ${result['cid']}`);
        console.log(`[admin] get modify session startdate: ${result['startdate']}`);
        console.log(`[admin] get modify session sname: ${result['sname']}`);
        console.log(`[admin] get modify session sdesc: ${result['sdesc']}`);
        console.log(`[admin] get modify session enddate: ${result['enddate']}`);
        console.log(`[admin] get modify session price: ${result['price']}`);

        this.pas.updateSession(result['cid'], result['startdate'], result['sname'], result['sdesc'], result['enddate'], result['price'], result['modifyType']);

        this.updateSessionData();
      }
    })
  }

  createSession() {
    const dlg = this.popup.createSessionDlg();
    dlg.afterClosed().subscribe(result => {
      if (result) {
        console.log(`[admin] get modify session info: ${JSON.stringify(result)}`);
        console.log(`[admin] get modify session cid: ${result['cid']}`);
        console.log(`[admin] get modify session startdate: ${result['startdate']}`);
        console.log(`[admin] get modify session sname: ${result['sname']}`);
        console.log(`[admin] get modify session sdesc: ${result['sdesc']}`);
        console.log(`[admin] get modify session enddate: ${result['enddate']}`);
        console.log(`[admin] get modify session price: ${result['price']}`);

        this.pas.updateSession(result['cid'], result['startdate'], result['sname'], result['sdesc'], result['enddate'], result['price'], 2);

        this.updateSessionData();
      }
    })
  }

  deleteSession() {

  }
}
