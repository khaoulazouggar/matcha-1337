const jwt_secret = "this is a jsonwebtoken secret";
const jwt = require("jsonwebtoken");

const isUserAuth = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) res.send("we need a token");
  else {
    jwt.verify(token, jwt_secret, (err, decoded) => {
      if (err) {
        res.send("U failed to authenticate");
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports = isUserAuth;
