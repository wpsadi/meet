import { ComparePass, HashPass } from "../Hashing";
import { getUser } from "./getUser";

export const verifyAccount = async (email,password)=>{
    try{
        const fetchUser = await getUser(email)

        if (fetchUser.success==false){
            return fetchUser
        }

        if (fetchUser.found==false){
            return {
                success:false,
                msg:"User doesn't exist"
            }
        }

        const savedHashPass = fetchUser.user.password
        const isPassCorrect = ComparePass(password,savedHashPass)

        if (!isPassCorrect){
            return {
                success:false,
                msg:"Password doesn't match"
            }
        }
        
        return {
            success:true,
            msg:"User Verified",
            user:fetchUser.user
        }



    }
    catch(e){
        return {
            success:false,
            msg: `Error occured while checking if the the user already exists accompied by verifying passowrd or not. \nError faces is as follws : \n\n ${e.message}`
        }
    }

}