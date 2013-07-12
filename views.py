from flask import render_template, redirect, url_for, abort, request

from app import app, db
from models import Note

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/new')
def new_note():
    note = Note()
    db.session.add(note)
    db.session.commit()
    return redirect(url_for('access_note', note_url=note.url))

@app.route('/n/<note_url>')
def access_note(note_url):
    if Note.note_with_url_exists(note_url):
        note = Note.query.filter(Note.url == note_url).one()
        return render_template('note.html', text=note.text)
    else:
        db.session.add(Note(url=note_url))
        db.session.commit()
        return render_template('note.html')

@app.route('/save', methods=['POST'])
def save_note():
    note = Note.query.filter(Note.url == request.form['note_url']).one()
    note.text = request.form['text']
    db.session.commit()
    return 'Note saved.'