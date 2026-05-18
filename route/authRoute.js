const express = require("express");
const { signUp, verifyOtp, resendOtp, signIn, getProfile } = require("../controllers/authControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const route = express.Router();

route.post("/signup", signUp);
route.post("/verify-email", verifyOtp);
route.post("/resend-otp", resendOtp)
route.post("/signin", signIn)
route.get("/getprofile", authMiddleware, getProfile);

module.exports = route;
