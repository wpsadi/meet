const { setupDb } = require("@/models/setupDb")

export const CheckEmailAlreadyExist = async (email)=>{
    try{
        if (typeof email !== "string"){
            return {
                success:false,
                msg:"Email should be a string"
            }
        }

        const userId = email.replaceAll("@","_")

        try{
            const result =await (await setupDb()).getDocument(
                process.env.DbId,
                process.env.userCollectionId,
                userId
            )

            return {
                success:true,
                present:true,
                msg:"Email already exists"
            }
        }
        catch(e){
            if (e.message == "Document with the requested ID could not be found.") {
                return {
                    success:true,
                    present:false,
                    msg:"New User's email"
                }
              }
              throw new Error(e)
          
        }

    }catch(e){
        return {
            success:false,
            msg: `Error occured while checking if the the user already exists or not. \nError faces is as follws : \n\n ${e.message}`
        }
    }



}