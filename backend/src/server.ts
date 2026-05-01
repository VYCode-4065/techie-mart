import { configDotenv } from "dotenv";
import http from 'http'
import app from "./app.js";

configDotenv()

const PORT = process.env.PORT || 5000 

http.createServer(app).listen(PORT,3,()=>{
    console.log(`Server running successfully at PORT ${PORT}`)
})