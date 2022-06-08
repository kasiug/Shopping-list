from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import sqlite3 as sql
from database import create
import os

app = Flask(__name__)
CORS(app)

if os.stat("database.db").st_size == 0:
    create()

@app.route('/shopping-list', methods=['GET'])
@cross_origin()
def shoppingList():
    con = sql.connect("database.db")
    con.row_factory = sql.Row

    cur = con.cursor()
    cur.execute("select * from shopping_list")

    rows = cur.fetchall()
    data = []
    columnNames = [column[0] for column in cur.description]

    for row in rows:
        data.append(dict(zip(columnNames, row)))  # or simply data.append(list(row))
    return jsonify(data)



@app.route('/shopping-list/<id>', methods=['GET'])
@cross_origin()
def shoppingItem(id):
    con = sql.connect("database.db")
    con.row_factory = sql.Row

    cur = con.cursor()
    cur.execute("select * from shopping_list where id=?", (id,))

    rows = cur.fetchall()
    data = []
    columnNames = [column[0] for column in cur.description]

    for row in rows:
        data.append(dict(zip(columnNames, row)))  # or simply data.append(list(row))
    return jsonify(data)


@app.route('/shopping-list/<id>', methods=['DELETE'])
@cross_origin()
def deleteShoppingItem(id):
    con = sql.connect("database.db")
    con.row_factory = sql.Row

    cur = con.cursor()
    cur.execute("delete from shopping_list where id=?", (id,))
    con.commit()
    return ""

@app.route('/shopping-list/add', methods=['POST'])
@cross_origin()
def addShoppingItem():
    con = sql.connect("database.db")
    con.row_factory = sql.Row

    name = request.form['name']
    category = request.form['category']
    quantity = request.form['quantity']
    unit = request.form['unit']

    cursor = con.cursor()

    cursor.execute(
        "insert into shopping_list (name,category,quantity,unit) values (?,?,?,?)", (name, category, quantity, unit))
    con.commit()
    return str(cursor.lastrowid)

@app.route('/shopping-list/<id>', methods=['PUT'])
@cross_origin()
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
