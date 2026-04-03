import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signUp = async (req, res) => {
  try {
    let { firstName, lastName, userName, email, password } = req.body;

    if (!firstName || !lastName || !userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let existUserName = await User.findOne({ userName });
    if (existUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword
    });

    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production"
    });

    user.password = undefined;

    return res.status(201).json({
      message: "User created successfully",
      user,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "signup error" });
  }
};







export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production"
    });

    user.password = undefined;

    return res.status(200).json({
      message: "User loggedIn successfully",
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "login error" });
  }
};



export const logout = async (req, res) => {
    try{
        res.clearCookie("token")
            return res.status(200).json({message:"User logged out successfully"})
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "logout error" });
    }
}