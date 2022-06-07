import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';

// Register User

export const registerUser = async (req, res) => {
  const {username, password, firstname, lastname, pronoun} = req.body;

  const salt =await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(password, salt)

  const newUser = new UserModel({username, password: hashedPass, firstname, lastname, pronoun})

  try {
    await newUser.save()
    res.status(200).json(newUser)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

// login user

export const loginUser = async (req, res) => {
  const {username, password} = req.body
  try {
    const user = await UserModel.findOne({username: username})
    if(user) {
      const validity = await bcrypt.compare(password, user.password)

      validity ? res.status(200).json(user) : res.staus(400).json("Wrong password")
    }
    else {
      res.status(404).json("User does not exost")
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}