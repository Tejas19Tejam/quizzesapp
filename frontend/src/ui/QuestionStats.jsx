import styled from "styled-components";

const StatBox = styled.div`
  text-align: center;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  padding: 1.8rem 2rem;
  background-color: var(--color-grey-100);
  font-weight: 600;

  & span {
    display: block;
    font-size: 3rem;
  }
  & p {
    margin-top: 0.5rem;
    font-size: 1.4rem;
  }
`;

function QuestionStats({ question }) {
  const { attemptCount, correctAnswerCount, incorrectAnswerCount } = question;
  return (
    <>
      <StatBox>
        <span>{attemptCount}</span>
        <p>People attempted the question</p>
      </StatBox>
      <StatBox>
        <span>{correctAnswerCount}</span>
        <p>People answered correctly</p>
      </StatBox>
      <StatBox>
        <span>{incorrectAnswerCount}</span>
        <p>People answered incorrectly</p>
      </StatBox>
    </>
  );
}

export default QuestionStats;
