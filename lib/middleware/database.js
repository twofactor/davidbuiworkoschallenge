//middleware to connect to mongodb when a request is made
import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(process.env.MONGODBCONNECTIONSTRING, {
  useNewUrlParser: true,
});

async function database(req, res, next) {
  try {
    if (!client.isConnected()) await client.connect();
    req.dbClient = client;
    req.db = client.db("slackusers");
    return next();
  } catch (e) {
    throw new Error(e);
  }
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
