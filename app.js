const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const replyToken = req.body.events[0].replyToken;
  const userId = req.body.events[0].source.userId;
  const originalMessage = req.body.events[0].message.text;
  const events = req.body.events;

  reply({ replyToken, userId, originalMessage, events });
  res.sendStatus(200);
});

app.listen(port);

function reply({ replyToken, userId, originalMessage, events }) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer 8b6402529e6cec77aef143ad7e96cfca",
  };

  const body = JSON.stringify({
    replyToken,
    messages: [
      { type: "text", text: `userId(${userId}) say: ${originalMessage}` },
      { type: "text", text: JSON.stringify(events) },
    ],
  });

  request.post(
    {
      url: "https://api.line.me/v2/bot/message/reply",
      headers,
      body,
    },
    (err, res, body) => console.log(`Status = ${res.statusCode}`)
  );
}
