from flask import Flask, render_template, request, flash, session, redirect, jsonify

from model import connect_to_db
import crud
from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "hbprojectgh"
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def homepage():
    """Render hompage"""

    return render_template("index.html")

@app.route('/create_user', methods=['POST'])
def create_user():
   
    email = request.form.get('new_email')
    password = request.form.get('new_password')

    user = crud.create_user(email, password) 

    if user != None:
        return 'account_created'
    else:
        return 'null'
       

@app.route('/validate_user', methods=['POST'])
def user_login():
    

    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email_password(email, password)
  
    if user == None:  
        return 'null'    
    else:
        return jsonify({'user_id': user.user_id, 'email' : user.email}) 


@app.route('/user_homepage', methods=['POST'])
def user_page():

    user_id = request.form.get("user_id") 

    events = crud.get_all_events_for_user_by_id(user_id)

    print("****\n\n\n", events, "****\n\n\n")

    event_lst = []
    for event in events:
        event_lst.append(
                            {
                            'event_title': event.event_title,
                            'description': event.description,
                            'date': event.date
                            }
                        )
  
    event_id_lst = []
    for event in events:
        event_id_lst.append(event.event_id)

    for event_id in event_id_lst:

        guest = crud.get_guest_for_event(event_id)


    print("****\n\n\n", guest, "****\n\n\n")

    return jsonify(event_lst)


@app.route('/make_new_event', methods=['POST'])
def new_event():
    user_id1 = request.form.get("user_id")
    user_id = int(user_id1)
    event_title = request.form.get("event_title")
    description = request.form.get("description")
    date = request.form.get("date")

    event = crud.create_event(user_id, event_title, description, date)
    
    return jsonify(f'/invite/{event.event_id}') 

 


@app.route('/invite/<event_id>', methods=['GET'])
def invite_link(event_id):

    event = crud.get_event_by_id(event_id)
   
    return render_template("new_event.html",
                           event=event)


@app.route('/create_guest', methods=['POST'])
def new_guest_for_specific_event():

    event_id = request.form.get('event_id')
    fname = request.form.get('fname')
    lname = request.form.get('lname')
    reply = request.form.get('reply')

    guest = crud.create_guest(event_id, fname, lname, reply)


    guest = {
        'fname': guest.fname,
        'lname': guest.lname,
    }

    return jsonify(guest)




if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)

