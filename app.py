from flask import Flask, render_template
import random
app = Flask(__name__)

@app.route('/')

@app.route('/home')
def home():
    scan=open("sentences.txt")
    list=scan.read().splitlines()
    text=random.choice(list)
    return render_template('home.html', sentence=text)

@app.route('/about')
def about():
    return render_template('about.html')

if __name__=='__main__':
    app.run(debug=True)
