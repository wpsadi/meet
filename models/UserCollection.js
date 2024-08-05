
import {

  Query,
  RelationMutate,
  RelationshipType,
} from "node-appwrite";
import AppError from "@/apiErrorWrapper/errHandler";;
import { db } from "@/config/AWconfig.js";


export const UserModel = async () => {
  try {
    await db.createCollection(
      process.env.DbId,
      process.env.userCollectionId,
      process.env.userCollectionId
    );
    console.log(`${process.env.userCollectionId} Collection Created`);
    // Creating User Attributes
    await Promise.all([
      db.createEmailAttribute(process.env.DbId, process.env.userCollectionId, "email", true),
      db.createEnumAttribute(
        process.env.DbId,
        process.env.userCollectionId,
        "role",
        ["admin", "user"],
        true
      ),
      db.createStringAttribute(
        process.env.DbId,
        process.env.userCollectionId,
        "password",
        128,
        true
      ),
      db.createRelationshipAttribute(
        process.env.DbId,
        process.env.userCollectionId,
        process.env.verificationCollectionId,
        RelationshipType.OneToOne,
        true,
        "email_verification",
        RelationMutate.Cascade
      ),
    ]);

    console.log(`Attributes Created for ${process.env.userCollectionId} Collection`);
  } catch (e) {
    new AppError(`Error in creating ${process.env.userCollectionId} collection`, 500);
    console.log(
      `Error in creating ${process.env.userCollectionId} collection : ${e.message}`
    );
  }
};

