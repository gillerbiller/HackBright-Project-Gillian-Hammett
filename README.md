## Contents
* [About Me](#about)
* [Tech Stack](#tech-stack)
* [Link to video demo of project](#demo)
* [Features](#features)
* [Possible Future Development](#future)
* [Installation](#installation)


## <a name=about></a>About Me
Gillian became a student at HackBright to sharpen her skills and actualize her dream of becoming a software engineer. She feel in love with solving puzzle like problems as an undergrad studying Kinesiology. Her passion for puzzles persists even as she has transitioned into the tech industry through support work. Gillian has worked closely with software engineers to improve the products and services of the companies she has worked for. She began asking software engineers she worked with or new questions about their work and the software engineering career as a whole. Over time Gillian made the decision to become a software engineer and use her skills to support companies in their goals of solving problems that improve lives through programming.


## <a name="tech-stack"></a>Technologies
* Python
* Flask
* Jinja2
* PostgresQL
* SQLAlchemy
* HTML
* CSS
* Bootstrap
* Bootstrap Datepicker 
* jQuery/AJAX

## <a name="demo"></a> Video Demo of site
[Youtube link to site demo](https://www.youtube.com/watch?v=p59LmqY-a3c&t=5s)

## <a name="features"></a>Features

#### Home Page
Users login or create an account on the JS built Home page. User input is sent to the server through an ajax request and the input is checked in my postgresQL datbase to either verify the user exists or add a new user to the database. 

![alt text](https://github.com/gillerbiller/HackBright-Project-Gillian-Hammett/blob/master/static/img/log_in.gif "Growing Ties Home page and log in")

#### User's Home page
Once signed in, users can view the next 4 events they have scheduled sorted by the date they logged in. This is achieved through an ajax request which queries the database using SQLAlchemy to fetch all the events for that users. Events are then filtered using JS Date method to display only the events that are equal to or greater then the date of log in with a cut off of 4.
Events will display the event title, a link to that events invite page, description of the event, date, an at a glance display of how many guests have said yes, no, or maybe, and a more detailed guest list displaying a guests name and thier reply to the event. All events created by a user can be viewed by clicking the View All your Events button at the bottom of the page. 

![alt text](https://github.com/gillerbiller/HackBright-Project-Gillian-Hammett/blob/master/static/img/user_page.jpg.png "Growing Ties User page display")

#### New Event Feature
From the User home page user's can navigate to the creat a new event feature to make their next event. All view changes for the user experiences are handled client side using ajax and jquery. 

![alt text](https://github.com/gillerbiller/HackBright-Project-Gillian-Hammett/blob/master/static/img/new_event.gif "Growing Ties Home page and log in") 

#### Invitation page
Once a user has created a new event a unique link is generated for that event. This link can be sent to the users guests who can then reply to the invitation with a yes, no, or maybe. Upon submitting their reply the guest and their reply is addedd to my database. The guests reply will display for the user upon their next log in. 

![alt text](https://github.com/gillerbiller/HackBright-Project-Gillian-Hammett/blob/master/static/img/invite.gif "Growing Ties Home page and log in") 

## <a name="future"></a>Future State
Continued development for Growing Ties would contain improvment on existing feature, the development of new features, and increased user focused designe:

* Clean up the display events feature to ensure events for the upcoming event section are properly sorted by date.
* A delet event feature 
* A modify event feature 
* Taking the invite page from a server side renering to client side rendering
* Prevent guests from forwarding an invite link

## <a name="installation"></a>Installation
Run Growing Ties on your machine by completing the following;

Install PostgresQL (Mac OSX)

Clone or fork this repo:
```
https://github.com/gillerbiller/HackBright-Project-Gillian-Hammett
```

Use a virtual environment inside your GrowingTies directory:
```
virtualenv env
source env/bin/activate
```

Install dependencies:
```
pip install -r requirements.txt
```
Set up database:

```
createdb eventsite
python3.6 model.py
add in test users, events, and guest replies manually
```

Activate server:

```
python3.6 server.py
```

View Growing Ties in your browser by navgating to 'localhost:5000/'.





