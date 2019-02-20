
var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('newMessage', function (message) {
  console.log(`${message.from} said ${message.text}.`);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (location) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">Get Location</a>');
  a.attr('href', location.url);
  li.text(`${location.from}: `);
  li.append(a);
  jQuery('#messages').append(li);
});
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User1',
    text: jQuery('[name=message]').val()
  }, function (ack) { console.log(ack) });
});

var sendLocation = jQuery('#send-location');
sendLocation.on('click', function (e) {
  if (!navigator.geolocation) {
    alert('Your Browser does not support GeoLocation');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocation', {
      lang: position.coords.longitude,
      lat: position.coords.latitude
    }, function (ack) {
      console.log(ack);
    })
  }, function (err) {
    alert('Unable to fetch the location');
  });

});