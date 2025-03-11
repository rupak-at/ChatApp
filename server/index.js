import e from "express";
import connectDB from "./db/database.js";
import userRoute from "./router/userRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors";
const port = process.env.PORT
const app = e()


connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log('App Running on', port)
    })
})

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'DELETE', 'PATCH'],
    credentials: true
}))
app.use(cookieParser())
app.use(e.static('public'))
app.use(e.urlencoded({extended: true}))
app.use(e.json())


app.use(userRoute)

