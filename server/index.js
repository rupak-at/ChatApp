import e from "express";
import connectDB from "./db/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./router/userRoute.js"
import singleChatRoute from "./router/singleChatRoute.js"
import groupChatRoute from "./router/groupRoute.js"
import friendRequest from "./router/friendRequestRoute.js";
import atomRoute from "./router/singleChatRoute.js"


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
// chat routes
app.use("/user",singleChatRoute)
app.use("/group",groupChatRoute)
app.use("/request", friendRequest)
app.use("/atom", atomRoute)

