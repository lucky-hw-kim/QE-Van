import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();
// Register User

export const registerUser = async (req, res) => {
  const { username, firstname, lastname, password, pronoun } = req.body;

  if (!username || !password || !firstname || !lastname)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await UserModel.findOne({ username: username }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      password: hashedPass,
      firstname,
      lastname,
      pronoun,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// login user

export const loginUser = async (req, res) => {
  const cookies = req.cookies;
  const { username, password } = req.body;
  try {
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "username and password is required" });
    const user = await UserModel.findOne({ username: username });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (validity) {
        // Create JWTs
        const accesstoken = jwt.sign(
          {
            id: user.id,
            username: user.username,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
          { username: user.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        let newRefreshTokenArray = !cookies?.jwt
          ? user.freshToken
          : user.refreshToken.filter((rt) => rt !== cookies.jwt);

        if (cookies?.jwt) {
          /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
          const refreshToken = cookies.jwt;
          const foundToken = await UserModel.findOne({ refreshToken }).exec();

          // Detected refresh token reuse!
          if (!foundToken) {
            // clear out ALL previous refresh tokens
            newRefreshTokenArray = [];
          }

          res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          });
        }

        // Saving refreshToken with current user
        user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await user.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send access token to user

        res.status(200).json({accesstoken});
      } else {
        res.staus(400).json("Wrong password");
      }
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
