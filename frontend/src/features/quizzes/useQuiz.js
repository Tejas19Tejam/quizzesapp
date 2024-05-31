import { useQuizContext } from "../../context/QuizProvider";

const quiz = {
  title: "My quiz",
  type: "Q&A",
  optionsType: "text_image",
  hasTimer: true,
  timerDuration: 10,
  impressions: 2,
  questions: [
    {
      id: "356662",
      questionText: "Identify this landmark.", // Example question
      options: [
        {
          text: "Eiffel Tower",
          imageUrl: "http://example.com/eiffel.jpg",
        },
        {
          text: "Colosseum",
          imageUrl: "http://example.com/colosseum.jpg",
        },
        {
          text: "Big Ben",
          imageUrl: "http://example.com/bigben.jpg",
        },
        {
          text: "Statue of Liberty",
          imageUrl: "http://example.com/statue.jpg",
        },
      ],
      correctOption: 2,
      attemptCount: 200,
      correctAnswerCount: 120,
      incorrectAnswerCount: 80,
    },
    {
      id: "3563577",
      questionText: "Which animal is shown in the image?", // Another example question
      options: [
        {
          text: "Lion",
          imageUrl: "http://example.com/lion.jpg",
        },
        {
          text: "Tiger",
          imageUrl: "http://example.com/tiger.jpg",
        },
        {
          text: "Leopard",
          imageUrl: "http://example.com/leopard.jpg",
        },
        {
          text: "Cheetah",
          imageUrl: "http://example.com/cheetah.jpg",
        },
      ],
      correctOption: 1,
      attemptCount: 230,
      correctAnswerCount: 140,
      incorrectAnswerCount: 90,
    },
  ],
};

export function useQuiz() {
  const {
    questions,
    hasTimer,
    index,
    dispatch,
    secondsRemaining,
    numQuestions,
    answer,
    status,
    points,
    type,
    timerDuration,
    selectedOptions,
    id,
    title,
  } = useQuizContext();

  return {
    questions,
    hasTimer,
    index,
    dispatch,
    secondsRemaining,
    numQuestions,
    answer,
    status,
    points,
    type,
    timerDuration,
    selectedOptions,
    id,
    title,
  };
}
