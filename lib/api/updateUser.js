import assert from "assert";

export default async function updateUser(event, db) {
  const usersCollection = await db.collection("users");
  const { type, user } = event;

  if (type === "user_change" || type === "team_join") {
    console.log("updating database");
    usersCollection.updateOne(
      { id: user.id },
      { $set: user },
      {
        upsert: true,
      },
      function (err, r) {
        assert.equal(null, err);
        assert.equal(1, r.matchedCount);
        assert.equal(1, r.modifiedCount);
      }
    );
  }

  return "Success";
}
