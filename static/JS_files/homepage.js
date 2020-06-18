"use strict";

 //Pass login in data to server for validation//

$('#event_layout').hide();
$('#make_event').hide();

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
       
                const event_title = $(`<ol>${event.event_title}</ol>`)
                $('#user_events').append(event_title);

                const description = $(`<li>${event.description}</li>`)
                $('#user_events').append(description);

                const date = $(`<li>${event.date}</li>`)
                $('#user_events').append(date);
            }
            
        let email = window.sessionStorage.getItem('email');
        console.log(email)

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
    $('#email').text('')
    $('#password').text('') 

    $('h1').text('Welcome To Event Creations!')
    $('h2').text('Your events').hide()

    $('#user_events').hide();
    $('#log_out').hide();
    $('#make_event').hide();
    $('#event_layout').hide();

    $('#create_account').show();
    $('#credentials').show();
    
});

