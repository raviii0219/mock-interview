const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blackList.model")
async function authUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "token not verified"
        })
    }
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })
    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "token is invalid"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()

    }
    catch (err) {
        return res.status(401).json({
            message: "invalid toekn."
        })
    }
}
module.exports = { authUser }