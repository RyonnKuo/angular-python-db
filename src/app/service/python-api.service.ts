import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PythonApiService {

  constructor() { }

  async studentReg(email: string, phoneNo: string, name: string): Promise<any> {
    try {
      const param = {
        email: email,
        phoneno: phoneNo,
        name: name
      }
      const res = await fetch('http://127.0.0.1:5000/api/student_register', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
      });

      const result = await res.json();
      if (result.success) {
        console.log(`[py api] studentReg success`);
      } else {
        console.log(`[py api] studentReg fail, ${result.message}`);
      }
    } catch (error) {
      console.log(`[py api] studentReg error: ${JSON.stringify(error)}`);
    }
  }
}
