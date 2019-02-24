const moment = require('moment');
var generateMessage = function (from, text) {

  return { from, text, createdAt: moment().valueOf() }
}

var generateLocationMessage = function (from, location) {
  return {
    from,
    url: `https://www.google.com/maps?q=${location.lat},${location.lang}`,
    createdAt: moment().valueOf()
  }
}

var validateMessage = function (message) {
  var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (message.name.trim() === '' || message.room.trim() === '' || format.test(message.name) || format.test(message.room)) {
    return true
  }
  else {
    return false
  }

}


module.exports = { generateMessage, generateLocationMessage, validateMessage };