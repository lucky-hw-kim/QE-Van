import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';

// Register User

export const registerUser = async (req, res) => {
  const {username, firstname, lastname, password, pronoun} = req.body;

  // if (!username || !password || !firstname || !lastname) return res.status(400).json({ 'message': 'Username and password are required.' });


// check for duplicate usernames in the db
  const duplicate = await UserModel.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    
    try {
      
      const hashedPass = await bcrypt.hash(password, 10)
      const newUser = new UserModel({username, password: hashedPass, firstname, lastname, pronoun})

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
      res.status(404).json("User does not exist")
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}