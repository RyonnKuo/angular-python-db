import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { LoginType } from './ipssdk.service'
import { PythonApiService } from './python-api.service';


@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  private loginSubject: BehaviorSubject<LoginType>;
  checkLoginObservable: Observable<LoginType>;
  validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  private _loginType: LoginType = LoginType.Non;
  private _user: any;


  constructor(
    public pas: PythonApiService,
  ) {
    this.loginSubject = new BehaviorSubject<LoginType>(this.loginType);
    this.checkLoginObservable = this.loginSubject.asObservable();
  }

  get loginType(): LoginType {
    return this._loginType;
  }

  get currentUser() {
    return this._user;
  }

  async testCallBackend(): Promise<any> {
    const res = await fetch('http://127.0.0.1:5000/api/data', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    const resArr = json as Array<string> || [];
    console.log(`response: ${JSON.stringify(json)} resArr = ${resArr}`);

    return resArr.filter(v => v !== '' && v !== null); //remove: null, NaN, false, ""
  }



  validateEmail(email: string) {
    return email.match(this.validRegex);
  }

  async updateLoginStatus(account: string, password: string) {

    const inputAccount = account;
    const inputPassword = password; // phone number

    // 送資料到DB找對應的帳號密碼
    const getAllStudentResult = await this.pas.getAllStudent();
    const getAllAdminResult = await this.pas.getAllAdmin();


    if (getAllStudentResult.success) {
      type student = [number, string, string, string]
      let studentData = getAllStudentResult.result;
      const formattedStudentData = studentData.map(([sid, name, email, phone]: student) => ({
        sid,
        name,
        email,
        phone
      }));
      // check account is student or not
      console.log(`[gos] formattedStudentData: ${JSON.stringify(formattedStudentData)}`);
      const sIdx = formattedStudentData.findIndex((v: { sid: number, name: string, email: string, phone: string }) => v.email == inputAccount);
      console.log(`[gos] input account is exist in formattedStudentData: ${sIdx}`);

      if (sIdx !== -1) {
        const accountFitStudent = formattedStudentData[sIdx];
        if (inputPassword == accountFitStudent.phone) {
          this._user = accountFitStudent;
          this.loginSubject.next(LoginType.Student);
          return true;
        }
      }
    }

    if (getAllAdminResult.success) {
      type admin = [number, number, string, string, string]
      let adminList = getAllAdminResult.result;
      const formattedAdminData = adminList.map(([aid, cid, name, email, phone]: admin) => ({
        aid,
        cid,
        name,
        email,
        phone
      }));
      // check account is admin or not
      console.log(`[gos] formattedAdminData: ${JSON.stringify(formattedAdminData)}`);
      const aIdx = formattedAdminData.findIndex((v: { aid: number, cid: number, name: string, email: string, phone: string }) => v.email == inputAccount);
      console.log(`[gos] input account is exist in formattedAdminData: ${aIdx}`);

      if (aIdx !== -1) {
        const accountFitAdmin = formattedAdminData[aIdx];
        if (inputPassword == accountFitAdmin.phone) {
          this._user = accountFitAdmin;
          this.loginSubject.next(LoginType.Admin);
          return true;
        }
      }
    }

    // can not find account from DB
    this.loginSubject.next(LoginType.Non);
    return false;
  }
}
