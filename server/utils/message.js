
var generateMessage = function (from, text) {

  return { from, text, createdAt: new Date().toString() }
}

var generateLocationMessage = function(from,location){
return {
  from,
  url: `https://www.google.com/maps?q=${location.lang},${location.lat}`,
  createdAt: new Date().toString()
}
}

module.exports.generateMessage = generateMessage;
module.exports.generateLocationMessage = generateLocationMessage;