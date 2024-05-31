import styled from "styled-components";
import Heading from "../../ui/Heading";
import { FormatDigit } from "../../utils/formatDigit";
import QuestionContainer from "../../ui/QuestionContainer";

import { useParams } from "react-router-dom";
import { useQuizzes } from "./useQuizzes";
import { formatDate } from "../../utils/formatDate";
import Spinner from "../../ui/Spinner";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuizName = styled(Heading)`
  font-size: 4rem;
  color: var(--color-purple-700);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & p {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-orange-700);
  }
`;

function QuizAnalysis() {
  const { id } = useParams();
  const { quizzes, isLoading } = useQuizzes();

  if (isLoading) return <Spinner />;

  const { questions, createdAt, impressions, type, title } = quizzes.find(
    (quiz) => quiz.id === id
  );

  return (
    <>
      <Header>
        <QuizName as="h2">
          <span>{title}</span> Question Analysis
        </QuizName>
        <Stacked>
          <p>
            Created on : <span>{formatDate(createdAt)}</span>
          </p>
          <p>
            Impressions : <span>{FormatDigit(impressions)}</span>
          </p>
        </Stacked>
      </Header>

      <QuestionContainer questions={questions} type={type} />
    </>
  );
}

export default QuizAnalysis;
