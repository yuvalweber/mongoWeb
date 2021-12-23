#! /usr/bin/python
from flask import Flask, jsonify,render_template
from mongo_report import report
app = Flask(__name__)

@app.route("/info", methods= ['GET'])
def monitor():
    info = report()
    return jsonify(info=info)

@app.route("/" , methods=['GET'])
def show():
    info = report()
    return render_template("index.html",info=info)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80)
