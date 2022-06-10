const express = require("express");

const bodyParser = require("body-parser");

const nexmo = require("@vonage/server-sdk")

const serverless = require("serverless-http");


//https://musical-sunflower-037a80.netlify.app/


const router = express.Router()

const cors = require("cors");

const app = express()

app.use(cors());

const vonage = new nexmo({
    apiKey: "b140fa89",
    apiSecret: "xTMgEcNoNgC5XdjY"
  })


router.get("/", (req, res, next) => {
    res.send("Working!")
})

router.post("/sendtext", (req, res, next) => {
    const { text } = req.query
    console.log(text)
    sendtext(text);
    console.log("Working")
    res.send("Working")
})

app.use('/.netlify/functions/server', router)


module.exports.handler = serverless(app)


const sendtext = (text) => {
    const from = "Vonage APIs"
    const to = "919361485237"
    
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}
