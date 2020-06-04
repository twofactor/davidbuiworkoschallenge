//updates a user in the database, or creates a new one
//recieves an event from slack's Events API
export default async function updateUser(event, db) {
  if (!db || !event.user || !event.type) {
    throw new Error("invalid input");
  }
  const usersCollection = await db.collection("users");
  const { type, user } = event;

  if (type === "user_change" || type === "team_join") {
    const update = await usersCollection.updateOne(
      { id: user.id },
      { $set: user },
      {
        upsert: true,
      }
    );

    return update;
  } else {
    throw new Error("invalid event");
  }
}
