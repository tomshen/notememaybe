from app import db
from util import generate_url

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, unique=True)
    text = db.Column(db.Text)

    @staticmethod
    def note_with_url_exists(url):
        return Note.query.filter(Note.url == url).scalar()

    def __init__(self, url=None):
        if url:
            if Note.note_with_url_exists(url):
                raise ValueError('Note with that URL already exists.')                
            else:
                self.url = url
        else:
            self.url = generate_url()
            while Note.note_with_url_exists(self.url):
                self.url = generate_url()
        self.text = ''

    def __repr__(self):
        return '<Note %r>' % self.url