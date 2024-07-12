const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRouter = require("./api");
const dotenv = require("dotenv");

dotenv.config();

const connection = mongoose.connect(
  "mongodb+srv://jarzebskaaleksandraa:tzrASpQ2kxEfqtFi@cluster0.vstffte.mongodb.net/"
);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` });
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
});

const startServer = async () => {
  try {
    await connection;
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server started on http://localhost:3000");
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer();
