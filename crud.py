from model import db, User, Event, Guest, connect_to_db

def create_user(email, password):
    """Create and return a new user"""

    user = User(email = email, 
                password = password)

    db.session.add(user)
    db.session.commit()

    return user

def get_user_by_id(user_id):
    """Return a user by id"""

    return User.query.get(user_id)

def get_user_by_email(email):
    """Return a user by email"""

    return User.query.filter(User.email == email).first()

def create_event(user, event_title, description, date):
    """Create and return a new event"""

    event = Event(user = user,
                event_title = event_title,
                description = description,
                date = date)

    db.session.add(event)
    db.session.commit()

    return event
def get_all_events_for_user_id(user_id):

    print(Event.query.filter(Event.user_id == user_id)).all()

def create_guest(event, fname, lname, reply):
    """Create and return a new guest"""
    print("\n\n\n",event, "\n\n\n")

    guest = Guest(event = event,
                fname = fname,
                lname = lname,
                reply = reply)

    db.session.add(guest)
    db.session.commit()

    return guest


