import assert from "assert";

export default async function updateUser(event, db) {
  const usersCollection = await db.collection("users");
  const { type, user } = event;

  if (type === "user_change" || type === "team_join") {
    usersCollection.updateOne(
      { id: user.id },
      { $set: user },
      {
        upsert: true,
      }
    );
  }

  return "Success";
}
