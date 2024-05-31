import styled from "styled-components";
import Heading from "../../ui/Heading";
import { FiEye } from "react-icons/fi";
import { FormatDigit } from "../../utils/formatDigit";
import { formatDate } from "../../utils/formatDate";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useQuizzes } from "../analytics/useQuizzes";

const QuizzesContainer = styled.div`
  margin-top: auto;
  padding: 9.6rem 0 0 0;
`;

const QuizList = styled.ul`
  display: grid;
  margin-top: 2rem;
  grid-template-columns: repeat(4, 1fr);
  gap: 4.8rem;
  overflow-y: auto;
  height: 44rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 1.6rem;
  box-shadow: var(--shadow-sm);
  margin-bottom: auto;

  & p,
  & span,
  & svg {
    font-weight: 600;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Title = styled.p`
  font-size: 2.4em;
  color: var(--color-grey-700);
`;

const Impressions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 1.2rem;

  & span,
  & svg {
    color: var(--color-orange-700);
    font-size: 2.4rem;
  }
`;

const DateCreated = styled.p`
  color: var(--color-green-700);
  font-size: 1.6rem;
`;

function TrendingQuizzes() {
  const { isLoading, quizzes, isEmpty } = useQuizzes();

  if (isLoading) return <Spinner />;

  return (
    <QuizzesContainer>
      <Heading as="h2">Trending Quizzes</Heading>
      {!isEmpty ? (
        <QuizList className="custom-scrollbar">
          {quizzes.map((quiz, index) => (
            <Card key={index}>
              <Info>
                <Title>{quiz.title}</Title>
                <Impressions>
                  <span>{FormatDigit(quiz.impressions)}</span>
                  <FiEye />
                </Impressions>
              </Info>
              <DateCreated>
                Created on: {formatDate(quiz.createdAt)}
              </DateCreated>
            </Card>
          ))}
        </QuizList>
      ) : (
        <Empty message="No trending quizzes" />
      )}
    </QuizzesContainer>
  );
}

export default TrendingQuizzes;
