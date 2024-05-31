import styled from "styled-components";
import PlayQuiz from "../features/quizzes/PlayQuiz";

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-purple-900);
  transition: all 0.5s;
`;

function ShowQuiz() {
  return (
    <Overlay>
      <PlayQuiz />
    </Overlay>
  );
}

export default ShowQuiz;
