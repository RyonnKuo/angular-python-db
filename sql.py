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
        sql = "SELECT email FROM student"
        return DB.fetchall(sql)

    @staticmethod
    def create_member(input_data):
        sql = 'INSERT INTO student (sid, email, phoneno, name) VALUES (%s, %s, %s, %s)'
        DB.execute_input(sql, (input_data['sid'], input_data['email'], input_data['phoneno'], input_data['name']))


class Admin:
    @staticmethod
    def get_admin(email):
      sql = "SELECT sid, name, email, phoneno FROM admin WHERE email = %s"
      return DB.fetchall(sql, (email,))

    @staticmethod
    def get_all_admin():
        sql = "SELECT email FROM admin"
        return DB.fetchall(sql)
