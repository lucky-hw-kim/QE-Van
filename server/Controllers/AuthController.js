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
// !!!!!!!!!!
export const loginUser = async (req, res) => {
  const cookies = req.cookies;

  console.log(`cookie available at login: ${JSON.stringify(cookies)}`);

  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await UserModel.findOne({ username: username }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);

    // create JWTs

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
          userId: foundUser.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );
    const newRefreshToken = jwt.sign(
      { username: foundUser.username, roles: roles,
        userId: foundUser.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Changed to let keyword
    let newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken }).exec();
    

    // Detected refresh token reuse!
    if (!foundToken) {
      console.log("attempted refresh token reuse at login!");
      // clear out ALL previous refresh tokens
      newRefreshTokenArray = [];
    }
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  }
  // Saving refreshToken with current user
  // if(newRefreshToken.length > 0){

  const result = await foundUser.save();
  console.log(result);
  console.log(roles);

  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  
  // Send authorization roles and access token to user
  let userId = foundUser.userId
  res.json({ roles, accessToken, userId });
  } else {
    res.sendStatus(401);
  }
};
