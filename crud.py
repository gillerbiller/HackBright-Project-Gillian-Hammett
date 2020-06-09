from model import db, User, Event, Guest, connect_to_db


def create_user(email, password):
    """Create and return a new user"""

    check_user_in_db = User.query.filter(User.email == email, \
                                        User.password == password).first()

    print("*****\n\n\n\n",check_user_in_db,"\n\n\n\n*****")

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

    #return User.query.filter(User.email == email, User.password == password).first()

def create_event(user, event_title, description, date):
    """Create and return a new event"""

    event = Event(user = user,
                event_title = event_title,
                description = description,
                date = date)

    db.session.add(event)
    db.session.commit()

    return event

def get_all_events_for_user_by_id(user_id):

    user = User.query.get(user_id)

    return user.events

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


