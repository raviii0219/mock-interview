const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected db successfully")
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = connectDB;