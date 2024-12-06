import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PythonApiService {

  //http://127.0.0.1:5000/
  private ngrokForwarding = 'https://e6e9-2001-b011-c009-b94f-9021-3caa-fd4a-e36f.ngrok-free.app';

  constructor() { }

  async studentReg(email: string, phoneNo: string, name: string): Promise<any> {
    try {
      const param = {
        email: email,
        phoneno: phoneNo,
        name: name
      }
      const res = await fetch(`${this.ngrokForwarding}/api/student_register`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420"
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
      const res = await fetch(`${this.ngrokForwarding}/api/get_all_student`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420"
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
        "result": `[py api] getAllStudent error: ${error}`
      };
    }
  }

  async getStudent(_email: string): Promise<any> {
    try {
      const param = {
        email: _email
      }
      const res = await fetch(`${this.ngrokForwarding}/api/get_student`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420"
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
      const res = await fetch(`${this.ngrokForwarding}/api/get_all_admin`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420"
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
      const res = await fetch(`${this.ngrokForwarding}/api/get_admin`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420"
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

  async getAllSession(): Promise<any> {

    try {
      const res = await fetch(`${this.ngrokForwarding}/api/get_all_session`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420"
        },
      });

      const result = await res.json();
      console.log(`[py api] getAllSession result: ${JSON.stringify(result)}`)
      return {
        "success": true,
        "result": result
      }
    } catch (error) {
      return {
        "success": false,
        "result": `[py api] getAllSession error: ${JSON.stringify(error)}`
      };
    }
  }

  async updateSession(cid: number, startdate: string, sname: string, sdesc: string, enddate: string, price: number, modifyType: number): Promise<any> {

    console.log(`[pas] updateSession modifyType: ${modifyType}`);
    try {

      if (modifyType == 0) {
        // delete
        const param = {
          cid: cid,
          startdate: startdate,
          sname: sname
        }
        const res = await fetch(`${this.ngrokForwarding}/api/delete_session`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
          },
          body: JSON.stringify(param)
        });

        const result = await res.json();
        if (result.success) {
          console.log(`[py api] updateSession success`);
        } else {
          console.log(`[py api] updateSession fail, ${result.message}`);
        }
      }else if (modifyType == 1) {
        // update
        const param = {
          cid: cid,
          sdesc: sdesc,
          enddate: enddate,
          price: price,
          startdate: startdate,
          sname: sname
        }

        const res = await fetch(`${this.ngrokForwarding}/api/update_session`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
          },
          body: JSON.stringify(param)
        });

        const result = await res.json();
        if (result.success) {
          console.log(`[py api] updateSession success`);
        } else {
          console.log(`[py api] updateSession fail, ${result.message}`);
        }
      }else {
        // create
        const param = {
          cid: cid,
          startdate: startdate,
          sname: sname,
          sdesc: sdesc,
          enddate: enddate,
          price: price
        }
        const res = await fetch(`${this.ngrokForwarding}/api/create_session`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
          },
          body: JSON.stringify(param)
        });

        const result = await res.json();
        if (result.success) {
          console.log(`[py api] updateSession success`);
        } else {
          console.log(`[py api] updateSession fail, ${result.message}`);
        }
      }

    } catch (error) {
      console.log(`[py api] updateSession error: ${JSON.stringify(error)}`);
    }
  }

  async getAllEnroll(): Promise<any> {

    try {
      const res = await fetch(`${this.ngrokForwarding}/api/get_all_enroll`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420"
        },
      });

      const result = await res.json();
      console.log(`[py api] getAllEnroll result: ${JSON.stringify(result)}`)
      return {
        "success": true,
        "result": result
      }
    } catch (error) {
      return {
        "success": false,
        "result": `[py api] getAllEnroll error: ${JSON.stringify(error)}`
      };
    }
  }

  async getEnroll(_sid: number): Promise<any> {

    try {
      const param = {
        sid: _sid
      }
      const res = await fetch(`${this.ngrokForwarding}/api/get_enroll`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420"
        },
        body: JSON.stringify(param)
      });

      const result = await res.json();
      console.log(`[py api] getEnroll result: ${JSON.stringify(result)}`)
      return {
        "success": true,
        "result": result
      }
    } catch (error) {
      return {
        "success": false,
        "result": `[py api] getEnroll error: ${JSON.stringify(error)}`
      };
    }
  }

  async addEnroll(sid: number, startdate: string, sname: string, tno: number, coupon: string, amount: number, tdate: string, cardid: number, cardenddate: string, cardtype: string): Promise<any> {

    try {
      const param = {
        sid: sid,
        startdate: startdate,
        sname: sname,
        tno: tno,
        coupon: coupon,
        amount: amount,
        tdate: tdate,
        cardid: cardid,
        cardenddate: cardenddate,
        cardtype: cardtype
      }
      const res = await fetch(`${this.ngrokForwarding}/api/add_enroll`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420"
        },
        body: JSON.stringify(param)
      });

      const result = await res.json();
      if (result.success) {
        console.log(`[py api] addEnroll success`);
      } else {
        console.log(`[py api] addEnroll fail, ${result.message}`);
      }
    } catch (error) {
      console.log(`[py api] addEnroll error: ${JSON.stringify(error)}`);
    }
  }

}
