const { RTMClient } = require("@slack/rtm-api");
const { WebClient } = require("@slack/web-api");
const packageJson = require("./package.json");
const express=require('express')
const app=express();
const rtm = new RTMClient(
  "xoxb-3567025960769-3558493869650-csbUm7oWfzoqOoyJ7riIKHkM"
);
const web = new WebClient(
    "xoxb-3567025960769-3558493869650-csbUm7oWfzoqOoyJ7riIKHkM"
  );
rtm.start().catch(console.error);

rtm.on("ready", async () => {
  console.log("bot started");
  sendMessage(
    '#general',
    `Bot version ${packageJson.version} is online.`
  );
});

rtm.on("slack_event", async (eventType, event) => {
  if (event && event.type === "message") {
    if (event.text === "!hello") {
      hello(event.channel, event.user);
    }
  }
});

function hello(channelId, userId) {
  sendMessage(channelId, `Heya! <@${userId}>`);
}

async function sendMessage(channel, message) {
  await web.chat.postMessage({
    channel: channel,
    text: message,
  });
}
app.post('/hello',()=>{
    console.log('hello')
})


app.listen(3000,()=>{
  console.log('Server started at port 3000');
})


