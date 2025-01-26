import nodemailer from "nodemailer";
import config from "../../config";


export const sendEmail = async (email: string, subject: string, text: string) => {
    // console.log({text});
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: "prashomanchakrabarti1@gmail.com",
          pass: `${config.smtpPassword}`,
        },
      });
      await transporter.sendMail({
        from: 'prashomanchakrabarti1@gmail.com', // sender address
        to: `${email}`, // list of receivers
        subject: `${subject}`, // Subject line
         // plain text body
        html: `
        <b>${text}</b>
        `, 
      });
}




