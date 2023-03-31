const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  console.log(req.headers["authorization"]);

  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      throw new UnauthenticatedError("Not authorized to access this route");
    }
  }

  next();
};

module.exports = authenticationMiddleware;
