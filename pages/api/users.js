import nextConnect from "next-connect";
import middleware from "../../lib/middleware/database";

import getUsers from "../../lib/api/getUsers";
import updateUser from "../../lib/api/updateUser";

const handler = nextConnect();

//use middleware to connect to mongodb
handler.use(middleware);

//Dummy Users for Testing

handler.get(async (req, res) => {
  try {
    const { db } = req;
    const users = await getUsers(db);
    res.statusCode = 200;
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).end(`INTERNAL SERVER ERROR`);
  }
});

//handle slack challnge when needed
handler.post(async (req, res) => {
  try {
    const { body, db } = req;

    //if this is verifying a new url, return with the challenge
    if (body.challenge) {
      res.statusCode = 200;
      res.json({ challenge: body.challenge });
    } else {
      //reject if wrong token
      //TODO: update to new slack auth
      if (body.token === process.env.SLACKEVENTTOKEN) {
        const { event } = body;
        updateUser(event, db).then(() => {
          //return sucessful event
          res.status(200).end("Sucessfully updated or created user");
        });
      } else {
        res.status(401).end("UNAUTHORIZED USER");
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).end(`INTERNAL SERVER ERROR`);
  }
});

export default handler;
