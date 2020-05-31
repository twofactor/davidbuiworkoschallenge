import nextConnect from "next-connect";
import middleware from "../../lib/middleware/database";

import getUsers from "../../lib/api/getUsers";

const handler = nextConnect();

//use middleware to connect to mongodb
handler.use(middleware);

//Dummy Users for Testing

handler.get(async (req, res) => {
  try {
    const { body, method, db } = req;
    switch (method) {
      case "GET": {
        const users = await getUsers(db);
        res.statusCode = 200;
        res.json(users);
        break;
      }
      case "POST": {
        console.log("Post Request");
        break;
      }
      default: {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).end(`INTERNAL SERVER ERROR`);
  }
});

export default handler;
