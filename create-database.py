import sqlite3 as sql
from flask import Flask, jsonify
app = Flask(__name__)

connection = sql.connect('database.db')
print("Table created successfully")
cursor = connection.cursor()

shopping_list = [
    (1, "bread", "bakery", 2, None),
    (2, "cheese", "dairy", 1, "kg"),
    (3, "water", "drinks", 6, None),
    (4, "coffee", "coffee and tea", 1, "kg"),
    (5, "tea", "coffee and tea", 2, None),
    (6, "milk", "dairy", 1, "liter"),
    (7, "tomato", "vegetables", 0.5, "kg"),
    (8, "apple", "fruits", 0.5, "kg"),
    (9, "schampoo", "cosmetics", 1, None),
    (10, "soap", "cosmetics", 1, None)
]

cursor.execute(
    "create table shopping_list (id integer auto_increment primary key, name text, category text, quantity integer, unit text)")
cursor.executemany(
    "insert into shopping_list values (?,?,?,?,?)", shopping_list)
connection.commit()
