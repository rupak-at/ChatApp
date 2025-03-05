import jwt from "jsonwebtoken"

const verifyLogin = (req, res, next) => {
    try {
        //taking cookie from user
        const token = req.cookies?.refreshToken || req.header('Authorization')?.replace('Bearer ','') 

        if (!token) {
            return res.status(401).json('No Token Found')
        }
        //checking the token
        const verifyToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

        if (!verifyToken) {
            return res.status(403).json({message: 'Invalid Token'})
        }
        //sending id to the next router /logout
        req.userID = verifyToken._id 
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal Failure'})
    }


}

export default verifyLogin