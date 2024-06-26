import { createContext, useReducer, useContext } from "react";

function updateState(
  { selectedOptions, points, questions, index, type },
  answer
) {
  const { correctOption, _id: questionId } = questions.at(index);

  const existingIndex = selectedOptions.findIndex(
    (option) => option.questionId === questionId
  );

  if (existingIndex >= 0) {
    // Update the existing entry
    // Adjust points
    const wasCorrect = selectedOptions[existingIndex].answer === correctOption;
    const isCorrect = answer === correctOption;

    if (type === "q&a") {
      if (wasCorrect && !isCorrect) {
        points--; // Decrease points if changing from correct to incorrect
      } else if (!wasCorrect && isCorrect) {
        points++; // Increase points if changing from incorrect to correct
      }
    }

    selectedOptions = selectedOptions.map((option, index) =>
      index === existingIndex ? { questionId, answer } : option
    );

    return { selectedOptions, points };
  } else {
    // Adjust points
    if (type === "q&a") {
      if (answer === correctOption) {
        points++; // Increase points if the new selection is correct
      }
    }
    // Add a new entry
    const updatedOptions = [...selectedOptions, { questionId, answer }];
    return { selectedOptions: updatedOptions, points };
  }
}

// Create Context
const QuizContext = createContext();

const initialState = {
  questions: [],
  // 'loading' , 'error' ,'submitted' , 'active' , 'finished'
  status: "loading",
  // This will keep track of which question is currently displayed from questions array
  index: 0,
  hasTimer: false,
  points: 0,
  timerDuration: null,
  selectedOptions: [],
  answer: null,
  type: "",
  id: null,
  title: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "quizStart": {
      const hasTimer = Boolean(action.payload?.timer);
      const timerDuration = action.payload?.timer || null;
      return {
        ...state,
        questions: action.payload.questions,
        hasTimer: hasTimer,
        timerDuration: timerDuration,
        type: action.payload.type,
        id: action.payload.id,
        status: "active",
      };
    }
    case "newAnswer": {
      const answer = action.payload;
      const updatedState = updateState(state, answer);

      return {
        ...state,
        selectedOptions: updatedState.selectedOptions,
        points: updatedState.points,
        answer: answer,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "submit":
      return {
        ...state,
        status: "submitted",
      };
    case "finished":
      return {
        ...state,

        status: "finished",
      };
    case "create":
      return {
        ...state,
        title: action.payload?.title,
        type: action.payload?.type,
      };
    default:
      throw new Error("Unknown action");
  }
}

function QuizProvider({ children }) {
  // State declaration using useReducer.
  const [quizState, dispatch] = useReducer(reducer, initialState);

  // Derived state
  const numQuestions = quizState.questions?.length;
  const totalPoints = quizState.questions.length;

  return (
    <QuizContext.Provider
      value={{
        ...quizState,
        dispatch,
        numQuestions,
        totalPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("You are using the context outside the provider");
  return context;
}

export { QuizProvider };
