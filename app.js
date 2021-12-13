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
    Authorization: "Bearer TLW2V7n+gNpBWETpJWS5FoZV6x3hb2Z7GHf+CVeXdd9oQTPlC12qBen19XNpu3MuBj+/zyCHan/Gp+NIGD8peJGIxRWPnVXAQwlyMrersMHg6DBH3MQgNtNUPy48CYujgw4CCY6fMgdYsuhWtOrhjwdB04t89/1O/w1cDnyilFU=",
  };

  const body = JSON.stringify({
    replyToken,
    messages: [
      { type: "text", text: `userId(${userId}) say: ${originalMessage}` },
      { type: "text", text: JSON.stringify(events) },
      { type: "text", text: 'test by pobx' },
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
