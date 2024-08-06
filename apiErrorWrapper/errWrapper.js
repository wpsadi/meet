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

export const errWrapperNext = (req,next,fn,store)=>{
    try{
        if (!req instanceof NextRequest){
            throw new Error("req is not an instance of NextRequest")
        }
        // if (isAsync){
            return  fn(req,next,store)
        // }
       
    }catch(err){
        return errResponder(err)
    }
}

export const errWrapperNextAsync =async (req,next,store,fn)=>{
    try{
        if (!req instanceof NextRequest){
            throw new Error("req is not an instance of NextRequest")
        }
        // if (isAsync){
            return await fn(req,next,store)
        // }
       
    }catch(err){
        return errResponder(err)
    }
}