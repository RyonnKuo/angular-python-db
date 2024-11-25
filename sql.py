from typing import Optional
import psycopg2
from psycopg2 import pool

class DB:
    connection_pool = pool.SimpleConnectionPool(
        1, 100,  # 最小和最大連線數
        user='project_1',
        password='xxxxxx',
        host='xxx.xxx.xx.xx',
        port='xxxx',
        dbname='project_1'
    )

    @staticmethod
    def connect():
        return DB.connection_pool.getconn()

    @staticmethod
    def release(connection):
        DB.connection_pool.putconn(connection)

    @staticmethod
    def execute_input(sql, input):
        if not isinstance(input, (tuple, list)):
            raise TypeError(f"Input should be a tuple or list, got: {type(input).__name__}")
        connection = DB.connect()
        try:
            with connection.cursor() as cursor:
                cursor.execute(sql, input)
                connection.commit()
        except psycopg2.Error as e:
            print(f"Error executing SQL: {e}")
            connection.rollback()
            raise e
        finally:
            DB.release(connection)

    @staticmethod
    def execute(sql):
        connection = DB.connect()
        try:
            with connection.cursor() as cursor:
                cursor.execute(sql)
        except psycopg2.Error as e:
            print(f"Error executing SQL: {e}")
            connection.rollback()
            raise e
        finally:
            DB.release(connection)

    @staticmethod
    def fetchall(sql, input=None):
        connection = DB.connect()
        try:
            with connection.cursor() as cursor:
                cursor.execute(sql, input)
                return cursor.fetchall()
        except psycopg2.Error as e:
            print(f"Error fetching data: {e}")
            raise e
        finally:
            DB.release(connection)

    @staticmethod
    def fetchone(sql, input=None):
        connection = DB.connect()
        try:
            with connection.cursor() as cursor:
                cursor.execute(sql, input)
                return cursor.fetchone()
        except psycopg2.Error as e:
            print(f"Error fetching data: {e}")
            raise e
        finally:
            DB.release(connection)

class Member:
    @staticmethod
    def get_member(account):
        sql = "SELECT account, password, mid, identity, name FROM member WHERE account = %s"
        return DB.fetchall(sql, (account,))

    @staticmethod
    def get_all_account():
        sql = "SELECT account FROM member"
        return DB.fetchall(sql)

class Student:
    @staticmethod
    def get_student(email):
      sql = "SELECT sid, name, email, phoneno FROM student WHERE email = %s"
      return DB.fetchall(sql, (email,))

    @staticmethod
    def get_all_student():
        sql = "SELECT sid, name, email, phoneno FROM student"
        return DB.fetchall(sql)

    @staticmethod
    def create_member(input_data):
        sql = 'INSERT INTO student (sid, email, phoneno, name) VALUES (%s, %s, %s, %s)'
        DB.execute_input(sql, (input_data['sid'], input_data['email'], input_data['phoneno'], input_data['name']))


class Admin:
    @staticmethod
    def get_admin(email):
      sql = "SELECT aid, cid, name, email, phoneno FROM admin WHERE email = %s"
      return DB.fetchall(sql, (email,))

    @staticmethod
    def get_all_admin():
      sql = "SELECT aid, cid, name, email, phoneno FROM admin"
      return DB.fetchall(sql)

class Session:
    @staticmethod
    def get_all_session():
      sql = "SELECT cid, startdate, sname, sdesc, enddate, price FROM session"
      return DB.fetchall(sql)

    @staticmethod
    def update_session(input_data):
        sql = 'UPDATE session SET cid = %s, sdesc = %s, enddate = %s, price = %s WHERE startdate = %s and sname = %s'
        DB.execute_input(sql, (input_data['cid'], input_data['sdesc'], input_data['enddate'], input_data['price'], input_data['startdate'], input_data['sname']))

    @staticmethod
    def delete_session(input_data):
      sql = 'DELETE FROM session WHERE cid = %s and startdate = %s and sname = %s'
      DB.execute_input(sql, (input_data['cid'], input_data['startdate'], input_data['sname']))

    @staticmethod
    def create_session(input_data):
        sql = 'INSERT INTO session (cid, startdate, sname, sdesc, enddate, price) VALUES (%s, %s, %s, %s, %s, %s)'
        DB.execute_input(sql, (input_data['cid'], input_data['startdate'], input_data['sname'], input_data['sdesc'], input_data['enddate'], input_data['price']))

class Enroll:
    @staticmethod
    def get_all_enroll():
      sql = "SELECT sid, startdate, sname, tno, coupon, amount, tdate, cardid, cardenddate, cardtype FROM enroll"
      return DB.fetchall(sql)

    @staticmethod
    def get_enroll(sid):
      sql = "SELECT sid, startdate, sname, tno, coupon, amount, tdate, cardid, cardenddate, cardtype FROM enroll WHERE sid = %s"
      return DB.fetchall(sql, (sid,))

    @staticmethod
    def add_enroll(input_data):
      sql = 'INSERT INTO enroll (sid, startdate, sname, tno, coupon, amount, tdate, cardid, cardenddate, cardtype) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
      DB.execute_input(sql, (input_data['sid'], input_data['startdate'], input_data['sname'], input_data['tno'], input_data['coupon'], input_data['amount'], input_data['tdate'], input_data['cardid'], input_data['cardenddate'], input_data['cardtype']))

class Course:
  @staticmethod
  def create_course(input_data):
      sql = 'INSERT INTO course (cid, sid, cname) VALUES (%s, %s, %s)'
      DB.execute_input(sql, (input_data['cid'], input_data['sid'], input_data['cname']))

  @staticmethod
  def delete_course(cid):
      sql = 'DELETE FROM course WHERE cid = %s'
      DB.execute_input(sql, (cid))

  @staticmethod
  def update_session(input_data):
      sql = 'UPDATE course SET sid = %s, cname = %s WHERE cid = %s'
      DB.execute_input(sql, (input_data['sid'], input_data['cname'], input_data['cid']))
