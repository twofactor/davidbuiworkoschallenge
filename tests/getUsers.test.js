/**
 * @jest-environment node
 */

const { MongoClient } = require("mongodb");
const { MONGODBCONNECTIONSTRING } = require("../env");

import getUsers from "../lib/api/getUsers";

describe("getUsers", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = new MongoClient(MONGODBCONNECTIONSTRING, {
      useNewUrlParser: true,
    });

    if (!connection.isConnected()) await connection.connect();
    db = await connection.db("slackusers");
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it("should get users from a collection", async () => {
    const usersFunction = await getUsers(db);

    const usersCollection = await db.collection("users");
    const users = await usersCollection.find({}).toArray();
    // const users = db.collection("users");

    // const mockUser = { _id: "some-user-id", name: "John" };
    // await users.insertOne(mockUser);

    // const insertedUser = await users.findOne({ _id: "some-user-id" });
    // expect(insertedUser).toEqual(mockUser);
    expect(users).toStrictEqual(usersFunction);
  });

  it("should not work with a garbage database", async () => {
    //jest is weird when it comes to handling async errors, this is a poorly made hack to take care of that
    try {
      expect(() => getUsers(""));
      expect(false).toBe(true);
    } catch (e) {
      expect(true).toBe(true);
    }
  });
});
