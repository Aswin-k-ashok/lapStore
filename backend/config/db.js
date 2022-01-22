import mongoose  from "mongoose";
import colours from "colors";

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,

        })

        console.log(`mongo db connected : ${conn.connection.host}`.bold.blue)

    } catch (error) {
        console.log(`ERROR : ${error.message}`.yellow.bold)
        process.exit(1)
    }
}

export default connectDB