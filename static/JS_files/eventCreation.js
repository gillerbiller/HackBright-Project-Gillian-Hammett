"use strict";

$('#make_event').on('click', (evt) => {
    evt.preventDefault();

    $('h1').text('New event page!')
    $('h2').text('New Event')

    $('#user_events').hide();
    $('#most_relevant_events').hide();
    $('#make_event').hide();
    $('#log_out').hide();

    $('#event_layout').show();
    $('#back').show();
    $('#new_event_link').html('Your invite link will appear bellow and on your homepage. \
Just copy the link and send it to your friends to invite them to your new event!');         
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

        const event_id = res['event_id']
        const event_title = res['event_title']
        const description = res['description']
        const date = res['date']

        const link = window.location.origin + '/invite/' + event_id
        const inviteLink = $('<a>', {

            text: link,
            title: 'Invitation',
            href: link 
        }) .appendTo('#invite_link');

        const eventTitle = $(`<ol>${event_title}</ol>`)
        $('#user_events').append(eventTitle);

        const eventLink = $(`<li> ${window.location.origin + '/invite/' + event_id}</li>`)
        $('#user_events').append(eventLink); 

        const eventDescription = $(`<li>${description}</li>`)
        $('#user_events').append(eventDescription);

        const tempDate = new Date(date)
        const formatDate = tempDate.toDateString()
        const eventDate = $('<li>' + formatDate + '</li>');
        $('#user_events').append(eventDate)       

    });
});

$('#back').on('click', (evt) => {
    evt.preventDefault();

    let email = window.sessionStorage.getItem('email');

    $('h1').text(`${email}'s' Homepage.`);
    $('h2').text('Your events');

    $('#event_layout')[0].reset();
    $('#invite_link').html("");

    $('#user_events').show();
    $('#most_relevant_events').show();
    $('#make_event').show();
    $('#log_out').show();

    $('#event_layout').hide();
    $('#back').hide();
    $('#new_event_link').html(''); 

});

    

