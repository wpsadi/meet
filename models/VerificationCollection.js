import AppError from "@/apiErrorWrapper/errHandler";
import { db } from "@/config/AWconfig.js";
import { Permission } from "node-appwrite";

export const EmailVerificationModel = async ()=>{
    try{
        await db.createCollection(process.env.DbId,process.env.verificationCollectionId,process.env.verificationCollectionId);
        console.log(`${process.env.verificationCollectionId} Collection Created`);

        // Creating User Attributes
        await Promise.all([
            db.createBooleanAttribute(process.env.DbId,process.env.verificationCollectionId,"isVerified",false,false),
        ])

        console.log(`Attributes Created for ${process.env.verificationCollectionId} Collection`);

    }catch(e){
        new AppError(`Error in creating ${process.env.verificationCollectionId} collection`,500);
        console.log(`Error in creating ${process.env.verificationCollectionId} collection : ${e.message}`);
    } 
}