import assert from "assert";

const testUsers = {
  users: [
    {
      id: "USLACKBOT",
      name: "slackbot",
      profile: {
        real_name: "Slackbot",
        display_name: "Slackbot",
        first_name: "slackbot",
        last_name: "",
        image_72: "https://a.slack-edge.com/80588/img/slackbot_72.png",
        team: "T014960QJ3G",
      },
    },
    {
      id: "U014FTSM1V0",
      name: "workoschallengedavidb",
      profile: {
        real_name: "workoschallengedavidb",
        display_name: "",
        image_72:
          "https://secure.gravatar.com/avatar/c6d4b6e4d6953f3da9f6ee87980af2c5.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0000-72.png",
        team: "T014960QJ3G",
      },
    },
    {
      id: "U014UGGGJTT",
      name: "davidbui.psd",
      profile: {
        real_name: "davidbui.psd",
        display_name: "",
        image_72:
          "https://secure.gravatar.com/avatar/4b004b04f0509db20692a75f44741225.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0022-72.png",
        team: "T014960QJ3G",
      },
    },
  ],
};

export default async function getTasks(db) {
  const usersCollection = await db.collection("users");
  const users = await usersCollection.find({}).toArray();

  //if no users are in database, fetch users from slack api then add to database
  if (!users.length) {
    const slackUsersUri = `https://slack.com/api/users.list?token=${process.env.SLACKTOKEN}`;
    const { members } = await fetch(slackUsersUri).then((res) => res.json());

    usersCollection.insertMany(members);

    return members;
  }

  //if users are in database, simply return
  return users;
}
