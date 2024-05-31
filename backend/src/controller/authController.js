const jwt = require("jsonwebtoken");
const User = require("./../models/userModel.js");
const catchAsync = require("./../utils/catchAsync.js");
const AppError = require("./../utils/appError.js");
const { promisify } = require("util");

// Get token from request
const getToken = (req) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    return token;
  } else if (req.headers.cookie && req.headers.cookie.startsWith("jwt")) {
    token = req.headers.cookie.split("=")[1];
    return token;
  }
  return token;
};

// SignToken
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: process.env.JWT_SESSION_EXPIRES_IN,
  });
};

const createTokenAndSend = function (user, statusCode, req, res) {
  const token = signToken(user.id);

  // If we are in production , then cookies will be send vie HTTPS connections
  // Sending Cookie
  res.cookie("jwt", token, {
    // Cookies will expire in specified milliseconds
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
    // secure: req.secure || req.header("x-forwarded-proto") === "https",
    secure: false,
    sameSite: "none",
  });

  // Set authorization headers
  res.setHeader("Authorization", `Bearer ${token}`);

  // Remove the password and active status from the output
  user.password = undefined;

  return res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: { ...user, role: "authenticated" },
      session: { access_token: `Bearer ${token}` },
    },
  });
};

// Registering user and sending the token for instant login to application
exports.signup = catchAsync(async (req, res, next) => {
  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmedPassword: req.body.confirmedPassword,
  });

  res.status(201).json({
    data: {
      status: "success",
    },
  });
});

// Login user
exports.login = catchAsync(async (req, res, next) => {
  // Reading email , and password
  const { email, password } = req.body;

  // 1) Check if email and password is exist
  if (!email || !password) {
    return next(new AppError("Please provide the email and password ", 400));
  }
  // 2) Check if email and password  correct
  // console.log(req.body.email);
  const user = await User.findOne({ email }, { password: 1 });

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password  ", 401));
  }

  // 3) If everything is ok , then send the JSON web token to user

  createTokenAndSend(user, 200, req, res);
});

// LoginChecker
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // 1) Getting token and checking of if its there

  const token = getToken(req);
  if (!token || token === "null") {
    return next(
      new AppError("You are not logged in ! Please login to get access.", 401)
    );
  }
  // 2) Verification of token
  // Promisify to avoid unexpected results
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRETE_KEY
  );
  // 3) Check if user still exist or check token is expire or not

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(
        "The user belonging to this token does not longer exist !",
        401
      )
    );
  }

  // GRANT ACCESS TO THE PROTECTED ROUTES
  req.user = freshUser;
  res.session_state = "active";
  // res.locals.user = freshUser;

  next();
});

// Logout
exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    expires: new Date(0),
  });

  // Remove Authorization header
  delete req.headers["authorization"];

  res.status(200).json({
    data: {
      status: "success",
    },
  });
};
