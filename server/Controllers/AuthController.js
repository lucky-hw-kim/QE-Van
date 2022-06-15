import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();
// Register User

//Generate jwt for user
const generateJwt = (id, secretKey) => {
  return jwt.sign({id}, secretKey,{ expiresIn: '4h'})
}

export const registerUser = async (req, res) => {
  const { username, firstname, lastname, password, pronoun } = req.body;

  if (!username || !password || !firstname || !lastname)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await UserModel.findOne({ username: username }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  const salt = await bcrypt.genSalt(10)

  const hashedPass = await bcrypt.hash(password, salt);
  const newUser = new UserModel({
    username,
    password: hashedPass,
    firstname,
    lastname,
    pronoun,
  });

  const accessToken = generateJwt(username, process.env.ACCESS_TOKEN_SECRET)
  console.log(req.body)
  try {
    await newUser.save();
    res.status(200).json({newUser, accessToken});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// login user

export const loginUser = async (req, res) => {
  const {username, password} = req.body

  if(!username || !password) {
    return res
    .status(400)
    .json({ message: "Username and password are required." });
  }

  try {
    const user = await UserModel.findOne({username: username})

    if(user) {
      const validity = await bcrypt.compare(password, user.password)
      const accessToken = generateJwt(user.id, process.env.ACCESS_TOKEN_SECRET)

      validity ? res.status(200).json({user, accessToken}) : res.status(400).json("Wrong password")
    }
    else {
      res.status(404).json("User does not exist")
    }
  }
  catch (error) {
    res.status(500).json({message: error.message})
  }
}