import e from "express";
import connectDB from "./db/database.js";
import userRoute from "./router/userRoute.js"
import cookieParser from "cookie-parser";
const port = process.env.PORT
const app = e()

app.use(cookieParser())
app.use(e.json())

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log('App Running on', port)
    })
})

app.use(userRoute)