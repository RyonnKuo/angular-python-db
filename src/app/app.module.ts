import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './page/main-page/main-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { StudentPageComponent } from './page/student-page/student-page.component';
import { TutorPageComponent } from './page/tutor-page/tutor-page.component';
import { AdminPageComponent } from './page/admin-page/admin-page.component';
import { SessionPageComponent } from './page/session-page/session-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    StudentPageComponent,
    TutorPageComponent,
    AdminPageComponent,
    SessionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
