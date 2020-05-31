import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(process.env.MONGODBCONNECTIONSTRING, {
  useNewUrlParser: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db("test");
  console.log("Connected To Database");
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
