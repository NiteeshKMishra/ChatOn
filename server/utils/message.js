
var generateMessage = function (from, text) {

  return { from, text, createdAt: new Date().toString() }
}

module.exports.generateMessage = generateMessage;