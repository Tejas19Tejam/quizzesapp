import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useReducer } from "react";
import { getQuizzes } from "../services/apiQuizzes";

const QuizzesContext = createContext();

// Initial State
const initialState = {
  quizzes: [],
  isLoading: false,
  isEmpty: false,
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "quizzes/set": {
      const { data: quizzes, isLoading } = action.payload;

      return {
        ...state,
        quizzes: quizzes,
        isLoading: isLoading,
        isEmpty: quizzes?.length === 0,
      };
    }
    default:
      throw new Error("Unknown action");
  }
}

function QuizzesProvider({ children }) {
  const [{ quizzes, isEmpty }, dispatch] = useReducer(reducer, initialState);

  const { isLoading, data, error, isFetched } = useQuery({
    queryKey: ["quizzes"],
    queryFn: getQuizzes,
  });

  useEffect(() => {
    if (!isFetched) return;
    dispatch({ type: "quizzes/set", payload: { data, isLoading } });
  }, [isFetched, dispatch, data, isLoading]);

  return (
    <QuizzesContext.Provider value={{ quizzes, isLoading, isEmpty, dispatch }}>
      {children}
    </QuizzesContext.Provider>
  );
}

function useQuizzesContext() {
  const context = useContext(QuizzesContext);
  // context is undefined means we trying to access the value in a place that is not child component of this provider
  if (context === undefined)
    throw new Error(" StoryContext was used outside of Quizzes Provider");
  return context;
}

export { QuizzesProvider, useQuizzesContext };
