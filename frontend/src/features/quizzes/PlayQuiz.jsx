import styled from "styled-components";
import QuestionComponent from "./QuestionsComponent";
import { useQuiz } from "./useQuiz";
import Result from "../../ui/Result";
import Spinner from "../../ui/Spinner";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { getQuiz } from "../../services/apiQuizzes";

const Modal = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  margin: 0 auto;
  max-width: 100%;
  /* max-width: 70vw; */
  margin: 0 auto;
`;

// Play quiz
function PlayQuiz() {
  const { status, dispatch } = useQuiz();
  const { id } = useParams();
  // Ref to store the previous quiz ID
  const prevIdRef = useRef(null);

  useEffect(() => {
    // Check if id is undefine
    if (!id) return;
    // Check if the current ID is different from the previous one
    if (id !== prevIdRef.current) {
      // Fetch the quiz data
      const fetchQuiz = async () => {
        const data = await getQuiz(id);
        dispatch({ type: "quizStart", payload: data });
      };

      // Call the fetchQuiz function
      fetchQuiz();

      // Update the previous ID ref
      prevIdRef.current = id;
    }
  }, [id, dispatch]);

  if (status === "loading") return <Spinner />;

  return (
    <Modal>
      {status === "active" && <QuestionComponent />}
      {(status === "submitted" || status === "finished") && <Result />}
    </Modal>
  );
}

export default PlayQuiz;
