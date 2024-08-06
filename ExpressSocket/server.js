import app from "./app.js";
import { config } from "dotenv";
config({path:".env.local"});

const PORT = process.env.ExpressPort || 3001

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

