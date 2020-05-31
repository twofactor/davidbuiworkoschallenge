import nextConnect from "next-connect";
import middleware from "../../lib/middleware/database";

const handler = nextConnect();

//use middleware to connect to mongodb
handler.use(middleware);

handler.get(async (req, res) => {
  res.statusCode = 200;
  res.json({ name: "John Doe" });
});

export default handler;
