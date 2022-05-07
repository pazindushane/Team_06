from flask import Flask, request, render_template

app=Flask(__name__)

debit={}

@app.route("/")
def view_index(): #http://127.0.0.1:5000/

    return render_template("index.html")



@app.route("/debit",methods=['POST'])
def debit(): #http://127.0.0.1:5000/debit?name=m&debit=19
    name=request.form['name']
    debit=request.form['debit']
    # name=request.args["name"]
    # debit=request.args["debit"]
    response=open("templates/index.html").read()
    f = open("DB.txt", "a")
    record=name+" - "+debit
    f.write(record)
    f.close()

    f = open("DB.txt", "r")
    response=response.replace("{{data}}",f.read())

    print(name,debit)
    return response


@app.route("/new_calc/<number_one>/<number_two>")
def new_calc(number_one, number_two):
    result_calc = int(number_one) + int(number_two)
    return f"{result_calc}"

if __name__=="__main__":
    app.run(debug=True)