import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './page/main-page/main-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { StudentPageComponent } from './page/student-page/student-page.component';
import { TutorPageComponent } from './page/tutor-page/tutor-page.component';
import { AdminPageComponent } from './page/admin-page/admin-page.component';
import { SessionPageComponent } from './page/session-page/session-page.component';
import { EnrollSessionDlgComponent } from './dialog/enroll-session-dlg/enroll-session-dlg.component';
import { SessionModifyDlgComponent } from './dialog/session-modify-dlg/session-modify-dlg.component';
import { CreateSessionDlgComponent } from './dialog/create-session-dlg/create-session-dlg.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    StudentPageComponent,
    TutorPageComponent,
    AdminPageComponent,
    SessionPageComponent,
    EnrollSessionDlgComponent,
    SessionModifyDlgComponent,
    CreateSessionDlgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
