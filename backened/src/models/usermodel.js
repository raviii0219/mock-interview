const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "username already taken"],
        required: true,
    },
    email: {
        type: String,
        unique: [true, "Account already exists with this email address"],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "student"
    },
    skills: [String],
    profilePhoto: String,
    totalScore: {
        type: Number,
        default: 0
    },
    faceDescriptor: {
        type: [Number],
        default: [],
    },
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;