import nodemailer from 'nodemailer';
import 'dotenv/config';

class SendEmail {
    static transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL
        }
    });

    static sendMail(emailDestinatario, assunto, corpoHTML) {
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: emailDestinatario,
            subject: assunto,
            html: corpoHTML
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
    }
}

export default SendEmail;
