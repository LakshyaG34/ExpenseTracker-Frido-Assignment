import Auth from "../models/auth.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/authentication.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await Auth.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Auth.create({
      name,
      email,
      password: hashedPassword,
    });
    

    res.status(201).json({ newUser, message: "Registered Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "User Does not exists" });
    }

    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) {
      return res.status(400).json({ message: "Wrong Passwords" });
    }
    generateTokenAndSetCookie(user.id, res);

    res.status(201).json({ user, message: "Login Successfully" });
    console.log(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async(req, res) =>{
  try{
    const token = await req.cookies?.jwt;
    if(token)
    {
      res.clearCookie("jwt",{
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
    }
    res.status(200).json({message : "Logged Out"})
  }
  catch(err)
  {
    console.log(err);
    res.status(500).json({Error : "Internal Server Error"})
  }
}

export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not authorized" });
    }
    res.status(200).json({ user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const allUsers = await Auth.find().select("name email _id");
    res.status(200).json(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

