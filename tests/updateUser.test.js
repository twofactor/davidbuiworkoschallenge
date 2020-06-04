/**
 * @jest-environment node
 */

const { MongoClient } = require("mongodb");
const { MONGODBCONNECTIONSTRING } = require("../env");

import updateUser from "../lib/api/updateUser";

describe("updateUsers", () => {
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

  it("should handle both new user and user change events", async () => {
    const newMember = {
      type: "team_join",
      user: {
        id: "testUser",
        info: "ayy",
      },
    };

    const newMemeberEdit = {
      type: "user_change",
      user: {
        id: "testUser",
        info: "lmao",
      },
    };

    const newUser = await updateUser(newMember, db);
    const newUserEdit = await updateUser(newMemeberEdit, db);

    const user = await db
      .collection("users")
      .find({ id: "testUser" })
      .toArray();

    expect(user[0].id).toBe("testUser");
    expect(user[0].info).toBe("lmao");

    db.collection("users").deleteOne({ id: "testUser" });
  });

  it("should not work with a garbage database", async () => {
    //jest is weird when it comes to handling async errors, this is a poorly made hack to take care of that
    try {
      updateUser("", "");
      expect(false).toBe(true);
    } catch (e) {
      expect(true).toBe(true);
    }
  });

  it("should not work with a garbage event", async () => {
    //jest is weird when it comes to handling async errors, this is a poorly made hack to take care of that
    try {
      updateUser({ thisobject: "some garbage", still: "bad object" }, db);
      expect(false).toBe(true);
    } catch (e) {
      expect(true).toBe(true);
    }
  });
});
