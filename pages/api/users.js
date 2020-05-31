import nextConnect from "next-connect";
import middleware from "../../lib/middleware/database";

const handler = nextConnect();

//use middleware to connect to mongodb
handler.use(middleware);

//Dummy Users for Testing
const testUsers = {
  users: [
    {
      id: "USLACKBOT",
      name: "slackbot",
      real_name: "Slackbot",
      display_name: "Slackbot",
      first_name: "slackbot",
      last_name: "",
      image_72: "https://a.slack-edge.com/80588/img/slackbot_72.png",
      team: "T014960QJ3G",
    },
    {
      id: "U014FTSM1V0",
      name: "workoschallengedavidb",
      real_name: "workoschallengedavidb",
      display_name: "",
      image_72:
        "https://secure.gravatar.com/avatar/c6d4b6e4d6953f3da9f6ee87980af2c5.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0000-72.png",
      team: "T014960QJ3G",
    },
    {
      id: "U014UGGGJTT",
      name: "davidbui.psd",
      real_name: "davidbui.psd",
      display_name: "",
      image_72:
        "https://secure.gravatar.com/avatar/4b004b04f0509db20692a75f44741225.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0022-72.png",
      team: "T014960QJ3G",
    },
  ],
};

handler.get(async (req, res) => {
  try {
    const { body, method, db } = req;

    res.statusCode = 200;
    res.json(testUsers);
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.send();
  }
});

export default handler;
