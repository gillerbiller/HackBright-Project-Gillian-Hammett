from model import db, User, Event, Guest, connect_to_db


def create_user(email, password):
    """Create and return a new user"""

    check_user_in_db = User.query.filter(User.email == email, \
                                       User.password == password).first()

    user = User(email = email, 
                password = password)

    if check_user_in_db == None:

        db.session.add(user)
        db.session.commit()

        return user
        
    else:
        return None


def get_user_by_id(user_id):
    """Return a user by id"""

    return User.query.get(user_id)

def get_user_by_email_password(email, password):
    """Return a user by email and password"""

    user = User.query.filter(User.email == email, User.password == password).first()

    if user == None:
        return None
    else:
        return user

def create_event(user_id, event_title, description, date):
    """Create and return a new event"""

    event = Event(user_id = user_id,
                event_title = event_title,
                description = description,
                date = date)

    db.session.add(event)
    db.session.commit()

    return event

def get_all_events_for_user_by_id(user_id):
    """Return all events for a user"""

    user = User.query.get(user_id)

    return user.events

def get_event_by_id(event_id):
    """Return event by id"""

    event = Event.query.get(event_id)

    return event

def create_guest(event_id, fname, lname, reply):
    """Create and return a new guest"""

    guest = Guest(event_id = event_id,
                fname = fname,
                lname = lname,
                reply = reply)

    db.session.add(guest)
    db.session.commit()

    return guest

def get_guest_for_event(event_id):
    """Return all guests for a specific"""

    event = Event.query.get(event_id)

    return event.guests

