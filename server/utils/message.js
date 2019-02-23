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

module.exports.generateMessage = generateMessage;
module.exports.generateLocationMessage = generateLocationMessage;