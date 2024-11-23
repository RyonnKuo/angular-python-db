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

@app.route('/api/get_student', methods=['GET', 'HEAD'])
def get_student():
    email = request.form['email']
    data = Student.get_student(email)
    print('get_data is called' f"{type(data)}")
    return jsonify(data)

# admin
@app.route('/api/get_all_admin', methods=['GET', 'HEAD'])
def get_all_admin():
    data = Admin.get_all_admin()
    print('get_data is called' f"{type(data)}")
    return jsonify(data)

@app.route('/api/get_admin', methods=['GET', 'HEAD'])
def get_admin():
    email = request.form['email']
    data = Admin.get_admin(email)
    print('get_data is called' f"{type(data)}")
    return jsonify(data)

app.secret_key = 'Your Key'

if __name__ == '__main__':
    app.debug = True
    app.secret_key = "Your Key"
    app.run(host='127.0.0.1', port = 5000)
