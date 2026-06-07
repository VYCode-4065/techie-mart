import express, { type Application, type NextFunction, type Request, type Response } from "express";
import cors from 'cors'
import helmet from "helmet";
import cookieParser from 'cookie-parser'
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import { upload} from "./middleware/upload.middleware.js";
import multer from "multer";

const app:Application = express();

process.on('uncaughtException',(err)=>{
    console.log(`A uncought exception occured at server .\n ${err.message} \n Closing the server....`)
    process.exit(1);
})

process.on('unhandledRejection',(res)=>{
    console.log(`Unhandled rejection due to ${res}`)
})

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:'*',
    credentials:true
}))
app.use(helmet({
    crossOriginResourcePolicy:true
}))


app.use('/api/v1/user',userRouter)
app.use('/api/v1/product', productRouter)

app.get('/',(req,res)=>{

    return res.status(200).json({
        message:'Everthing cool sir.'
    })
})


app.use((err:any,req:Request,res:Response,next:NextFunction)=>{

    console.log(err)
    return res.status(400).json({
        message:'Error handled successfully ! '+err.message,
        data:err
    })
})

export default app;