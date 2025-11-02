from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE_NAME = 'database.db'


# Helper funtion for creating the users table. Call the function at the bottom of the code.
def create_users_table():
    """Create the 'users' table if it doesn't exist"""
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()

    create_table_query = '''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            surname TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            count INTEGER NOT NULL
        )
    '''
    cursor.execute(create_table_query)
    conn.commit()
    conn.close()


# Helper funtion for deleting the users table. Call the function at the bottom of the code.
def delete_users_table():
    """Delete the 'users' table"""
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()

    delete_table_query = '''
        DROP TABLE IF EXISTS users
    '''
    cursor.execute(delete_table_query)
    conn.commit()
    conn.close()


@app.route("/add_user_form", methods=["POST"])
def add_user_form():
    """Add a new user to the 'users' table"""
    name = request.json["name"]
    surname = request.json["surname"]
    email = request.json["email"]
    initial_count = 1

    try:
        # Connect to the database
        conn = sqlite3.connect(DATABASE_NAME)
        cursor = conn.cursor()

        # Insert user data into the 'users' table
        insert_query = '''
            INSERT INTO users (name, surname, email, count)
            VALUES (?, ?, ?, ?)
        '''
        cursor.execute(insert_query, (name, surname, email, initial_count))
        conn.commit()

        conn.close()

        # Return response indicating success and the inserted user's data
        response = {
            "success": True,
            "message": f"User {name} {surname} with email {email} added to the 'users' table"
        }
        return jsonify(response)

    except sqlite3.IntegrityError:
        conn.close()
        # Return response indicating failure
        response = {
            "success": False,
            "message": f"User with email {email} already exists"
        }
        return jsonify(response)
    

@app.route("/get_all_users", methods=["GET"])
def get_all_users():
    """Get all users from the 'users' table"""
    try:
        # Connect to the database
        conn = sqlite3.connect(DATABASE_NAME)
        cursor = conn.cursor()

        # Retrieve all users from the 'users' table
        select_query = '''
            SELECT * FROM users
        '''

        cursor.execute(select_query)
        users = cursor.fetchall()

        conn.close()

        users_list = []
        for user in users:
            user_dict = {
                "id": user[0],
                "name": user[1],
                "surname": user[2],
                "email": user[3],
                "count": user[4]
            }
            users_list.append(user_dict)

        response = {
            "succes": True,
            "users": users_list
        }

        return jsonify(response)

    except:
        # Return response indicating failure
        response = {
            "success": False,
            "message": "Failed to retrieve users"
        }
        return jsonify(response)


@app.route("/get_current_user", methods=["POST"])
def get_current_user():
    """Get user with a given ID"""
    user_id = request.json["user_id"]

    try:
        # Connect to the database
        conn = sqlite3.connect(DATABASE_NAME)
        cursor = conn.cursor()

        # Retrieve the current user from the 'users' table
        select_query = '''
            SELECT * FROM users WHERE id = ?
        '''

        cursor.execute(select_query, (user_id,))
        user = cursor.fetchone()

        conn.close()

        user_dict = {
            "id": user[0],
            "name": user[1],
            "surname": user[2],
            "email": user[3],
            "count": user[4]
        }

        response = {
            "success": True,
            "user": user_dict
        }

        return jsonify(response)

    except:
        # Return response indicating failure
        response = {
            "success": False,
            "message": "Failed to retrieve the current user"
        }
        return jsonify(response)


@app.route("/update_counter", methods=["POST"])
def update_counter():
    """Update user counter"""
    user_id = request.json["user_id"]
    change_counter = request.json["changeCounter"]

    try:
        # Connect to the database
        conn = sqlite3.connect(DATABASE_NAME)
        cursor = conn.cursor()

        # Retrieve the current count from the database
        select_query = '''
            SELECT count FROM users WHERE id = ?
        '''
        cursor.execute(select_query, (user_id,))
        current_counter = cursor.fetchone()[0]

        # Calculate the new count based on the change_counter
        new_counter = current_counter + change_counter

        # Update the count in the database
        update_query = '''
            UPDATE users SET count = ? WHERE id = ?
        '''
        cursor.execute(update_query, (new_counter, user_id))
        conn.commit()

        # Close the database connection
        conn.close()

        # Return response indicating success
        response = {
            "success": True,
            "message": "User count was updated"
        }
        return jsonify(response)

    except Exception as e:
        # Handle specific exceptions and provide error details
        response = {
            "success": False,
            "message": f"Failed to update the current user counter: {str(e)}"
        }
        return jsonify(response)


if __name__ == "__main__":
    create_users_table()  # Create the 'users' table if it doesn't exist
    #delete_users_table() # Delete the 'users' table if it exists
    app.run()
