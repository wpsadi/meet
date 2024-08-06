import { setupDb } from "@/models/setupDb";
import { GetEmailVerificationStatus } from "./getVerificationStatus";
import AppError from "@/apiErrorWrapper/errHandler";

export const verifyEmail = async (email) => {
    const userId = email.replaceAll("@", "_")

    const VerificationStatus = await  GetEmailVerificationStatus(email)
    if (!VerificationStatus){
        throw new AppError(VerificationStatus.msg)
    }
    if (!VerificationStatus.found){
        throw new AppError("User doesn't exist")
    }
    if (VerificationStatus.is_verified){
        throw new AppError("User already verified")
    }

        await await (await setupDb()).updateDocument(
            process.env.DbId,
            process.env.verificationCollectionId,
            userId,
            {
                isVerified:true
            }
        )

        return {
            success:true,
            msg:"Email Verified"
        }



    

    
}