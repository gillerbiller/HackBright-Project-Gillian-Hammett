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

test_event_info =[ 

{
    'event_title': "My 32nd Birthday!",
    'date': 'Jan-20-2020',
    'description': "Come celebrate me making it 32 years!"
},
{
    'event_title': "Remote Rave",
    'date': 'Mar-29-2020',
    'description':  "Dance it up during quarantine with other pods\
all over the world in this remote rave! Even apart, music brings us together."
},
{
    'event_title': "Moving to Organ a Farwell",
    'date': 'Dec-12-2020',
    'description':  "I'm moving! Come send me off with a bang!"
},
{
    'event_title': "Graduation Party",
    'date': 'Jul-17-2020',
    'description': "HackBright graduation party!!!!"
},
{
    'event_title': "Movie night: The Story of O",
    'date': 'Oct-31-2020',
    'description': "Come watch this facinating French film with wine \
and small bites"
},
{
    'event_title':  "Hiking Trip",
    'date': 'Jun-30-2020',
    'description': "Parks are open, lets get out in nature!"
},
{
    'event_title': "Beach Day",
    'date': 'Nov-05-2020',
    'description': "OMG Halfmoon bay is open! Come chill with me by \
the waves."
},
{
    'event_title': "Moive night The people under the staris",
    'date': 'May-24-2020',
    'description': "Old horor film if you can take the spook come grab a \
pillow and lets jump scream together."
},
{
    'event_title': "Bacheloret Party!",
    'date': 'Apr-08-2020',
    'description': "I'm getting married! Come celebrate with \
me prior to the day. Pole dancing, drinking, dancing, let's party!"
},
{
    'event_title':  "Bachelor Party!",
    'date': 'Apr-08-2020',
    'description':  "I'm getting married! Come celebrate with \
me prior to the day."
},
]

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
    password = f"test{number}"

    user_id = crud.create_user(email, password)

    for _ in range (2): #Events linked to a users

        test_event = choice(test_event_info)

        event_title = test_event.get('event_title')
    
        description = test_event.get('description')

        date_string = test_event.get('date')

        date = datetime.strptime(date_string, '%b-%d-%Y')
    
        event_id = crud.create_event(user_id, event_title, description, date)
 
        for _ in range(5):#Guest data loop supposed to link to an event 

            fname = choice(list(random_names))

            lname = random_names.get(fname)

            reply = randint(0,2)

            crud.create_guest(event_id, fname, lname, reply)


