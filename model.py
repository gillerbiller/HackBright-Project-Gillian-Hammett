
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    """A user of event creation app"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        autoincrement = True,
                        nullable = False,
                        primary_key = True)

    email = db.Column(db.String,
                    unique = True,
                    nullable = False)

    password = db.Column(db.String,
                        nullable = False)

    def __repr__(self):
        return f"<User user_id = {self.user_id} email = {self.email}>"

class Event(db.Model):
    """An event created by a user"""

    __tablename__ = "events"

    event_id = db.Column(db.Integer,
                        autoincrement = True,
                        nullable = False,
                        primary_key = True)

    event_title = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    date = db.Column(db.DateTime)
    description = db.Column(db.Text)

    user = db.relationship('User', backref = 'events')
   

    def __repr__(self):

        return f"<Event event_id = {self.event_id}, event_title = {self.event_title}, \
Hosted by user_id = {self.user_id} in db>"

class Guest(db.Model):
    """A guest invited to a event"""

    __tablename__ = "guests"

    guest_id = db.Column(db.Integer,
                        autoincrement = True,
                        nullable = False,
                        primary_key = True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'))
    guest_fname = db.Column(db.String)
    guest_lname = db.Column(db.String)
    guest_reply = db.Column(db.Integer) 

    event = db.relationship('Event', backref = 'guests')

    def __repr__(self):

        return f"<Guest guest_id = {self.guest_id}, guest_fname = {self.guest_fname}, \
guest_lname = {self.guest_lname}, event_id = {self.event_id}, \
guest_reply = {self.guest_reply}>"



def connect_to_db(flask_app, db_uri='postgresql:///eventsite', echo = True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')

if __name__ == '__main__':
    from server import app
    connect_to_db(app)