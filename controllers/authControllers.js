const { OTPMailTemp } = require("../helpers/emailTemplates");
const { mailSender } = require("../helpers/mailService");
const { isValidEmail, generateOTP } = require("../helpers/utils");
const userSchema = require("../models/userSchema");

const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName)
      return res.status(400).send({ message: "FullName is required." });
    if (!email) return res.status(400).send({ message: "Email is required." });
    if (!isValidEmail(email))
      return res.status(400).send({ message: "Email is not valid." });
    if (!password)
      return res.status(400).send({ message: "Password is required." });
  

    
    const existEmail = await userSchema.findOne({ email });
    if (existEmail)
      return res.status(400).send({ message: "This email already exist." });
    const otp = generateOTP();
    const user = userSchema.create({
      fullName,
      email,
      password,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });
    mailSender({
      email,
      subject: "Verify your OTP",
      template: OTPMailTemp(otp),
    });
    res
      .status(200)
      .send({ message: "Registration successfully, verify your email" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error." });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!otp) return res.status(400).send({ message: "OTP Code is required" });
    const userData = await userSchema.findOneAndUpdate(
      { email, otp, otpExpiry: { $gt: Date.now() }, isVerified: false },
      {
        $set: {
          isVerified: true,
          otp: null,
          otpExpiry: null,
        },
      },
      {
        returnDocument: "after",
      },
    );
    if (!userData) {
      return res.status(400).send({ message: "Invalid Request" });
    }
   
    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error." });
  }
};

module.exports = { signUp, verifyOtp};
