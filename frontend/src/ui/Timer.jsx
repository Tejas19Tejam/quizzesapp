import { useEffect, useState } from "react";
import { useQuiz } from "../features/quizzes/useQuiz";
import styled from "styled-components";

const StyledTimer = styled.span`
  color: red;
`;

function Timer() {
  const { dispatch, index, numQuestions, timerDuration } = useQuiz();
  const [timeLeft, setTimeLeft] = useState(timerDuration);

  // If index change then re-set the timer
  useEffect(() => {
    setTimeLeft(timerDuration);
  }, [index, timerDuration]);

  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        if (index < numQuestions - 1) {
          dispatch({ type: "nextQuestion" });
        } else {
          dispatch({ type: "submit" });
          return;
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, dispatch, index, numQuestions]);

  return <StyledTimer>{timeLeft}s</StyledTimer>;
}

export default Timer;
