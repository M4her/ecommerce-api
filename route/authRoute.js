const express = require("express");
const { signUp, verifyOtp, resendOtp } = require("../controllers/authControllers");
const route = express.Router();

route.post("/signup", signUp);
route.post("/verify-email", verifyOtp);
route.post("/resend-otp", resendOtp)

module.exports = route;
