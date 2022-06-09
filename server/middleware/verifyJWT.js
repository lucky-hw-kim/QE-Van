import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyJWT = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(400).send({ message: 'Invalid login' });
  }

  const token = req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(400).send({ message: 'Invalid Token' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

    if (err) {
      return res
        .status(400)
        .send({ message: 'Token verified' });
    }

    req.username = decoded.userInfo.username;
    req.roles = decoded.userInfo.roles;
    req.userid = decoded.userInfo.userId;
    next();
  });
}

export default verifyJWT


// const authHeader = req.headers.authorization || req.headers.Authorization;
//   if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
//   const token = authHeader.split(' ')[1];
//   console.log(token)
//   jwt.verify(
//       token,
//       process.env.ACCESS_TOKEN_SECRET,
//       (err, decoded) => {
//           if (err) return res.sendStatus(403); //invalid token
//           req.username = decoded.UserInfo.username;
//           req.roles = decoded.UserInfo.roles;
//           req.userId = decoded.UserInfo.userId
//           next();
//       }
//   );