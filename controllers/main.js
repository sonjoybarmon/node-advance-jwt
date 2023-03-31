const { BadRequest, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username && !password) {
    throw new BadRequest("Please provide email and password");
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ token, message: "User Is Created" });
};

const dashboard = (req, res) => {
  // check header
  // const authHeader = req.headers["authorization"];

  // if (!authHeader) {
  //   throw new CustomAPIError("Unauthorized", 401);
  // }

  // const token = authHeader.split(" ")[1];

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      message: `Hello ${req.user.username}, Your Lucky Number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

module.exports = {
  login,
  dashboard,
};
