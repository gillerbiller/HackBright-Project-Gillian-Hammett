from flask import Flask, render_template, request, flash, session, redirect, jsonify

from model import connect_to_db

import crud

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "hbprojectgh"
app.jinja_env.undefined = StrictUndefined

"""Routes go here"""

@app.route('/')
def homepage():
    """Render hompage"""

    return render_template("index.html")

@app.route('/create_user', methods=['POST'])
def create_user():
    """Create new user"""

    email = request.form.get('new_email')
    password = request.form.get('new_password')

    user = crud.create_user(email, password) 

    print("*****\n\n\n\n",user,"\n\n\n\n*****")

    if user != None:
        return 'account_created'
    else:
        return 'null'
       

@app.route('/validate_user', methods=['POST'])
def user_login():
    """Allow existing user to login"""

    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email_password(email, password)
  
    if user == None:  
        return 'null'    
    else:
        return jsonify({'user_id': user.user_id, 'email' : user.email}) 


@app.route('/user_homepage', methods=['POST'])
def user_page():

    user_id = user_id

    print("****\n\n\n\n",user_id,"****\n\n\n")

    events = crud.get_all_events_for_user_by_id(user_id)

    event_lst = []
    for event in events:
        event_lst.append(
                            {
                            'event_title': event.event_title,
                            'description': event.description,
                            'date': event.date
                            }
                        )

    return jsonify(event_lst)

@app.route('/make_new_event', methods=['POST'])
def new_event():
    #user_id = request from session?
    event_title = request.form.get("event_title")
    description = request.form.get("description")
    date = request.form.get("date")

    new_event = crud.create_event(user_id, event_title, description, date)

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)