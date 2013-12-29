import os
from flask import Flask, url_for, Response, request, render_template, \
    send_from_directory

app = Flask(__name__)

@app.route('/css/foundation.min.css', methods=['GET'])
@app.route('/js/foundation.min.js', methods=['GET'])
@app.route('/js/jquery.js', methods=['GET'])
@app.route('/js/modernizr.js', methods=['GET'])
@app.route('/js/party.js', methods=['GET'])
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])

@app.route('/')
def index():
    return render_template('index.html')#'Index Page'

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
