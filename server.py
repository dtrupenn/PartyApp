import os
from flask import Flask, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return 'Index Page'

@app.route('/about')
def about():
    return 'About Page'

@app.route('/contact')
def contact():
    return 'Contact Page'

#@app.route('/create', methods=['GET', 'POST'])
#def login():
#if request.method == 'POST':
#    create_party()
#else:
#    show_party_page()

@app.route('/party/<int:party_id>')
def show_party(party_id):
    return 'Party %d' % party_id
