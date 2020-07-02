"use strict";
//Need to add some functionality to close All Events feature when make event
//button is clicked 
$('#make_event').on('click', (evt) => {
    evt.preventDefault();

    $('#all_events').removeClass('show');
    $('#user_events').removeClass('show');

    $('body').css('background-image' ,' linear-gradient(rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.55)), url(/static/img/floral23.jpg)');




    $('h1').text('New event page!')
    $('h2').text('Your events').hide();

    $('#first_seen_events').hide();
    $('#events_soon').hide();
    $('#first_events').hide();
    $('#make_event').hide();
    $('#log_out').hide();
    $('#all_event_btn').hide();

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
        console.log(date)


        const link = window.location.origin + '/invite/' + event_id
        const inviteLink = $('<a>', {

            text: link,
            title: 'Invitation',
            href: link 
        }) .appendTo('#invite_link');
   
        const eventTitle = $(`<div class="col-md-6"><ol id=${event_id} class="list-group list-group-flush see_through"><h4>${event_title}</h4></ol></div>`)
        $('#most_relevant_events').append(eventTitle);

        const eventLink = $(`<li class="list-group-item see_through"><a class="fade-in-color" href=${window.location.origin + '/invite/' + event_id}>Invite Link to your new event!</a></li>`)        
        $(`#${event_id}`).append(eventLink); 

        const eventDescription = $(`<li class="list-group-item see_through">${description}</li>`)
        $(`#${event_id}`).append(eventDescription);

        const tempDate = new Date(date)
        const formatDate = tempDate.toLocaleString('en-US', { timeZone: 'UTC' })
        const formatDateSlice = formatDate.slice(0,10); 
        const eventDate = $('<li class="list-group-item see_through">' + formatDateSlice + '</li>');
        $(`#${event_id}`).append(eventDate)       

    });
});

$('#back').on('click', (evt) => {
    evt.preventDefault();

    let email = window.sessionStorage.getItem('email');

    $('h1').text(`${email}'s Homepage.`);
    $('body').css('background-image', 'none');

    $('#event_layout')[0].reset();
    $('#invite_link').html("");

    $('#user_events').show();
    $('#first_events').show();
    $('#make_event').show();
    $('#log_out').show();

    $('#all_event_btn').show();

    $('#first_events').show();
    $('#events_soon').show();

    
    $('#event_layout').hide();
    $('#back').hide();
    $('#new_event_link').html(''); 

});

    

