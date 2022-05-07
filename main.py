from flask import Flask,request,render_template

app=Flask(__name__)

debit={}

@app.route("/")
def view_index(): #http://127.0.0.1:5000/

    return render_template("index.html")



@app.route("/debit")
def add_debit(): #http://127.0.0.1:5000/debit?name=m&debit=19
    name=request.form['name']
    debit=request.form['debit']
    # name=request.args["name"]
    # debit=request.args["debit"]
    response=open("templates/index.html").read()
    f = open("DB.txt", "a")
    record=name+" - "+debit
    f.write(record)
    f.close()

    print(name,debit)
    return response

if __name__=="__main__":
    app.run(debug=True)