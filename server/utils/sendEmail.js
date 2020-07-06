var nodemailer = require('nodemailer');

function sendMail(rec, urlLink) {

  return new Promise((resolve, reject) => {
    var smtpTransport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "",
        pass: ""
      }
    });

    var mailOptions = {
      to: rec,
      subject: 'Join ChatOn',
      text: `Dear User,
      Your Friend has requested you to join ChatOn. Please click the below link to join a room
  
      ${urlLink}`
    }

    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        reject(error);
      } else {
        resolve('Message Sent')
      }
    });
  })

}

module.exports.sendMail = sendMail;
