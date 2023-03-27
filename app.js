require("dotenv").config();
// db
const connectDB = require("./db/connect");
const mainRouter = require("./routes/main");
// async errors
require("express-async-errors");

const express = require("express");

const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/api/v1", mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    //   connectDB
    await connectDB(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
