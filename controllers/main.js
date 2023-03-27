const login = async (req, res) => {
  res.status(200).json({ message: "Login" });
};

const dashboard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res
    .status(200)
    .json({ message: `Hello Dear, Your Lucky Number is ${luckyNumber}` });
};

module.exports = {
  login,
  dashboard,
};
