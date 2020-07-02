"use strict";

 
$('#events_soon').hide(); 
$('#all_event_btn').hide();
$('#make_event').hide();
$('#event_layout').hide();



//Pass login in data to server for validation//
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

            //4 soonest events ordered by date//

            let counter = 0

            for (const event of res){
                if (counter > 4){
                    break;
                    }

                const today = new Date();
                const eventDate = new Date(event.date)
                
                if(eventDate >= today){

                    counter +=1

                    const eventTitle = $(`<div class="col-md-6"><ul id=${event.event_id} class="list-group list-group-flush see_through"><h4>${event.event_title}</h4></ul></div>`)
                    $('#most_relevant_events').append(eventTitle);

                    const eventLink = $(`<li class="list-group-item see_through"><a class="fade-in-color" href=${window.location.origin + '/invite/' + event.event_id}>Invite Link to ${event.event_title}</a></li>`)
                    $(`#${event.event_id}`).append(eventLink); 

                    const description = $(`<li class="list-group-item see_through">${event.description}</li>`)
                    $(`#${event.event_id}`).append(description); 

                    const tempDate = new Date(event.date)
                    const formatDate = tempDate.toLocaleString('en-US', { timeZone: 'UTC' })
                    const formatDateSlice = formatDate.slice(0,10);
                
                    const date = $('<li class="list-group-item see_through">' + formatDateSlice + '</li>');
                    $(`#${event.event_id}`).append(date) 

                    let yes = 0
                    let yesList = []
                    let no = 0
                    let noList = []
                    let maybe = 0
                    let maybeList = []

                    for (const guest of event.guest){
                        let reply 
                        if (guest.reply === 0){

                             yes += 1

                             yesList.push(`${guest.fname} ${guest.lname} (Yes) `)
                        };
                        if (guest.reply === 1){
                            
                            no += 1

                            noList.push(`${guest.fname} ${guest.lname} (No) ` )
                        };
                        if (guest.reply === 2){

                            maybe += 1

                            maybeList.push(`${guest.fname} ${guest.lname} (Maybe) ` )
                        }    
                    }

                    const guestReply = $(`<li class="list-group-item see_through">Yes ${yes} No ${no} Maybe ${maybe}</li>`)
                    $(`#${event.event_id}`).append(guestReply) 

                    const guestList = $(`<li class="list-group-item see_through">${yesList}</li> 
                                        <li class="list-group-item see_through">${noList}</li> 
                                        <li class="list-group-item see_through">${maybeList}</li>`)
                    $(`#${event.event_id}`).append(guestList)         
                    }              
            }
            //All user events//

            for ( const event of res){
                
                let uniqueId = event.event_id +'abc'            

                const eventTitle = $(`<div class="col-md-6"><ol id=${uniqueId} class="list-group list-group-flush"><h4>${event.event_title}</h4></ol></div>`)
                $("#user_events").append(eventTitle);

                const eventLink = $(`<li class="list-group-item see_through"><a class="fade-in-color" href=${window.location.origin + '/invite/' + event.event_id}>Invite Link to ${event.event_title}</a></li>`)
                $(`#${uniqueId}`).append(eventLink); 

                const description = $(`<li class="list-group-item see_through">${event.description}</li>`)
                $(`#${uniqueId}`).append(description); 

                const tempDate = new Date(event.date)
                const formatDate = tempDate.toLocaleString('en-US', { timeZone: 'UTC' })
                const formatDateSlice = formatDate.slice(0,10);
                
                const date = $('<li class="list-group-item see_through">' + formatDateSlice + '</li>');
                $(`#${uniqueId}`).append(date)      

                let yes = 0
                let yesList = []
                let no = 0
                let noList = []
                let maybe = 0
                let maybeList = []

                for (const guest of event.guest){
                    let reply 
                    if (guest.reply === 0){

                         yes += 1

                         yesList.push(`${guest.fname} ${guest.lname} Yes `)
                    };
                    if (guest.reply === 1){
                        
                        no += 1

                        noList.push(`${guest.fname} ${guest.lname} No ` )
                    };
                    if (guest.reply === 2){

                        maybe += 1

                        maybeList.push(`${guest.fname} ${guest.lname} Maybe ` )
                    }    
                }

                const guestReply = $(`<li class="list-group-item see_through">Yes ${yes} No ${no} Maybe ${maybe}</li>`)
                $(`#${uniqueId}`).append(guestReply) 

                const guestList = $(`<li class="list-group-item see_through">${yesList}</li> 
                                    <li class="list-group-item see_through">${noList}</li> 
                                    <li class="list-group-item see_through">${maybeList}</li>`)
                $(`#${uniqueId}`).append(guestList)           
                                     
            }
            
        let email = window.sessionStorage.getItem('email');

        $('h1').text(`Welcome Back ${email} to your`)
        
        $('#log_out').show();
        $('#make_event').show();
        $('#events_soon').show();
        $('#most_relevant_events').show();
        $('#all_event_btn').show();
        $('#user_events').show();
        
        $('#login_display').hide();
        $('#sign_up').hide(); 
        $('#how_to_img').hide();
        $('#how_to').hide();
        $('#get_started_img').hide();
        $('#get_started').hide();
        $('#done').hide(); 
        $('#done_img').hide();
        $('#imagehp').hide();
        
        $('#event_layout').hide();
        $('#back').hide();  
        });        
    });
});

//Revert back to hompage display upon logout

$('#log_out').on('click', (evt) =>{
    evt.preventDefault();

    window.sessionStorage.clear();

    $('#user_events').html('');
    $('#most_relevant_events').html('');
    $('#new_event_link').html('');

    $('#credentials')[0].reset();
    $('#create_account')[0].reset();

    $('#all_events').removeClass('show');
    $('#user_events').removeClass('show');

    $('h1').text('Welcome to Growing Ties!').show();
    $('#login_display').show();
    $('#sign_up').show();  
    $('#imagehp').show(); 
    $('#how_to_img').show();
    $('#how_to').show();
    $('#get_started_img').show();
    $('#get_started').show(); 
    $('#done_img').show();
    $('#done').show();

    $('h2').text('Your events').hide();
    $('#log_out').hide();
    $('#make_event').hide();
    $('#events_soon').hide();
    $('#all_event_btn').hide();
    $('#user_events').hide(); 
    $('#event_layout').hide();    
});

