from flask import Flask, request, render_template, jsonify
import os
import json

app = Flask(__name__)

database = 'db/db.json'


@app.route("/")
def view_home():
    return render_template("home.html")


@app.route("/request_loan")
def request_loan():  # http://127.0.0.1:5000/

    return render_template("request_loan.html")


@app.route("/view_index")
def view_index():  # http://127.0.0.1:5000/

    return render_template("index.html")


@app.route('/get_debits', methods=["GET"])
def get_debits():
    return jsonify(json.load(open(database, mode="r", encoding="utf-8")))

#
# @app.route("/debit", methods=['POST'])
# def debit():
#     id = request.form['id']
#     name = request.form['name']
#     debit = request.form['debit']
#
#
#     if not id:
#         flash('ID is required!')
#     else:
#         f = open("DB.txt", "a")
#         record = id+" - "+name + " - " + debit
#         f.write(record+"\n")
#         f.close()
#
#         response = open("templates/index.html").read()
#         # f = open("DB.txt", "r")
#         # response = response.replace("{{data}}", f.read())
#
#         print(name, debit)
#     return render_template("index.html")

# CHECK DB IS EMPTY
def empty_data(database):
    return os.path.exists(database) and os.stat(database).st_size == 0


@app.route("/debit", methods=['POST', 'GET'])
def debit():
    id = ''
    name = ''
    debit = ''

    if request.method == "POST":
        if "id" in request.form:
            id = request.form["id"]
        if "name" in request.form:
            name = request.form["name"]
        if "debit" in request.form:
            debit = request.form["debit"]

    isEmpty = empty_data(database)

    if id == '' or name == '' or debit == '':
        pass
    else:

        if isEmpty:

            data = {
                       'id': id,
                       'name': name,
                       'debit': debit
                   },
            exit_file = open(database, "w")
            json.dump(data, exit_file, indent=3)
            exit_file.close()

        else:

            def saveJson(data, database='db/db.json'):
                with open(database, 'r+') as db:
                    json_data = json.load(db)
                    json_data.append(data)
                    db.seek(0)
                    json.dump(json_data, db, indent=3)

            data = {
                'id': id,
                'name': name,
                'debit': debit
            }

            saveJson(data)

    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)
