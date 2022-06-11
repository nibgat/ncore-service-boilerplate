import {
    MAIL_CONFIGS
} from "../constants";
import nodemailer from "nodemailer";
import localize from "../locales";

const sendMail = ({
    lang = "en",
    subject,
    content,
    to
}) => {
    const locale = localize(lang);

    var transporter = nodemailer.createTransport({
        host: MAIL_CONFIGS.host,
        port: MAIL_CONFIGS.port,
        secure: MAIL_CONFIGS.secure,
        auth: MAIL_CONFIGS.auth,
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: MAIL_CONFIGS.from,
        to: to,
        subject: subject,
        html: content
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                reject({
                    message: error.message,
                    code: 500
                });
            } else {
                resolve({
                    message: locale["message-sended-successfully"],
                    code: 200
                });
            }
        });
    });
};
export default sendMail;
