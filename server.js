const express = require("express");
const dotenv = require("dotenv").config();
const { Elarian } = require("elarian");
const { response } = require("express");
const app = express();
const port = 5000;
const handlerFunction = () => {
  //connection
  const client = new Elarian({
    orgId: process.env.orgId,
    appId: process.env.appId,
    apiKey: process.env.apiKey,
  });
  //The recipient number
  client
    .on("connected", () => {
      if ("connected") {
        const testCustomer = new client.Customer(
          (customerNumber = {
            provider: "cellular",
            number: "+25474*******",
          })
        );
        //provide the channel
        testCustomer
          .sendMessage(
            { number: "mynumber", channel: "sms" },
            {
              body: {
                text: "Hello World!",
              },
            }
          )
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .on("error", (error) => {
      console.log("Connection failed with error...", error);
    })
    .connect();
};
handlerFunction();
app.listen(port, console.log(port));
