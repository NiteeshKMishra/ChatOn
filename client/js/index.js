function deparam(uri) {
  if (uri === undefined) {
    uri = window.location.search;
  }
  var queryString = {};
  uri.replace(
    new RegExp(
      "([^?=&]+)(=([^&#]*))?", "g"),
    function ($0, $1, $2, $3) {
      queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
    }
  );
  return queryString;
};

var data = deparam(window.location.search);
jQuery('[name=room]').val(data.room);

function validateMessage(message) {
  var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (message === '' || format.test(message)) {
    return true
  }
  else {
    return false
  }
}

jQuery('#join-form').on('submit', function (event) {
  var userName = jQuery('[name=name]').val();
  var roomName = jQuery('[name=room]').val();
  if (validateMessage(userName) && validateMessage(roomName)) {
    event.preventDefault();
    jQuery('[name=name]').val('');
    jQuery('[name=room]').val('');
    alert('Room Name or User Name should not contain empty values or Special Characters')
  }
})