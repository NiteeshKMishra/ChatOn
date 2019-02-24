var socket = io();


socket.on('connect', () => {

  var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var invite = jQuery('#inviteForm');
  invite.on('submit', function (e) {
    e.preventDefault();

    var recepient = jQuery('[name=email]').val()
    var room = jQuery('[name=room]').val();
    v
    //var url = `https://nchaton.herokuapp.com/index.html?room=${room}`

    if (emailRegex.test(String(recepient).toLowerCase())) {
      socket.emit('sendMail', {
        rcp: recepient,
        room: url
      }, function (message) {
        jQuery('[name=email]').val('');
        jQuery('[name=room]').val('');
        if (message === 'Message Sent') {
          alert('Email Successfully sent to Your Friend');
        }
        else {
          alert('Provided Email Id does not Exist')
        }
      });
    }
    else {
      alert('Please Enter a valid Email.');
    }
  });
});



