import nodemailer from "nodemailer";
import dotenv from 'dotenv'
import sgMail from "@sendgrid/mail";
dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendEmail = async (options) => {


var dynamic_template_data = {
  message: options.message
}

const msg = {
    to: options.email,
    from: 'kiburezelast@gmail.com',
    subject: options.subject,
    text: options.meesage,
    html: options.html,
    templateId: 'd-998d0ba4f97f403c907b1480553b6414',
   dynamic_template_data
  };

  sgMail
    .send(msg)
    .then((response) => console.log("email send"))
    .catch((error) =>{
        console.log('from error')
         console.log(error.message)});

};

export default sendEmail;
