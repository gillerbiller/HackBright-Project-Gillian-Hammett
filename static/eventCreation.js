"use strict";


$('#make_event').on('click', (evt) => {
    evt.preventDefault();

    $('h1').text('New event page!')
    $('h2').text('New Event')

    $('#user_events').hide();
    $('#make_event').hide();
    $('#log_out').hide();

    $('#event_layout').show();
    //$('#commit_event_db').show();
    
    
});

$('#commit_event_db').on('click', (evt) => {
    evt.preventDefault();

    const eventFormInput = {
        'event_title': $('#event_title').val(),
        'description': $('#description').val(),
        'date': $('#date').val()
    };
    console.log(eventFormInput)

    if ($("#title").val() === "" || $("#description").val() === "" 
|| $('#date').val() === "") {
        alert('You did not fill out one of the fields for your event');
        return false;
    };

    $.post('/make_new_event', eventFormInput, (res) => {

        if(res !== 'null'){
            alert('You created a new event.');
            return false 
            
        }

//    $('h1').text('Event Creation')
//    $('h2').text('Your events')

//    $('#event_layout').hide();

//    $('#user_events').show();
//    $('#make_event').show();
//    $('#log_out').show();


    

});