import jwt from "jsonwebtoken";
import UserModel from "../Models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  const foundUser = await UserModel.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!foundUser) {
      jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          async (err, decoded) => {
              if (err) return res.sendStatus(403); //Forbidden
              // Delete refresh tokens of hacked user
              const hackedUser = await User.findOne({ username: decoded.username }).exec();
              hackedUser.refreshToken = [];
              const result = await hackedUser.save();
          }
      )
      return res.sendStatus(403); //Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

  // evaluate jwt 
  jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
          if (err) {
              // expired refresh token
              foundUser.refreshToken = [...newRefreshTokenArray];
              const result = await foundUser.save();
          }
          if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

          // Refresh token was still valid
          const roles = Object.values(foundUser.roles);
          const accessToken = jwt.sign(
              {
                  "UserInfo": {
                      "username": decoded.username,
                      "roles": roles,
                      "userId": decoded.userId
                  }
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '1m' }
          );

          const newRefreshToken = jwt.sign(
              { "username": foundUser.username },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: '5h' }
          );
          
          // Saving refreshToken with current user
          foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
          const result = await foundUser.save();

          // Creates Secure Cookie with refresh token
          res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

          res.json({ accessToken })
      }
  );
}

export default handleRefreshToken;