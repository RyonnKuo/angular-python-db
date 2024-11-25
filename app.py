import re, os, random, string
from typing_extensions import Self
from flask import Flask, request, template_rendered, Blueprint, url_for, redirect, flash, render_template, jsonify
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from datetime import datetime
from numpy import identity, product
from sqlalchemy import null
# from api.api import *
# from api.sql import *
# from bookstore.views.store import *
# from backstage.views.analysis import *
# from backstage.views.manager import *
from link import *
from sql import *
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
@app.route('/api/data', methods=['GET', 'HEAD'])
def get_data():
    # data = {
    #     'title': 'Welcome to Angular-Python App',
    #     'message': 'This is an example integration between Angular and Python!'
    # }
    data = Member.get_all_account()
    print('get_data is called' f"{type(data)}")
    return jsonify(data)

@app.route('/api/student_register', methods=['POST', 'GET'])
def student_register():
  if request.method == 'POST':
    data = request.json
    user_email = data.get('email')
    user_phoneno = data.get('phoneno')
    user_name = data.get('name')

    exist_account = Student.get_all_student()
    length = len(exist_account)


    account_list = []
    for i in exist_account:
        account_list.append(i[0])

    if(user_email in account_list):
        flash('已有相同email!')
        return jsonify({"success": False, "message": "已有相同 email!"}), 400
    else:
        user_sid = length + 1
        input = {
                  'sid': user_sid,
                  'email': user_email,
                  'phoneno': user_phoneno,
                  'name': user_name
          }
        Student.create_member(input)
        return jsonify({"success": True, "message": "註冊成功！"}), 200


# Student
@app.route('/api/get_all_student', methods=['GET', 'HEAD'])
def get_all_student():
    data = Student.get_all_student()
    print('get_data is called' f"{type(data)}")
    return jsonify(data)

@app.route('/api/get_student', methods=['POST', 'GET'])
def get_student():
    reqData = request.json
    email = reqData.get('email')
    data = Student.get_student(email)
    print('get_student is called' f"{type(data)}")
    return jsonify(data)

# admin
@app.route('/api/get_all_admin', methods=['GET', 'HEAD'])
def get_all_admin():
    data = Admin.get_all_admin()
    print('get_all_admin is called' f"{type(data)}")
    return jsonify(data)

@app.route('/api/get_admin', methods=['POST', 'GET'])
def get_admin():
    reqData = request.json
    email = reqData.get('email')
    data = Admin.get_admin(email)
    print('get_admin is called' f"{type(data)}")
    return jsonify(data)

#session
@app.route('/api/get_all_session', methods=['GET', 'HEAD'])
def get_all_session():
    data = Session.get_all_session()
    print('get_all_session is called' f"{type(data)}")
    return jsonify(data)

@app.route('/api/update_session', methods=['POST', 'GET'])
def update_session():
    if request.method == 'POST':
      reqData = request.json
      cid = reqData.get('cid')
      sdesc = reqData.get('sdesc')
      enddate = reqData.get('enddate')
      price = reqData.get('price')
      startdate = reqData.get('startdate')
      sname = reqData.get('sname')
      input = {
                  'cid': cid,
                  'sdesc': sdesc,
                  'enddate': enddate,
                  'price': price,
                  'startdate': startdate,
                  'sname': sname
          }

      data = Session.update_session(input)
      print('update_session is called, sid = ' f"{type(data)}")
      return jsonify(data)

@app.route('/api/delete_session', methods=['POST', 'GET'])
def delete_session():
    if request.method == 'POST':
      reqData = request.json
      cid = reqData.get('cid')
      startdate = reqData.get('startdate')
      sname = reqData.get('sname')
      input = {
                  'cid': cid,
                  'startdate': startdate,
                  'sname': sname
          }

      data = Session.delete_session(input)
      print('delete_session is called, sid = ' f"{type(data)}")
      return jsonify(data)

@app.route('/api/create_session', methods=['POST', 'GET'])
def create_session():
    if request.method == 'POST':
      reqData = request.json
      cid = reqData.get('cid')
      startdate = reqData.get('startdate')
      sname = reqData.get('sname')
      sdesc = reqData.get('sdesc')
      enddate = reqData.get('enddate')
      price = reqData.get('price')
      input = {
                  'cid': cid,
                  'startdate': startdate,
                  'sname': sname,
                  'sdesc': sdesc,
                  'enddate': enddate,
                  'price': price
          }

      data = Session.create_session(input)
      print('get_enroll is called, sid = ' f"{type(data)}")
      return jsonify(data)

#enroll
@app.route('/api/get_all_enroll', methods=['GET', 'HEAD'])
def get_all_enroll():
    data = Enroll.get_all_enroll()
    print('get_data is called' f"{type(data)}")
    return jsonify(data)

@app.route('/api/get_enroll', methods=['POST', 'GET'])
def get_enroll():
  if request.method == 'POST':
    reqData = request.json
    sid = reqData.get('sid')
    data = Enroll.get_enroll(sid)
    print('get_enroll is called, sid = ' f"{type(data)}")
    return jsonify(data)

@app.route('/api/add_enroll', methods=['POST', 'GET'])
def add_enroll():
  if request.method == 'POST':
    reqData = request.json
    sid = reqData.get('sid')
    startdate = reqData.get('startdate')
    sname = reqData.get('sname')
    tno = reqData.get('tno')
    coupon = reqData.get('coupon')
    amount = reqData.get('amount')
    tdate = reqData.get('tdate')
    cardid = reqData.get('cardid')
    cardenddate = reqData.get('cardenddate')
    cardtype = reqData.get('cardtype')
    input = {
              'sid': sid,
              'startdate': startdate,
              'sname': sname,
              'tno': tno,
              'coupon': coupon,
              'amount': amount,
              'tdate': tdate,
              'cardid': cardid,
              'cardenddate': cardenddate,
              'cardtype': cardtype
          }
    data = Enroll.add_enroll(input)
    print('add_enroll is called, sid = ' f"{type(data)}")
    return jsonify({"success": True, "message": "報名成功！"}), 200

app.secret_key = 'Your Key'

if __name__ == '__main__':
    app.debug = True
    app.secret_key = "Your Key"
    app.run(host='127.0.0.1', port = 5000)
