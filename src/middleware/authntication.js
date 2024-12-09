const { secretKey } = require("../utils/constants");

const jwt = require("jsonwebtoken");
// Middleware to check authorization
const authenticatedMiddleware = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (token && token?.length > 0) {
      await jwt.verify(token, secretKey);
      next();
    } else {
      res.status(401).json({ message: "Auth Header token is missing" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: err.message });
  }
};

module.exports = { authenticatedMiddleware };
