import os
import json
from random import choice, randint
from datetime import datetime

import crud
import model
import server

os.system('dropdb eventsite')
os.system('createdb eventsite')

model.connect_to_db(server.app)
model.db.create_all()

test_event_titles = {"My 32nd Birthday!": "Come celebrate me making it 32 years!",
                    "Remote Rave":"Dance it up during quarantine with other pods\
all over the world in this remote rave! Even apart, music brings us together.",
                    "Moving to Organ a Farwell":"I'm moving! Come send me off with \
a bang!",
                    "Graduation Party":"HackBright graduation party!!!!",
                    "Movie night: The Story of O":"Come watch this facinating French \
film with wine and small bites",
                    "Hicking Trip":"Parks are open, lets get out in nature!",
                    "Beach Day":"OMG Halfmoon bay is open! Come chill with me by \
the waves.",
                    "Moive night: The people under the staris":"Old horor film \
if you can take the spook come grab a pillow and lets jump scream together.",
                    "Bacheloret Party!":"I'm getting married! Come celebrate with \
me prior to the day. Pole dancing, drinking, dancing, let's party!",
                    "Bachelor Party!":"I'm getting married! Come celebrate with \
me prior to the day."}

random_dates = ['01-20-2020', '02-01-2020', '03-29-2020', '04-08-2020',
        '11-05-2020', '07-17-2020', '12-12-2020', '10-31-2020', '05-24-2020', 
        '06-30-2020']

random_names = {
    "Liam": "L.", 
    "Daniel":"K.",
    "Ella": "J.",
    "Avery": "I.",
    "Jackson": "H.",
    "Sofia": "G.",
    "Sebastian":"F.",
    "Camila": "E.",
    "Aiden":"D.",
    "Aria":"C.",
    "Matthew": "B.",  
    "Scarlett": "A."   
}

for number in range(10):#test user loop
    email = f"user{number}@test.com"
    password = f"testing{number}"

    user = crud.create_user(email, password)

    for _ in range (2): #Events linked to a user

        event_title = choice(list(test_event_titles))
    
        description = test_event_titles.get(event_title)

        date_selection = choice(random_dates)

        date = datetime.strptime(date_selection, '%b-%d-%Y')
    
        event = crud.create_event(user, event_title, description, date)
 
        for _ in range(10):#Guest data loop supposed to link to an event 

            fname = choice(list(random_names))

            lname = random_names.get(fname)

            reply = randint(0,2)

            crud.create_guest(event, fname, lname, reply)


