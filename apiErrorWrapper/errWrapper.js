import { NextRequest, NextResponse } from "next/server"
import { errResponder } from "./errResponder"

export const errWrapper = (req,fn)=>{
    try{
        if (!req instanceof NextRequest){
            throw new Error("req is not an instance of NextRequest")
        }
        // if (isAsync){
            return  fn(req)
        // }
       
    }catch(err){
        return errResponder(err)
    }
}

export const errWrapperAsync =async (req,fn)=>{
    try{
        if (!req instanceof NextRequest){
            throw new Error("req is not an instance of NextRequest")
        }
        // if (isAsync){
            return await fn(req)
        // }
       
    }catch(err){
        return errResponder(err)
    }
}

