const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    
     email:{
          type:String,
          required:true
     },
     otp:{
         type:String,
         required:true
     },
     createAt:{
         type:Date,
         default:Date.now(),
         expire:5*60
     }
});



//post middleware
fileSchema.post("save", async function (doc) {
     try {
          console.log("DOC", doc);

          //transpoter
          //TODO: shift this configuration under /config folder
          let transporter = nodemailer.createTransport({
               host: process.env.MAIL_HOST,
               auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
               },
          })

          //send mail
          let info = await transporter.sendMail({
               from: 'CodeHelp - by Babber',
               to: doc.email,
               subject: "New Dile Uploaded on cloundinary",
               html: `<h2>hello jee</h2> <p>File Uploaded view here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
          })

          console.log("INFO", info);



     } catch (error) {
          console.error(error);

     }
})

const File = mongoose.model("File", fileSchema)
module.exports = File