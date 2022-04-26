from colorama import Cursor
from flask import Flask, jsonify, request
# from flask_cors import CORS
import sqlite3 as sql
from database import create
import os

app = Flask(__name__)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

if os.stat("database.db").st_size == 0:
    create()


@app.route('/shopping-list', methods=['GET'])
def shoppingList():
    con = sql.connect("database.db")
    con.row_factory = sql.Row

    cur = con.cursor()
    cur.execute("select * from shopping_list")

    rows = cur.fetchall()
    data = []
    for row in rows:
        data.append([x for x in row])  # or simply data.append(list(row))
    return jsonify(data)


@app.route('/shopping-list/<id>', methods=['GET'])
def shoppingItem(id):
    con = sql.connect("database.db")
    con.row_factory = sql.Row

    cur = con.cursor()
    cur.execute("select * from shopping_list where id=?", (id,))

    rows = cur.fetchall()
    data = []
    for row in rows:
        data.append([x for x in row])  # or simply data.append(list(row))
    return jsonify(data)


@app.route('/shopping-list/<id>', methods=['DELETE'])
def deleteShoppingItem(id):
    con = sql.connect("database.db")
    con.row_factory = sql.Row

    cur = con.cursor()
    cur.execute("delete from shopping_list where id=?", id)
    con.commit()
    return id


@app.route('/shopping-list/add', methods=['POST'])
def addShoppingItem():
    con = sql.connect("database.db")
    con.row_factory = sql.Row

    id = request.form['id']
    name = request.form['name']
    category = request.form['category']
    quantity = request.form['quantity']
    unit = request.form['unit']

    cursor = con.cursor()

    cursor.execute(
        "insert into shopping_list (id,name,category,quantity,unit) values (?,?,?,?,?)", (id, name, category, quantity, unit))
    con.commit()
    return id


@app.route('/shopping-list/<id>', methods=['PUT'])
def updateShoppingItem(id):
    con = sql.connect("database.db")
    con.row_factory = sql.Row

    name = request.form['name']
    category = request.form['category']
    quantity = request.form['quantity']
    unit = request.form['unit']

    cursor = con.cursor()

    cursor.execute(
        "update shopping_list set name=?, category=?, quantity=?, unit=? where id=?", (name, category, quantity, unit, id))
    con.commit()
    return id


app.run(port=3000)
