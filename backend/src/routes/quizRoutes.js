const express = require("express");
const quizController = require("../controller/quizController.js");
const authController = require("../controller/authController.js");

const router = express.Router();

// Protected route
router
  .route("/stats")
  .get(authController.isLoggedIn, quizController.getQuizzesStat);

// Public Route
router.route("/:id/submit").post(quizController.submitQuiz);
router.route("/:id").get(quizController.getQuiz);

// Below routes can access if user is authenticated
router.use(authController.isLoggedIn);

router
  .route("/")
  .get(quizController.getAllQuizzes)
  .post(quizController.createQuiz)
  .patch(quizController.editQuiz);

router.route("/:id").delete(quizController.deleteQuiz);

module.exports = router;
