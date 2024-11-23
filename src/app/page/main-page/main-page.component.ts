import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';
import { IpssdkService, MainTab, LoginType } from 'src/app/service/ipssdk.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {


  testData: string[] = [];
  LoginType = LoginType;
  loginType: LoginType = this.gos.loginType;

  constructor(
    public gos: GlobalService
  ) {
    try {
      this.gos.checkLoginObservable.subscribe((res: LoginType) => {
        console.log(`[MainPageComponent] check Login Observable res: ${res}`);
        this.loginType = res;
      });

    } catch (error) {

    }
  }


  ngOnInit(): void {
  }

  async testCallBackend() {
    this.testData = await this.gos.testCallBackend();
  }

}
