const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/usermodel");
const Interview = require("../models/interviewmodel");
const tokenBlacklistModel = require("../models/blackList.model");
const register = async (req, res) => {
    const { name, email, password } = req.body;
    // if (!name || !email || password) {
    //     return res.status(400).json({
    //         message: "please provide username , email and password"
    //     })
    // }
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ name }, { email }]
    })
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with the email or username"
        })
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        name, email, password: hashed
    });
    const token = jwt.sign({
        id: user._id, name: user.name
    },
        process.env.JWT_SECRET, { expiresIn: "1d" })
    res.cookie("token", token)
    res.status(201).json({
        message: "User created successfully",
        user
    })
}
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        email
    });
    if (!user) {
        return res.status(400).json({
            message: "Invalid email or user"
        })
    }
    const ispasword = await bcrypt.compare(password, user.password);
    if (!ispasword) {
        return res.status(401).json({
            message: "invalid credentials"
        })
    }
    const token = jwt.sign({
        id: user._id, name: user.name
    },
        process.env.JWT_SECRET, { expiresIn: "1d" })
    res.cookie("token", token)
    res.status(201).json({
        message: "User login successfully",
        user
    })
}
const logout = async (req, res) => {
    const token = req.cookies.token
    if (token) {
        await tokenBlacklistModel.create({ token })
    }
    res.clearCookie("token")
    res.status(200).json({
        message: "user logged out successfully"
    })

}
const getLeaderboard = async (req, res) => {
    const users = await userModel.find().sort({ totalScore: -1 }).limit(10);
    res.status(200).json({
        message: "leaderBoard fetched successfully",
        users
    })
}
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "user fetched successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
}
const getAdminStats = async (req, res) => {
    const users = await userModel.countDocuments();
    const interviews = await Interview.countDocuments();
    const totalScore = await userModel.aggregate([{ $group: { _id: null, total: { $sum: "$totalScore" } } }]);
    res.status(200).json({
        message: "Admin stats fetched successfully",
        users,
        interviews,
        totalScore: totalScore[0]?.total || 0
    });
}



module.exports = { register, userLogin, getLeaderboard, getAdminStats, logout, getMeController }