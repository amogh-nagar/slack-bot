const { App } = require("@slack/bolt");
const { submitmodal } = require("./modal_intergface");

const app = new App({
  signingSecret: "2bf3812aff2f6b9569ed61009a0f49d9",
  token: "xoxb-3567025960769-3558628457570-AyYO8cfKdGkNjRMjvO5HQbGp",
  socketMode: true,
  appToken:
    "xapp-1-A03GEJE3D18-3551998309286-2d05b6ed042932b73b75b4aaf72ffa5219032464454feb7d1e42973137e23b0f",
  port: 3000,
});





app.shortcut("open_modal", async ({ ack, payload, client }) => {
  ack();

  try {
    const result = await client.views.open({
      trigger_id: payload.trigger_id,
      view: submitmodal
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

app.message("hello", async ({ message, say }) => {
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
