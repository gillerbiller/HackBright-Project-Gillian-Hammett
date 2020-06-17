"use strict";

//Pass new user data to server to create a new user//

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

        if(res === 'null'){
            alert('That email already has an account. Please login or try again');
            return false;
        }else{
            alert('Account creatd, please log in!');
        }
    });
});
