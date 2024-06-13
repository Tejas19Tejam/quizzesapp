"use strict";
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Handling : uncaughtException
process.on("uncaughtException", (err) => {
  console.log(" Uncaught Exception 💥 shouting down .....");
  console.log(err.name, err.message);
  // Shouting down application
  // Exit code = 1 (Process exit with failure)
  process.exit(1);
});

// Configuring ENVIRONMENT VARIABLES
dotenv.config({ path: "./config.env" });
const app = require("./app");
// Listening port
const port = process.env.DATABASE_PORT;

// Create database connection
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PWD);
// const DB = process.env.LOCAL_DATABASE;

mongoose.connect(DB).then(() => {
  console.log("Connected to database");
});
const server = app.listen(port, () => {
  console.log("Listening to port 8000 ....");
});

// Handling : Unhandled rejection
process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection 💥 shouting down .....");
  console.log(err.name, err.message);
  // Shouting down application
  // Exit code = 1 (Process exit with failure)
  server.close(() => {
    process.exit(1);
  });
});
