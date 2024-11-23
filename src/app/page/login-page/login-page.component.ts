import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';
import { IpssdkService, INPUT_TYPE, LoginType } from 'src/app/service/ipssdk.service'
import { PythonApiService } from 'src/app/service/python-api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  INPUT_TYPE = INPUT_TYPE;
  pageStatus: number = 0;

  userEmail: string = '';
  phoneNo: string = '';
  username: string = '';

  accountValid: boolean = true;
  errorMsg: string = '';

  constructor(
    private gos: GlobalService,
    private pys: PythonApiService,
  ) { }

  get disabledSubmitBtn() {
    if (this.pageStatus == 0) {
      return this.userEmail == '' || !this.accountValid || this.phoneNo == '';
    }
    return this.userEmail == '' || !this.accountValid || this.phoneNo == '' || this.username == '';
  }

  ngOnInit(): void {

    try {
      this.gos.checkLoginObservable.subscribe((res) => {
        console.log(`[login component] check Login Observable res: ${res}`);
        this.errorMsg = res == LoginType.Non? 'Account OR Password incorrect!': '';

      });

    } catch (error) {

    }
  }

  switchTab(status: number) {

    // clean value
    this.userEmail = '';
    this.phoneNo = '';
    this.username = '';

    this.accountValid = true;
    this.pageStatus = status;
  }

  onLoginKeyUp(type: INPUT_TYPE, value: string) {
    console.log(`[login-page] onLoginKeyUp input type: ${type}, input value: ${value}`);

    if (type == INPUT_TYPE.ACCOUNT) {
      this.userEmail = value;
      this.accountValid = !!this.gos.validateEmail(value);
    } else if (type == INPUT_TYPE.PHONE) {
      this.phoneNo = value;
    }
  }

  onRegKeyUp(type: INPUT_TYPE, value: string) {
    console.log(`[login-page] onRegKeyUp input type: ${type}, input value: ${value}`);

    switch (type) {
      case INPUT_TYPE.ACCOUNT:
        this.userEmail = value;
        this.accountValid = !!this.gos.validateEmail(value);
        break;
      case INPUT_TYPE.PHONE:
        this.phoneNo = value;
        break;
      case INPUT_TYPE.NAME:
        this.username = value;
        break;
      default:
        break;
    }
  }

  onSubmit() {
    console.log('userEmail:', this.userEmail);
    console.log('Password:', this.phoneNo);
    if (this.pageStatus == 0) {
      this.gos.updateLoginStatus(this.userEmail, this.phoneNo);

    } else {
      console.log('phoneNo:', this.phoneNo);
      console.log('username:', this.username);

      this.pys.studentReg(this.userEmail, this.phoneNo, this.username);
    }
  }
}
