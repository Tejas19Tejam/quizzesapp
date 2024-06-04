import styled from "styled-components";
import Row from "./Row";
import QuizResult from "../features/quizzes/QuizResult";
import PollComplete from "../features/quizzes/PollComplete";
import { useQuiz } from "../features/quizzes/useQuiz";
import { useEffect, useRef } from "react";
import { submitQuiz } from "../services/apiQuizzes";

const StyledResult = styled(Row)`
  align-items: center;
  justify-content: center;
  /* padding: 2.4rem 9.8rem; */
  font-size: 1.5rem; /* Set the base font size */
  flex-wrap: nowrap;
  text-align: center;

  & img {
    max-height: 32rem;
  }

  & h2 {
    font-size: 4.4rem;
    font-weight: 700;
    /* white-space: nowrap; */
  }

  & span {
    color: var(--color-green-700);
  }
`;

function Result() {
  const { type, points, numQuestions, id, selectedOptions, dispatch } =
    useQuiz();
  // Ref to keep track of whether the quiz has been submitted
  const hasSubmitted = useRef(false);
  console.log(type);

  useEffect(() => {
    if (!id) return;
    if (!hasSubmitted.current && selectedOptions) {
      submitQuiz(id, selectedOptions);
      dispatch({ type: "finished" });
      hasSubmitted.current = true;
    }
  }, [id, selectedOptions, dispatch]);

  return (
    <StyledResult>
      {type === "q&a" ? (
        <QuizResult points={points} totalQuestions={numQuestions} />
      ) : (
        <PollComplete />
      )}
    </StyledResult>
  );
}

export default Result;
