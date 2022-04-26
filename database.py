import sqlite3 as sql


def create():
    connection = sql.connect('database.db')
    print("Table created successfully")
    cursor = connection.cursor()
    shopping_list = [
        ("bread", "bakery", 2, None),
        ("cheese", "dairy", 1, "kg"),
        ("water", "drinks", 6, None),
        ("coffee", "coffee and tea", 1, "kg"),
        ("tea", "coffee and tea", 2, None),
        ("milk", "dairy", 1, "liter"),
        ("tomato", "vegetables", 0.5, "kg"),
        ("apple", "fruits", 0.5, "kg"),
        ("schampoo", "cosmetics", 1, None),
        ("soap", "cosmetics", 1, None)
    ]

    cursor.execute(
        "create table shopping_list (id integer primary key, name text, category text, quantity integer, unit text)")
    cursor.executemany(
        "insert into shopping_list (name, category, quantity, unit) values (?,?,?,?)", shopping_list)
    connection.commit()
