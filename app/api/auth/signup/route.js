import AppError from "@/apiErrorWrapper/errHandler"
import { errWrapperAsync } from "@/apiErrorWrapper/errWrapper"
import { HashPass } from "@/helpers/auth/Hashing"
import { createSessionCookie } from "@/helpers/auth/methods/createSessionCookie"
import { UserCreateVal } from "@/helpers/auth/validators/UserCreateVal"
import zodParseErrors from "@/helpers/auth/validators/zodErrorParser"
import { setupDb } from "@/models/setupDb"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const POST =  (request)=>errWrapperAsync(request,async (request)=>{
    const body = await request.json()

    const {email,password} = body


    if (!email || !password){
        throw new AppError("Provide the required fields",400)
    }

    const userData = {
        email: email,
        role: "user",
        password: password,
      };

      const safeData = await UserCreateVal.safeParseAsync(userData);

      if (!safeData.success) {
        // const errorMessage = zodParseErrors(safeData.error);
        throw new AppError(safeData.error, 400);
      }

  

      const userId = safeData.data.email.replaceAll("@", "_");

      const encryptPass = HashPass(safeData.data.password)


       await (await setupDb()).createDocument(
        process.env.DbId,
        process.env.verificationCollectionId,
        userId,
        {
          isVerified: false,
        }
      );
      const user = await (await setupDb()).createDocument(
        process.env.DbId,
        process.env.userCollectionId,
        userId,
        {
          email: safeData.data.email,
          password: encryptPass,
          role: safeData.data.role,
          email_verification: userId, // this is for a relation with the email verification collection
          
        }
      );

      const responseUserData={
        email: safeData.data.email,
        // password: encryptPass,
        role: safeData.data.role,
        email_verification: false, // this only tells us that the user has not verified their email
        
    }

    const sessionCookie = createSessionCookie(responseUserData)

    cookies().set(...sessionCookie)

      return NextResponse.json({
        success:true,
        msg:"User Created! Check you mailbox and click on the link to verify your email [ Not Implemented ]",
        user:responseUserData
    });



      

})