"use strict";

 //Pass login in data to server for validation//

$('#event_layout').hide();
$('#make_event').hide();
$('#most_relevant_events').hide();

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

            let counter = 0
            for (const event of res){

                if (counter < 4){
                    counter = counter + 1;
                } else{
                    break
                }

                const today = new Date();
                const eventDate = new Date(event.date)

                if(eventDate >= today){

                    const eventTitle = $(`<ol>${event.event_title}</ol>`)
                    $('#most_relevant_events').append(eventTitle);

                    const eventLink = $(`<li> ${window.location.origin + '/invite/' + event.event_id}</li>`)
                    $('#most_relevant_events').append(eventLink); 

                    const description = $(`<li>${event.description}</li>`)
                    $('#most_relevant_events').append(description); 

                    const tempDate = new Date(event.date)
                    const formatDate = tempDate.toDateString()
                    const date = $('<li>' + formatDate + '</li>');
                    $('#most_relevant_events').append(date)      
                }
            }

            for ( const event of res){
   
                const eventTitle = $(`<ol>${event.event_title}</ol>`)
                $('#user_events').append(eventTitle);

                const eventLink = $(`<li> ${window.location.origin + '/invite/' + event.event_id}</li>`)
                $('#user_events').append(eventLink); 

                const description = $(`<li>${event.description}</li>`)
                $('#user_events').append(description); 

                const tempDate = new Date(event.date)
                const formatDate = tempDate.toDateString()
                const date = $('<li>' + formatDate + '</li>');
                $('#user_events').append(date)      

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
                                     
            }
            
        let email = window.sessionStorage.getItem('email');

        $('h1').text(`Welcome Back ${email} to your`)
      

        $('#user_events').show();
        $('#most_relevant_events').show();
        $('#log_out').show();
        $('#make_event').show();

        $('#create_account').hide();
        $('#credentials').hide();
        $('#event_layout').hide();
        $('#back').hide();
        $('#imagehp').hide();
        $('#how_to_img').hide();
        $('#how_to').hide();
        $('#get_started_img').hide();
        $('#get_started').hide();
        $('#done').hide(); 
        $('#done_img').hide();   
        });    
        
    });
});

//Revert back to hompage display upon logout

$('#log_out').on('click', (evt) =>{
    evt.preventDefault();

    window.sessionStorage.clear();
    $('#today').html(''); //TEMPORARY 

    $('#user_events').html('');
    $('#most_relevant_events').html('');
    $('#credentials')[0].reset();

    $('h1').text('Welcome to Growing Ties!').show();
    $('h2').text('Your events').hide();

    $('#user_events').hide();
    $('#log_out').hide();
    $('#make_event').hide();
    $('#event_layout').hide();

    $('#new_event_link').html('');

    $('#create_account').show();
    $('#credentials').show();
    $('#imagehp').show();
    $('#how_to_img').show();
    $('#how_to').show();
    $('#get_started_img').show();
    $('#done').show();
    $('#done_img').show();  
    
});

