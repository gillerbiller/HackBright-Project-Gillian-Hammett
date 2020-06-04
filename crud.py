from model import db, User, Event, Guest, connect_to_db

def create_user(email, password):
    """Create and return a new user"""

    user = User(email = email, 
                password = password)

    db.session.add(user)
    db.session.commit()

    return user

def get_user_by_id(user_id):

    return User.query.get(user_id)

def create_event(user, event_title, description, date):
    """Create and return a new event"""

    event = Event(user = user,
                event_title = event_title,
                description = description,
                date = date)

    db.session.add(event)
    db.session.commit()

    return event

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


