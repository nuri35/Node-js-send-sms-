const express = require('express');
const app = express();
require('dotenv').config();
const Nexmo = require('nexmo');
const socketio = require('socket.io');
const bodyParser = require('body-parser');


const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  signatureSecret: process.env.SIGNATURE_SECRET,
  
},{debug:true})
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {

    
const from = "Vonage APIs"
const to = ""
const text = 'Kredi bilgileriniz calindi'

vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        res.json({message:err})
    } else {
        if(responseData.messages[0]['status'] === "0") {
           res.json({message:" sent successfully"})
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})
  


});

app.listen(3000, () => console.log('SMS Service Listening on PORT 3000'))