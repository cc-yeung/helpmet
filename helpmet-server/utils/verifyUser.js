const jwt = require('jsonwebtoken');
const { errorHandler } = require('./error');

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("Token received:", token);
  

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log("Decoded User:", user);
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return next(errorHandler(403, 'Forbidden'));
    }
    req.user = user;
    next();
  });
};