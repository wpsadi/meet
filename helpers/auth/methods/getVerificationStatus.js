import { setupDb } from "@/models/setupDb";

export const GetEmailVerificationStatus =async (email)=>{
    const userId = email.replaceAll("@", "_")

    try {
        let user = await (await setupDb()).getDocument(
            process.env.DbId,
            process.env.verificationCollectionId,
            userId
        );

        const verificationStatus = user.isVerified

        if (!verificationStatus){
            return {
                success: true,
                msg: "User found",
                found: true,
                is_verified:false
            }
        }


        return {
            success: true,
            msg: "User found",
            found: true,
            is_verified:true
        }

    } catch (e) {
        if (e.message == "Document with the requested ID could not be found.") {
            return {
                success: true,
                found: false,
                msg: "User doesn't exist"
            }
        }
        return {
            success: false,
            msg: `Error occured while checking if the the user already exists or not. \nError faces is as follws : \n\n ${e.message}`
        }
    }
}