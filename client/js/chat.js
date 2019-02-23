var socket = io();



function scrollMessage() {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}


socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('newMessage', function (message) {
  var formatTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    time: formatTime
  })
  jQuery('#messages').append(html);
  scrollMessage();
});

socket.on('newLocationMessage', function (location) {
  var formatTime = moment(location.createdAt).format('h:mm a');
  var template = jQuery('#location-template').html();
  var html = Mustache.render(template, {
    from: location.from,
    url: location.url,
    time: formatTime
  })
  jQuery('#messages').append(html);
  scrollMessage();
});


socket.on('disconnect', () => {
  console.log('Disconnected from server');
});


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User1',
    text: jQuery('[name=message]').val()
  }, function () { jQuery('[name=message]').val('') });
});

var sendLocation = jQuery('#send-location');
sendLocation.on('click', function (e) {
  if (!navigator.geolocation) {
    alert('Your Browser does not support GeoLocation');
  }

  sendLocation.attr('disabled', 'disabled');
  navigator.geolocation.getCurrentPosition(function (position) {
    sendLocation.removeAttr('disabled');
    socket.emit('createLocation', {
      lang: position.coords.longitude,
      lat: position.coords.latitude
    }, function () {
    })
  }, function (err) {
    sendLocation.removeAttr('disabled');
    alert('Unable to fetch the location');
  });

});