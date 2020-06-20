"use strict";

console.log(event_id)

$('#guest_reply').on('click', (evt) => {
    evt.preventDefault();
  
    const reply = $("input[name='reply']:checked").val();

    const guestFormInput = {
        'event_id' : event_id,
        'fname' : $('#fname').val(),
        'lname' : $('#lname').val(),
        'reply' : reply
    };
    console.log(guestFormInput)
    $.post('/create_guest', guestFormInput, (res) => {
        console.log(res)

        $('h1').text(`Thank you for sending your reply!`)

        $('p').hide();
        $('#replies').hide();
    })    
});