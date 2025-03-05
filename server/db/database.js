import mongoose from 'mongoose'
import {configDotenv} from 'dotenv'

configDotenv()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB Connected @@@')
    } catch (error) {
        console.error( 'Connection Failed: ', error);
    }
}

export default connectDB