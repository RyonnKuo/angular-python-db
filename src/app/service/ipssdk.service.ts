import { Injectable } from '@angular/core';

export enum INPUT_TYPE {
  ACCOUNT = 0,
  PASSWORD,
  PHONE,
  NAME
}

export enum LoginType {
  Student = 'Student',
  Admin = 'Admin',
  Tutor = 'Tutor',
  Non = 'Non'
}

export interface REGISTER_LIST {
  email: string;
  password: string;
  phoneNo: string;
  name: string;
};

export interface STUDENT {
  sId: number;
  name: string;
  email: string;
  phoneNo: string;
};

export interface TUTOR {
  tId: number;
  name: string;
  email: string;
  phoneNo: string;
};

export interface ADMIN {
  aId: number;
  name: string;
  email: string;
  phoneNo: string;
};



export enum MainTab {
  Main = 'Main',
  Login = 'Login',
  Student = 'Student',
  Admin = 'Admin',
  Tutor = 'Tutor',
  Session = 'Session',
};

@Injectable({
  providedIn: 'root'
})
export class IpssdkService {

  constructor() { }
}
