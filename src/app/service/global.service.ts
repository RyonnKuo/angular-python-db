import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { LoginType } from './ipssdk.service'


@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  private static _instance: GlobalService;

  static get instance(): GlobalService {
    if (!GlobalService._instance) GlobalService._instance = new GlobalService();
    return GlobalService._instance;
  }

  private loginSubject: BehaviorSubject<LoginType>;
  checkLoginObservable: Observable<LoginType>;
  validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  private _loginType: LoginType = LoginType.Non;

  tutorAccountList = [
    {
      account: 'tutor1@test',
      password: '123'
    },{
      account: 'tutor2@test',
      password: '123'
    },{
      account: 'tutor3@test',
      password: '123'
    }
  ];
  adminAccountList = [
    {
      account: 'admin1@test',
      password: '123'
    },{
      account: 'admin2@test',
      password: '123'
    },{
      account: 'admin3@test',
      password: '123'
    }
  ]
  studentAccountList = [
    {
      account: 'student1@test',
      password: '123'
    },{
      account: 'student2@test',
      password: '123'
    },{
      account: 'student3@test',
      password: '123'
    }
  ];

  constructor(
  ) {
    this.loginSubject = new BehaviorSubject<LoginType>(this.loginType);
    this.checkLoginObservable = this.loginSubject.asObservable();
  }

  get loginType(): LoginType {
    return this._loginType;
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

  private validateMember(account: string, password: string) {
    // 送資料到DB找對應的帳號密碼

    const inputAccount = account;
    const inputPassword = password;



    console.log(`[gos] validateMember get login type: ${this._loginType}`);
    return this._loginType;
  }

  validateEmail(email: string) {
    return email.match(this.validRegex);
  }

  getUniqId(email: string) {
    // 問DB拿對應資料表(Student, Tutor, Manager)資料，根據資料長度給予ID
  }

  async updateLoginStatus(account: string, password: string) {

    const validateRes = await this.validateMember(account, password);

    if (validateRes) {
      this.loginSubject.next(validateRes);
    }
  }
}
