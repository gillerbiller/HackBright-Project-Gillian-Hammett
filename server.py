from flask import Flask, render_template, request, flash, session, redirect

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

    return render_template("hompage.html")

@app.route('/create_user', methods=['POST'])
def create_user():
    """Create new user"""

    email = request.form.get('email')
    password = request.form.get('password')

    user = crud.get_user_by_email(email)

    if user:
        flash('User email and or password already has an account.\
Please login or try again.')

    else:
        user = crud.create_user(email, password)
        flash('Account created, please login')

    return redirect('/')    

@app.route('/user_homepage', methods=['POST'])
def user_login():
    """Allow existing user to login"""

    #return render_template('user_homepage.html')

    email = request.form.get('email')
    password = request.form.get('password')

    user = crud.get_user_by_email(email)

    if user:
        return render_template('user_homepage.html', user=user)     
    else:
        flash('No account linked to that email or password. Please create\
an account or try your login again.')

        return redirect('/')





if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)