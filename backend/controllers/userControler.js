import asyncHanlder from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

//@desc....Auth user & get token
//@route....GET /api/users/login
//@access....Public
const authUser = asyncHanlder(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invaid email or password")
  }
})

//@desc....get user profile
//@route....GET /api/users/profile
//@access....Private
const getUserProfile = asyncHanlder(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error("User not found")
  }
})

export { authUser, getUserProfile }
