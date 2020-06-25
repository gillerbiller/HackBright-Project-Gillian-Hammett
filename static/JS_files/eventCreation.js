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
    $('#invite_link').show();         
});

$('#commit_event_db').on('click', (evt) => {
    evt.preventDefault();

    const eventFormInput = {
        'user_id': window.sessionStorage.getItem('user_id'),
        'event_title': $('#event_title').val(),
        'description': $('#description').val(),
        'date': $('#date').val()
    };

    console.log(eventFormInput)

    if ($("#event_title").val() === "" || $("#description").val() === "" 
        || $('#datepicker-13').val() === "") {

        alert('You did not fill out one of the fields for your event');

        return false;
    }
    $.post('/make_new_event', eventFormInput, (res) =>{

        window.sessionStorage.setItem('res', res);

        const event_id = res['event_id']

        const link = window.location.origin + '/invite/' + event_id
       
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

    let event = window.sessionStorage.getItem('res')

    const eventTitle = $(`<ol>${event.event_title}</ol>`)
    $('#user_events').append(eventTitle);

    const eventLink = $(`<li> ${window.location.origin + '/invite/' + event.event_id}</li>`)
    $('#user_events').append(eventLink); 

    const description = $(`<li>${event.description}</li>`)
    $('#user_events').append(description); 

    $('#make_event').show();
    $('#log_out').show();

    $('#event_layout').hide();
    $('#back').hide();
    $('#invite_link').hide(); 

});

    

