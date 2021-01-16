const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hhkhaoula40@gmail.com",
    pass: "egfhjwzezajeqnbw",
  },
});

const send_Email = (email, subject, html) => {
  const mailOptions = {
    from: "caramel1337l@gmail.com",
    to: email,
    subject: subject,
    html:
      "<html><body><p>Welcome to Matcha,<br /><br/><br/>" +
      html +
      "</p><p><br />--------------------------------------------------------<br />This is an automatic mail , please do not reply.</p></body></html>",
  };
  if (transporter.sendMail(mailOptions)) return true;
  else return false;
};
module.exports = send_Email;
