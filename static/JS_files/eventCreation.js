"use strict";


$('#make_event').on('click', (evt) => {
    evt.preventDefault();

    $('h1').text('New event page!')
    $('h2').text('New Event')

    $('#user_events').hide();
    $('#make_event').hide();
    $('#log_out').hide();

    $('#event_layout').show();
    $('#back').show(); 
    
    
});

$('#commit_event_db').on('click', (evt) => {
    evt.preventDefault();

    const eventFormInput = {
        'user_id': window.sessionStorage.getItem('user_id'),
        'event_title': $('#event_title').val(),
        'description': $('#description').val(),
        'date': $('#date').val()
    };

    if ($("#event_title").val() === "" || $("#description").val() === "" 
        || $('#date').val() === "") {

        alert('You did not fill out one of the fields for your event');

        return false;
    }
    $.post('/make_new_event', eventFormInput, (res) =>{
      
        const link = window.location.origin + res
       
        const inviteLink = $('<a>', {

            text: link,
            title: 'Invitation',
            href: link 
        }) .appendTo('#invite_link');
       
    });

});

$('#back').on('click', (evt) => {
    evt.preventDefault();

    let email = window.sessionStorage.getItem('email');

    $('h1').text(`${email}'s' Homepage.`)
    $('h2').text('Your events')

    $('#user_events').show();
    $('#make_event').show();
    $('#log_out').show();

    $('#event_layout').hide();
    $('#back').hide(); 

});

    

