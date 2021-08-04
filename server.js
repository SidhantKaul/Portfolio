require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors())

app.post("/contact", async function(req,res){
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service:"hotmail",
    auth: {
      user:""+process.env.USER,
      pass:""+process.env.PASS
    }
});
const options = {
  from:"sidhantkaul@outlook.com",
  to:"sidhantkaul10@gmail.com",
  subject:""+req.body.subject,
  text:req.body.email+"<----- email \n"+req.body.msg
}
transporter.sendMail(options,function(err,info) {
  if(err)
  console.log(err);
  else {
    console.log(info.response);
    res.send("success")
  }
})
  console.log("UVUYVFUYVFUYVIKV");
  console.log(req.body);
});
app.listen(9000,function() {
  console.log("server started");
})
