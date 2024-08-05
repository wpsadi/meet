import { NextResponse } from "next/server";

export const errResponder = async (err) => {
    
    let msg = err.message || "Something broke!";
    try{
        msg = JSON.parse(msg);

    }catch(e){
        null
    }

    const status = err.statusCode || 500;
    return NextResponse.json({
        success:false,
        msg
    },{
        status
    })
    }
