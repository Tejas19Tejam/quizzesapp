const Quiz = require("../models/quizModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const mongoose = require("mongoose");

exports.createQuiz = catchAsync(async (req, res, next) => {
  // Add the author field to the request body
  req.body.author = req.user.id;
  const newDoc = await Quiz.create(req.body);
  res.status(201).json({
    message: "success",
    data: {
      result: newDoc,
    },
  });
});

exports.getQuiz = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  let quiz = await Quiz.findById(id);

  const INCREMENT_BY_ONE = Number(process.env.INCREMENT_BY_ONE);

  // If document not found (404) Error handling
  if (!quiz) {
    return next(new AppError(`document not found for ${id} id `, 404));
  }

  // Increment the impressions count
  quiz.impressions = (quiz.impressions || 0) + INCREMENT_BY_ONE;
  await quiz.save(); // Save the updated quiz

  res.status(200).json({
    status: "success",
    data: {
      result: quiz,
    },
  });
});

exports.submitQuiz = catchAsync(async (req, res, next) => {
  const { id: quizId } = req.params;
  const selectedOptions = req.body; // Array of { questionId, answer }

  const INCREMENT_BY_ONE = Number(process.env.INCREMENT_BY_ONE);

  // Find the quiz by ID
  const quiz = await Quiz.findById(quizId);

  // If document not found (404) Error handling
  if (!quiz) {
    return next(new AppError(`document not found for ${id} id `, 404));
  }

  // Iterate over the submitted answers to update analytics
  selectedOptions.map(({ questionId, answer }) => {
    const question = quiz.questions.id(questionId);
    if (question && quiz.type === process.env.QUIZ_TYPE_QA) {
      // Increment the attempt count for the question
      question.attemptCount = (question.attemptCount || 0) + INCREMENT_BY_ONE;

      // Check if the answer is correct
      if (question.correctOption === answer) {
        question.correctAnswerCount =
          (question.correctAnswerCount || 0) + INCREMENT_BY_ONE;
      } else {
        question.incorrectAnswerCount =
          (question.incorrectAnswerCount || 0) + INCREMENT_BY_ONE;
      }
    }

    if (question && quiz.type === process.env.QUIZ_TYPE_POLL) {
      // Increment the attempt count for selected option option of the question.
      const selectedOption = question.options.at(answer);
      selectedOption.attemptCount =
        (selectedOption.attemptCount || 0) + INCREMENT_BY_ONE;
    }
  });

  // Save the updated quiz document
  await quiz.save();

  res.status(200).json({
    status: "success",
  });
});

exports.getQuizzesStat = catchAsync(async (req, res, next) => {
  // Get statistics for currently logged in user
  const { id: authorId } = req.user;
  const stats = await Quiz.aggregate([
    {
      $match: {
        author: new mongoose.Types.ObjectId(authorId), // Filter quizzes where the author matches the logged-in user
      },
    },
    {
      $project: {
        questionsCount: { $size: "$questions" },
        impressionCount: { $sum: "$impressions" },
      },
    },
    {
      $group: {
        _id: { $toLower: "Statistics" },
        numQuizzes: { $sum: 1 },
        totalQuestions: { $sum: "$questionsCount" },
        totalImpressions: { $sum: "$impressionCount" },
      },
    },
  ]);

  // Log the result for debugging

  return res.status(200).json({
    status: "success",
    data: {
      result: stats[0],
    },
  });
});

exports.getAllQuizzes = catchAsync(async (req, res, next) => {
  const { id: authorId } = req.user;

  const features = new APIFeatures(Quiz.find({ author: authorId }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginatePage();

  const doc = await features.query;

  return res.status(200).json({
    status: "success",
    count: doc.length,
    data: {
      result: doc,
    },
  });
});

exports.deleteQuiz = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const doc = await Quiz.findByIdAndDelete(id);

  if (!doc) {
    return next(new AppError("No document found with that ID! ", 404));
  }
  // 204 - Content not Present
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.editQuiz = catchAsync(async (req, res, next) => {
  const { id, newQuiz } = req.body;
  const quiz = await Quiz.findByIdAndUpdate(id, newQuiz, {
    new: true,
    runValidators: true,
  });

  if (!quiz) {
    return next(new AppError("No document found with that ID! ", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      message: quiz,
    },
  });
});
