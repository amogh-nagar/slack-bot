const texttypemodal = {
  type: "modal",
  callback_id: "modal-identifier",
  title: {
    type: "plain_text",
    text: "Schedule messages",
    emoji: true,
  },
  submit: {
    type: "plain_text",
    text: "Next",
    emoji: true,
  },
  close: {
    type: "plain_text",
    text: "Cancel",
    emoji: true,
  },
  blocks: [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "You can personalize your personalize your message using the following substitutions {fullName},{firstName},{lastName}",
        emoji: true,
      },
    },
    {
      type: "input",
      element: {
        type: "plain_text_input",
        multiline: true,
        action_id: "plain_text_input-action",
      },
      label: {
        type: "plain_text",
        text: "Write your message",
        emoji: true,
      },
      block_id: "textfield",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Recepients",
      },
      accessory: {
        type: "multi_conversations_select",
        placeholder: {
          type: "plain_text",
          text: "Select conversations",
          emoji: true,
        },
        action_id: "multi_conversations_select-action",
      },

      block_id: "recepients",
    },
  ],
};

const submitmodal = {
  type: "modal",
  callback_id: "submitted-form",
  title: {
    type: "plain_text",
    text: "Schedule messages",
    emoji: true,
  },
  submit: {
    type: "plain_text",
    text: "Schedule",
    emoji: true,
  },
  close: {
    type: "plain_text",
    text: "Cancel",
    emoji: true,
  },
  blocks: [
    {
      type: "input",
      element: {
        type: "plain_text_input",
        multiline: true,
        action_id: "plain_text_input-action",
      },
      label: {
        type: "plain_text",
        text: "Your message",
        emoji: true,
      },
      block_id: "inputfield",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Configurations",
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "Select the date and time in past if you want to send message imeediately.",
        },
      ],
    },
    {
      type: "input",
      element: {
        type: "datepicker",
        initial_date: "1990-04-28",
        placeholder: {
          type: "plain_text",
          text: "Select a date",
          emoji: true,
        },
        action_id: "datepicker-action",
      },
      label: {
        type: "plain_text",
        text: "When do you want to send message?",
        emoji: true,
      },
      block_id: "datefield",
    },
    {
      type: "input",
      element: {
        type: "timepicker",
        initial_time: "13:37",
        placeholder: {
          type: "plain_text",
          text: "Select time",
          emoji: true,
        },
        action_id: "timepicker-action",
      },
      label: {
        type: "plain_text",
        text: "Select time",
        emoji: true,
      },
      block_id: "timefield",
    },
    {
      type: "input",
      block_id: "multifield",

      element: {
        type: "multi_static_select",
        placeholder: {
          type: "plain_text",
          text: "Select options",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "*this is plain_text text*",
              emoji: true,
            },
            value: "value-0",
          },
          {
            text: {
              type: "plain_text",
              text: "*this is plain_text text*",
              emoji: true,
            },
            value: "value-1",
          },
          {
            text: {
              type: "plain_text",
              text: "*this is plain_text text*",
              emoji: true,
            },
            value: "value-2",
          },
        ],
        action_id: "multi_static_select-action",
      },
      label: {
        type: "plain_text",
        text: "Label",
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Learn more about timezone adjustmentst and <https://google.com|how it works>",
      },
    },
    {
      type: "input",
      block_id: "radiofield",
      element: {
        type: "radio_buttons",
        options: [
          {
            text: {
              type: "plain_text",
              text: "Send as @Daniel",
              emoji: true,
            },
            value: "value-0",
          },
          {
            text: {
              type: "plain_text",
              text: "Send as @LocalApp",
              emoji: true,
            },
            value: "value-1",
          },
        ],
        action_id: "radio_buttons-action",
      },
      label: {
        type: "plain_text",
        text: "Sender",
        emoji: true,
      },
    },
  ],
};

module.exports = {
  texttypemodal,
  submitmodal,
};
