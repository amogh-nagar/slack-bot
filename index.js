const { App } = require("@slack/bolt");
const { submitmodal, texttypemodal } = require("./modal_intergface");
const { WebClient } = require("@slack/web-api");
const web = new WebClient(
  "xoxb-3567025960769-3561336578372-ix33x5566UoMw3sCwzoA9XXo"
);
const app = new App({
  signingSecret: "f465a5f67d0e88b4d8808355926fbbcd",
  token: "xoxb-3567025960769-3561336578372-ix33x5566UoMw3sCwzoA9XXo",
  socketMode: true,
  appToken:
    "xapp-1-A03GH9V2KEG-3556070383973-ff404f78d147b7b2fb4153fa7fa7dc9abf65564311d81c434140ad10b1e500d8",
  port: 3000,
});


app.shortcut("open_modal", async ({ ack, payload, client }) => {
  ack();
  try {
    const result = await client.views.open({
      trigger_id: payload.trigger_id,
      view: texttypemodal,
    });
  } catch (error) {
    console.error(error);
  }
});
app.view("modal-identifier", async ({ ack, view }) => {
  const submittedValues = view.state.values;
  try {
    const res = await ack({ response_action: "update", view: submitmodal });
    console.log("res ", res);
  } catch (err) {
    console.error(`Error submitting Thing B modal:`);
    console.error(err);
  }
  console.log(submittedValues);
});

app.view("submitted-form", async ({ ack, view, client }) => {
  const submittedValues = view.state.values;
  console.log(submittedValues);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0);
  
  try {
     await client.chat.scheduleMessage({
      channel: "#general",
      text: "Looking towards the future",
      post_at: Number.parseInt(tomorrow.getTime()/1000),
    });
    ack()
  } catch (error) {
    console.error(error);
  }
});

app.command("/schedule", async ({ command, ack, respond, client, payload }) => {
  ack();
  try {
    const result = await client.views.open({
      trigger_id: payload.trigger_id,
      view: texttypemodal,
    });
  } catch (error) {
    console.error(error);
  }
});

app.event("submit", async ({ body, ack, say }) => {
  console.log(body);
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

app.message("hello", async ({ message, say }) => {
  //   console.log(message);
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey there <@${message.user}>!`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me",
          },
          action_id: "button_click",
        },
      },
    ],
    text: `Hey there <@${message.user}>!`,
  });
});
app.start(3000).then(() => {
  console.log("Server started");
});
