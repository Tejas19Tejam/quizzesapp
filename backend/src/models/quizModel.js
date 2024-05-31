const mongoose = require("mongoose");
const AppError = require("../utils/appError");

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  attemptCount: {
    type: Number,
    default: 0,
  },
});

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, "Please create a question for a quiz "],
  },
  options: {
    type: [optionSchema],
    validate: [
      {
        validator: (options) => options.length >= 2,
        msg: "Minimum 2 options are required",
      },
      {
        validator: (options) => options.length <= 5,
        msg: "Maximum 5 options are allowed",
      },
    ],
  },
  correctOption: {
    type: Number,
    required: function () {
      return this.quizType === "q&a"; // Required only for Q&A quizzes
    },
  },
  attemptCount: {
    type: Number,
    default: 0,
  },
  correctAnswerCount: {
    type: Number,
    default: 0,
  },
  incorrectAnswerCount: {
    type: Number,
    default: 0,
  },
});

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A quiz must have a title"],
    },
    type: {
      type: String,
      enum: ["q&a", "poll"],
      required: [
        true,
        "Please select type of quiz you want to create q&a or poll type",
      ],
    },
    optionsType: {
      type: String,
      enum: ["text", "url", "text_url"],
      required: true,
    },
    timer: {
      enum: [0, 5, 10],
      type: Number,
    },
    impressions: {
      type: Number,
      required: true,
      default: 0,
    },
    questions: {
      type: [questionSchema],
      validate: [
        {
          validator: (question) => question.length >= 1,
          msg: "Quiz must have at least 1 and at most 5 questions",
        },
      ],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    // To include virtuals in res.json(), you need to set the toJSON schema option to { virtuals: true }.
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Pre-save hook to validate options types
quizSchema.pre("save", function (next) {
  const quiz = this;

  quiz.questions.forEach((question) => {
    const optionsType = quiz.optionsType;
    const isValid = question.options.every((option) => {
      if (optionsType === "text") {
        return option.text && !option.imageUrl;
      } else if (optionsType === "url") {
        return !option.text && option.imageUrl;
      } else if (optionsType === "text_url") {
        return option.text && option.imageUrl;
      }
      return false;
    });

    if (!isValid) {
      return next(
        new AppError(
          `Please give all options with ${quiz.optionsType} type or check all options are filled`,
          400
        )
      );
    }
  });

  next();
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
