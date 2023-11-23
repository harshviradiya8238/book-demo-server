const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        console.log("MongoDB Connected")
    } catch (error) {
        console.error(error)
    }

}


module.exports = connectDB
