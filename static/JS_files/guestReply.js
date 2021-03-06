"use strict";

$('#guest_reply').on('click', (evt) => {
    evt.preventDefault();
  
    const reply = $("input[name='reply']:checked").val();

    const guestFormInput = {
        'event_id' : event_id,
        'fname' : $('#fname').val(),
        'lname' : $('#lname').val(),
        'reply' : reply
    };

    $.post('/create_guest', guestFormInput, (res) => {

        $('h1').text(`Thank you for sending your reply!`)

        $('p').hide();
        $('#replies').hide();
    })    
});