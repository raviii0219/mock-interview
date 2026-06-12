const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    userId: String,

    role: String,

    question: String,

    answer: String,

    feedback: String,

    score: Number,
});
module.exports = mongoose.model("Interview", interviewSchema);
