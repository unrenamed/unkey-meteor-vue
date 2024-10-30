import { verifyKey } from "@unkey/api";
import { Meteor } from "meteor/meteor";

async function loginWithApiKey(apiKey) {
  const { result, error } = await verifyKey({
    key: apiKey,
    apiId: Meteor.settings.env.UNKEY_API_ID,
  });

  if (error) {
    console.error(error);
    throw new Meteor.Error("unauthorized", "Unauthorized");
  }

  if (!result.valid) {
    throw new Meteor.Error("invalid-api-key", "Key is invalid or expired");
  }

  const username = result.ownerId;

  if (!username || username.length === 0) {
    throw new Meteor.Error("invalid-api-key", "Key has no info about owner");
  }

  // Find or create a Meteor user with a unique identifier from Unkey
  const userId =
    (await Accounts.findUserByUsername(username))?._id ||
    (await Accounts.createUserAsync({ username }));

  // Log the user in by setting the user's ID in the session
  this.setUserId(userId);

  return userId;
}

Meteor.methods({ loginWithApiKey });
