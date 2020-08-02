from flask import Flask, render_template
import random
app = Flask(__name__)

@app.route('/')

@app.route('/home')
def home():
    scan=open("sentences.txt")
    list=scan.readlines()
    text=random.choice(list)
    print("hello")
    return render_template('home.html',sentence=text)

@app.route('/hello')
def hello_world():
    return 'Hello, World'

if __name__=='__main__':
    app.run(debug=True)