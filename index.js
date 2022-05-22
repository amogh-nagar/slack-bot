const { App } = require("@slack/bolt");
const { submitmodal, texttypemodal } = require("./modal_intergface");
const { WebClient } = require("@slack/web-api");
const web = new WebClient(
  "xoxb-3567025960769-3561336578372-ix33x5566UoMw3sCwzoA9XXo"
);

var channel;

const app = new App({
  signingSecret: "f465a5f67d0e88b4d8808355926fbbcd",
  token: "xoxb-3567025960769-3561336578372-JOPy1d9wErRPxO2TYrY1Gq5d",
  socketMode: true,
  appToken:
    "xapp-1-A03GH9V2KEG-3572530203425-bf5149e4cb01674e8a2a93a7847e54ecdf6cb9b624798ab800529c4e93104c23",
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
  channel =
    submittedValues.recepients["multi_conversations_select-action"][
      "selected_conversations"
    ];

  console.log(channel);
  if (!channel || channel.length == 0) {
   await ack({
      response_action: "errors",
      errors: 
         "Please select at least one channel",
      
    });
    return;
  }
  try {
    const res = await ack({ response_action: "update", view: submitmodal });
    console.log("res ", res);
  } catch (err) {
    console.error(`Error submitting Thing B modal:`);
    console.error(err);
  }
  console.log(submittedValues);
});


let usersStore = {};
app.view("submitted-form", async ({ ack, view, client }) => {
  const submittedValues = view.state.values;
  console.log(submittedValues);

  var dateParts =
    submittedValues["datefield"]["datepicker-action"]["selected_date"].split(
      "-"
    );
  console.log(+dateParts[1]);
  const tomorrow = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
  tomorrow.setHours(
    +submittedValues["timefield"]["timepicker-action"]["selected_time"].split(
      ":"
    )[0],
    +submittedValues["timefield"]["timepicker-action"]["selected_time"].split(
      ":"
    )[1],
    0
  );
  console.log(tomorrow.getTime());
  try {
    console.log(channel);
    if (!channel || channel.length == 0) {
      console.log(";helo");
      ack({
        response_action: "errors",
        errors: {
          field: "error",
          "error-message": "Please select at least one channel",
        },
      });
      return;
    }
    channel.forEach(async (channelid) => {
      await client.chat.scheduleMessage({
        channel: channelid,
        text: `Hi @${firs} ${submittedValues["inputfield"]["plain_text_input-action"]["value"]}`,
        post_at: Number.parseInt(tomorrow.getTime() / 1000),
      });
    });

    ack();
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
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});


function saveUsers(usersArray) {
  let userId = "";
  usersArray.forEach(function (user) {
    userId = user["id"];

    usersStore[userId] = user;
  });
}

app.message("getallschedulers", async ({ message, say, client }) => {
  try {
    const result = await client.chat.scheduledMessages.list({});

    for (const message of result.scheduled_messages) {
      console.log(message);
    }
  } catch (error) {
    console.error(error);
  }
});

app.message("getallusers", async ({ message, say, client }) => {
  var x = await client.users.profile.get({
    token: "xoxb-3567025960769-3561336578372-JOPy1d9wErRPxO2TYrY1Gq5d",
  });
  console.log(x);

  try {
    const result = await client.users.list();

    saveUsers(result.members);
  } catch (error) {
    console.error(error);
  }
  console.log(usersStore);
});

app.message("hello", async ({ message, say, client }) => {
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
