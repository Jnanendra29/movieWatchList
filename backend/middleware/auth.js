const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    // console.log(token.split(" "))
    token = token.split(" ")[1];
    // console.log(token);
    // console.log("auth", process.env.JWT_SECRET)
    jwt.verify(token, process.env.JWT_SECRET, (err, valid) => {
      if (err) {
        console.log(err);
        res.status(401).send({ result: "Please provide valid token" });
      } else {
        // console.log(valid);
        req.user = valid.user
        next();
      }
    });
  } else {
    res.status(403).send({ result: "Please send token with header" });
  }
}

module.exports = verifyToken