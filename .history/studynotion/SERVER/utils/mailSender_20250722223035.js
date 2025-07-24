
const nodemailer = require("nodemailer");

exports.mailSender = async (email,title,body) => {
    try{
     let transporter = nodemailer.createTransport({
          host:process.env.MAIL_HOST,
          port:465,
          secure:true,
          auth:{
               user: process.env.MAIL_USER,
               pass:process.env.MAIL_PASS,                                   
          }                                                                             
     })

     let info = await transporter.sendMail({
         from: 'StudyNotion || CodeHelp - by Babber',
         to: `${email}`,
         subject: `${title}`, 
         html: `${body}`                                         
     })
     console.log(info);
     return info;
     
    }catch(error){
        console.log(error.message)
    }

    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("MAIL_PASS:", process.env.MAIL_PASS ? "Loaded" : "Missing");
    console.log("Sending mail to:", email);
}