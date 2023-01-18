import { sendEmail, sendSMS } from "./readFriendsCSV.js";

import express, { response } from "express";

const app = express();
const port = 4000;
app.use(express.json());

app.get("/friends/:service", async (request, response) => {
  const service = request.params.service;
  if (service === "email") {
    sendEmail()
      .then((result) => {
        response.send(result);
      })
      .catch((error) => {
        response.status(error.status).send(error);
      })
      .catch((error) => {
        response.status(error.status).send(error);
      });
  } else if (service === "sms") {
    sendSMS()
      .then((result) => {
        response.send(result);
      })
      .catch((error) => {
        response.status(error.status).send(error);
      })
      .catch((error) => {
        response.status(error.status).send(error);
      });
  } else {
    response.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
