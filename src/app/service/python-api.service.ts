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

  async getAllStudent(): Promise<any> {

    try {
      const res = await fetch('http://127.0.0.1:5000/api/get_all_student', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      console.log(`[py api] getAllStudent result: ${JSON.stringify(result)}`)
      return {
        "success": true,
        "result": result
      }
    } catch (error) {
      return {
        "success": false,
        "result": `[py api] getAllStudent error: ${JSON.stringify(error)}`
      };
    }
  }

  async getStudent(_email: string): Promise<any> {
    try {
      const param = {
        email: _email
      }
      const res = await fetch('http://127.0.0.1:5000/api/get_student', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
      });

      const result = await res.json();
      console.log(`[py api] getStudent result: ${JSON.stringify(result)}`)
      return {
        "success": true,
        "result": result
      }
    } catch (error) {
      return {
        "success": false,
        "result": `[py api] getStudent error: ${JSON.stringify(error)}`
      };
    }
  }


  async getAllAdmin(): Promise<any> {

    try {
      const res = await fetch('http://127.0.0.1:5000/api/get_all_admin', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      console.log(`[py api] getAllAdmin result: ${JSON.stringify(result)}`)
      return {
        "success": true,
        "result": result
      }
    } catch (error) {
      return {
        "success": false,
        "result": `[py api] getAllAdmin error: ${JSON.stringify(error)}`
      };
    }
  }

  async getAdmin(_email: string): Promise<any> {
    try {
      const param = {
        email: _email
      }
      const res = await fetch('http://127.0.0.1:5000/api/get_admin', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
      });

      const result = await res.json();
      console.log(`[py api] getStudent result: ${JSON.stringify(result)}`);
      return {
        "success": true,
        "result": result
      }
    } catch (error) {
      return {
        "success": false,
        "result": `[py api] getAdmin error: ${JSON.stringify(error)}`
      };
    }
  }

}
