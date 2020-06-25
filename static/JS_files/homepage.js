"use strict";

 //Pass login in data to server for validation//

$('#event_layout').hide();
$('#make_event').hide();
$('#invite_link').hide();

$('#login').on('click', (evt) => {
    evt.preventDefault();

    const formInput = {
        'email': $('#email').val(),
        'password': $('#password').val()
    };

    if ($("#email").val() === "" || $("#password").val() === "") {
        alert('You did not fill out one of the fields');
        return false;
    };

    $.post('/validate_user', formInput, (res) => {

        if(res === 'null'){
            alert('Invalid log in. Please try again or create an account.');
            return false;
        }
//If login valid get user data for user homepge//

        window.sessionStorage.setItem('user_id', res['user_id']);
        window.sessionStorage.setItem('email', res['email']);

        let userIdForm = {'user_id': window.sessionStorage.getItem('user_id')};


        $.post('/user_homepage', userIdForm, (res) => {

            for ( const event of res){
   
                const eventTitle = $(`<ol>${event.event_title}</ol>`)
                $('#user_events').append(eventTitle);

                const eventLink = $(`<li> ${window.location.origin + '/invite/' + event.event_id}</li>`)
                $('#user_events').append(eventLink); 

                const description = $(`<li>${event.description}</li>`)
                $('#user_events').append(description); 

                let yes = 0
                let yesList = []
                let no = 0
                let noList = []
                let maybe = 0
                let maybeList = []

                for (const guest of event.guest){
                    let reply 
                    if (guest.reply === 0){

                         yes += 1

                         yesList.push(`${guest.fname} ${guest.lname} Yes `)
                    };
                    if (guest.reply === 1){
                        
                        no += 1

                        noList.push(`${guest.fname} ${guest.lname} No ` )
                    };
                    if (guest.reply === 2){

                        maybe += 1

                        maybeList.push(`${guest.fname} ${guest.lname} Maybe ` )
                    }    
                }

                const guestReply = $(`<li>Yes ${yes} No ${no} Maybe ${maybe}</li>`)
                $('#user_events').append(guestReply) 

                const guestList = $(`<li>${yesList}</li> 
                                    <li>${noList}</li> 
                                    <li>${maybeList}</li>`)
                $('#user_events').append(guestList)  

                //event.date make into JS date objest then format MDN docs/moment

                const tempDate = new Date(event.date)
                console.log(tempDate)
                const formatDate = tempDate.toDateString()
                console.log(formatDate)

                const date = $('<li>' + formatDate + '</li>');
                $('#user_events').append(date)               
                                
                
            }
            
        let email = window.sessionStorage.getItem('email');

        $('h1').text(`Welcome Back ${email} to your`)
        $('h2').text('Your events')

        $('#user_events').show();
        $('#log_out').show();
        $('#make_event').show();

        $('#create_account').hide();
        $('#credentials').hide();
        $('#event_layout').hide();
        $('#back').hide();    
        });    
        
    });
});

//Revert back to hompage display upon logout

$('#log_out').on('click', (evt) =>{
    evt.preventDefault();

    window.sessionStorage.clear();
    $('#user_events').html('')
    $('#credentials')[0].reset()
    //$('#email').text('')
    //$('#password').text('') 

    $('h1').text('Welcome To Event Creations!')
    $('h2').text('Your events').hide()

    $('#user_events').hide();
    $('#log_out').hide();
    $('#make_event').hide();
    $('#event_layout').hide();

    $('#create_account').show();
    $('#credentials').show();
    
});

