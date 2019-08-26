const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "harsh_is_god_he_is_invincible");
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
