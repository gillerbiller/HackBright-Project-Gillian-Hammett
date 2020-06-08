"use strict";


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
      
        const email = (res[1]);
        
        const resUserData = {'user_id':(res[0])};
  
    $.post('/user_homepage', resUserData, (res) => {

        for ( const event of res){

            const title = $(`<ul>${event.event_title}</ul>`)
            $('#user_events').append(title);

            const description = $(`<li>${event.description}</li>`)
            $('#user_events').append(description);

            const date = $(`<li>${event.date}</li>`)
            $('#user_events').append(date);

        }
    $('h1').text(`Welcome Back! ${email}`)
    $('h2').text('Your events')

    $('#user_events').show();
    $('#log_out').show();
    $('#create_event').show();
    $('#create_account').hide();
    $('#credentials').hide();

    });
    });
});

$('#log_out').on('click', (evt) =>{
    evt.preventDefault();

    $('h1').text('Welcome To Event Creations!')
    $('h2').text('Your events').hide()

    $('#user_events').hide();
    $('#log_out').hide();
    $('#create_account').show();
    $('#credentials').show();
});

$('#new_user').on('click', (evt) => {
    evt.preventDefault();

    const newFormInput = {
        'new_email': $('#new_email').val(),
        'new_password': $('#new_password').val()
    };

     if ($("#new_email").val() === "" || $("#new_password").val() === "") {
        alert('you did not fill out one of the fields');
        return false;
    };

     $.post('/create_user', newFormInput, (res) => {
        console.log(res)
    });
});
