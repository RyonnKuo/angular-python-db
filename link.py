import psycopg2

connection = psycopg2.connect(
    user='project_1',
    password='xxxxxx',
    host='xxx.xxx.xx.xx',
    port='xxxx',
    dbname='project_1'  # PostgreSQL 的資料庫名稱
)
cursor = connection.cursor()

