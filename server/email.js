const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "caramel1337l@gmail.com",
      pass: "khawla.1140",
    },
  });

function Email(token,email){
  const mailOptions = {
    from: "caramel1337l@gmail.com",
    to: email,
    subject: "Confirm account",
    html: `<html><body><p>Welcome to Matcha,<br /><br/><br/><p>To activate your account please click <a href="http://localhost:3000/confirm/${token}">Here</a></p></p><p>
<br />--------------------------------------------------------<br />This is an automatic mail , please do not reply.</p></body></html>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
    return({ message: "done" });
    }
  });
}
  module.exports = Email;