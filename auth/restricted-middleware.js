const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  // if (process.env.NODE_ENV === "testing") {
  //   token = req.headers.authorization;
  //   console.log(token);
  // } else {
  //   token = req.headers.authorization;
  // }
  if (req.decodedJwt) {
    next();
  } else if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
      if (err) {
        console.log(err);
        res.status(401).json({ you: `${err}, No ADMITTANCE` });
      } else {
        req.decodedJwt = decodedJwt;
        next();
      }
    });
  } else {
    res.status(401).json({ you: "Not allowed" });
  }
};
