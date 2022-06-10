import jwt from 'jsonwebtoken'
const SECRET = process.env.ACCESS_TOKEN_SECRET

// middlewear to verify the token send by the user for private route access

const verifyJWT = (req, res, next) => {

  if (!req.headers['authorization']) {
    return res.status(400).send({ message: 'Invalid login' });
  }

  const token = req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(400).send({ message: 'Invalid Token' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {

    if (err) {
      return res
        .status(400)
        .send({ message: 'Token verified' });
    }


    req.userId = decoded.userId;
    next();
  });
};

export default verifyJWT