import styled from "styled-components";
import QuestionStats from "./QuestionStats";
import PollsStats from "./PollsStats";

const StyledQuestion = styled.div`
  padding: 2rem 2rem 3.2rem 2rem;
  border-bottom: 2px solid var(--color-grey-300);
`;

const Question = styled.p`
  color: var(--color-grey-800);
  font-size: 3rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const Stats = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function QuestionContainer({ questions, type }) {
  return questions.map((question, index) => {
    return (
      <StyledQuestion key={index}>
        <Question>
          Q.{index + 1} {question.questionText} ?
        </Question>
        <Stats>
          {type === "q&a" && <QuestionStats question={question} />}
          {type === "poll" && <PollsStats options={question.options} />}
        </Stats>
      </StyledQuestion>
    );
  });
}

export default QuestionContainer;
