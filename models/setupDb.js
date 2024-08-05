import { db } from "@/config/AWconfig.js";
import { EmailVerificationModel } from "./VerificationCollection.js";
import { UserModel } from "./UserCollection.js";

async function CreateDB() {
  // Create the database
  await db.create(process.env.DbId, process.env.DbId, true);
}

export const setupDb = async () => {
  try {
    await db.get(process.env.DbId);
    console.log("Database already exists! Ok to proceed");
    return db
  } catch (e) {
    try {
      // console.log(e.message);
      await CreateDB();
      console.log("Database Created");

      // Creating Collections
      await Promise.all([
        EmailVerificationModel(),
        UserModel(),
      ]);
      console.log("Collections Created");
      return db
    } catch (e) {
      console.log("Error in creating the database : ", e.message);
    }
  }
};
