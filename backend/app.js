const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const globalErrorHandler = require("./src/controller/errorController");
const AppError = require("./src/utils/appError");
var cookieParser = require("cookie-parser");
const path = require("path");

const quizRoutes = require("./src/routes/quizRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

app.use(cors());
app.options(cors());

// app.use((req, res, next) => {
//   console.log(req.headers.authorization);
//   next();
// });

// Allow traffic from Reverse Proxy Server
app.enable("trust-proxy");
app.use(cookieParser());

app.use(
  helmet({
    contentSecurityPolicy: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

// Body parser , reading data from body into req.body
app.use(express.json());

app.use(morgan("dev"));

// app.use("/api/v1/users", userRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/users", userRoutes);

// This middleware will run for all the HTTP request (ie GET , POST  , PATCH etc )
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
