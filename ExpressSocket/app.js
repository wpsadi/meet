import cookieParser from "cookie-parser";
import express from "express"
import { errMiddle } from "./middlewares/err.middle.js";
import cors from "cors"

const app = express();

// default middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


// Universal Route
app.use("*",(req,res)=>{
    res.status(404).json({
        success:false,
        msg:"Route not found"
    })
})


app.use(errMiddle);


export default app