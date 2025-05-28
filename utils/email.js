const nodemailer = require("nodemailer");

const sentEmail = async (userEmail) => {
  const serviceAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: serviceAccount.user,
      pass: serviceAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Test" <test@example.com>',
    to: userEmail,
    subject: "Order Confirmation",
    text: "Order is on way!",
  });

  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  return nodemailer.getTestMessageUrl(info);
};

module.exports = { sentEmail };
