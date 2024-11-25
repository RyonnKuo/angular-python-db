import { Component, OnInit } from '@angular/core';
import { PythonApiService } from 'src/app/service/python-api.service';
import { IpssdkService, SESSION, ENROLL } from 'src/app/service/ipssdk.service';
import { GlobalService } from 'src/app/service/global.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent implements OnInit {

  session: SESSION[] = [];
  enroll: ENROLL[] = [];

  constructor(
    private pas: PythonApiService,
    private gos: GlobalService,
    private popup: PopupService
  ) {

  }

  async ngOnInit() {
    this.initStudentEnroll();

  }

  async initStudentEnroll() {
    // 抓DB所有的課程
    const sessionRes = await this.pas.getAllSession();
    // 篩選出所有gos.currentUser對應的有報名課程
    const enrollRes = await this.pas.getEnroll(this.gos.currentUser['sid']);

    if (enrollRes.success) {
      type ENROLLTYPE = [number, Date, string, number, string, number, Date, number, Date, string];
      let enrollData = enrollRes.result;
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

      console.log(`[student] enroll: ${JSON.stringify(this.enroll)}`);
    }

    if (sessionRes.success) {
      type SESSIONTYPE = [number, Date, string, string, Date, number];
      let sessionData = sessionRes.result;
      let sessionTmp = sessionData.map(([cid, startdate, sname, sdesc, enddate, price]: SESSIONTYPE) => ({
        cid,
        startdate: this.gos.formatDate(new Date(startdate)),
        sname,
        sdesc,
        enddate: this.gos.formatDate(new Date(enddate)),
        price
      }));


      this.session = sessionTmp.filter(
        (s: SESSION) =>
          !this.enroll.some(
            (e) =>
              e.sname == s.sname &&
              e.startdate == s.startdate
          )
      );
      console.log(`[student] session: ${JSON.stringify(this.session)}`);
    }
  }

  userEnrollSession(session: SESSION) {

    const userInfo = this.gos.currentUser;
    const sessionInfo = session;
    const maxTnoEnroll = this.enroll.reduce((max, current) => {
      return current.tno > max.tno ? current : max;
    }, this.enroll[0]);

    console.log(`[student] open enroll dlg userInfo: ${JSON.stringify(userInfo)}`)
    console.log(`[student] open enroll dlg sessionInfo: ${JSON.stringify(sessionInfo)}`)

    const dlg = this.popup.sessionEnrollDlg(userInfo, sessionInfo, maxTnoEnroll.tno + 1);
    dlg.afterClosed().subscribe(result => {
      if (result) {
        this.initStudentEnroll();
      }
    })
  }
}
