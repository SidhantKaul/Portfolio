require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
let port = process.env.PORT;
const path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(express.static(path.join(__dirname, "/client/build")));

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
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

if (port == null || port == "") {
  port = 9000;
}
app.listen(port,function() {
  console.log("Server has Started");
});
