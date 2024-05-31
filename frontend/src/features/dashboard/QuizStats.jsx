import styled from "styled-components";
import Row from "../../ui/Row";
import { FormatDigit } from "../../utils/formatDigit";
import { useQuizzesStats } from "./useQuizzesStats";

const StatBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.8rem;
  background-color: var(--color-grey-0);
  padding: 2rem;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  color: ${({ color }) => color || "#000"};

  p {
    font-size: 3rem;
    font-weight: 600;
    flex: 0 1 0;
  }

  span {
    padding-right: 1.8rem;
    font-size: 6.2rem;
    font-weight: 600;
  }
`;

function QuizStats() {
  const { stats, isLoading } = useQuizzesStats();

  if (isLoading) return null;

  return (
    <Row type="horizontal">
      <StatBox color="var(--color-orange-700)">
        <p>
          <span>{FormatDigit(stats.numQuizzes)}</span>Quiz Created
        </p>
      </StatBox>
      <StatBox color="var(--color-green-700)">
        <p>
          <span>{FormatDigit(stats.totalQuestions)}</span>Questions Created
        </p>
      </StatBox>
      <StatBox color="var(--color-purple-700)">
        <p>
          <span>{FormatDigit(stats.totalImpressions)}</span>Total Impressions
        </p>
      </StatBox>
    </Row>
  );
}

export default QuizStats;
