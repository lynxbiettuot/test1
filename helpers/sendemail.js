const nodemailer = require('nodemailer');

module.exports.sendEmail = (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'hoangvlinh09012004@gmail.com',
        to: email,//Khi goi vao ham sendMail thi cho ho truyen email vao
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        // do something useful
        }
    });
}