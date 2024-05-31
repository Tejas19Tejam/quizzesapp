import styled, { css } from "styled-components";
import Button from "../../ui/Button";
import { media } from "../../utils/media";
import { useQuiz } from "./useQuiz";
import Timer from "../../ui/Timer";

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1.8rem;
  padding: 0 3.2rem;
`;

const QuestionText = styled.p`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 4.8rem;
  align-self: flex-start;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  column-gap: 9.6rem;
  row-gap: 2.4rem;
  margin-bottom: 6.4rem;

  ${media.mobile`
    grid-template-columns: 1fr;
  `}
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;
  border-radius: var(--border-radius-tiny);
  cursor: pointer;
  padding: 1.8rem;
  background: var(--color-grey-200);
  overflow: hidden;
  justify-content: center;

  & span {
    font-size: 2.4rem;
    font-weight: 600;
    white-space: nowrap;
  }

  & img {
    width: 100%;
    border-radius: var(--border-radius-sm);
    height: 15.5rem;
  }

  ${({ selected }) =>
    selected &&
    css`
      outline: 3px solid var(--color-purple-700);
    `}
`;

function QuestionComponent() {
  const { hasTimer, questions, index, numQuestions, dispatch, answer } =
    useQuiz();

  const handleNext = () => {
    if (index + 1 === numQuestions) {
      dispatch({ type: "submit" });
    }
    if (index < numQuestions - 1) {
      dispatch({ type: "nextQuestion" });
    }
  };

  const handleOptionClick = (index) => {
    dispatch({ type: "newAnswer", payload: index });
  };

  if (numQuestions === 0) return null;

  return (
    <QuestionContainer>
      <Header>
        <span>{`${index + 1}/${numQuestions}`}</span>
        {hasTimer && <Timer />}
      </Header>
      <QuestionText>{questions[index].questionText}</QuestionText>
      <OptionsContainer>
        {questions[index].options.map((option, index) => (
          <Option
            key={index}
            selected={answer === index}
            onClick={() => handleOptionClick(index)}
          >
            {option.text && <span>{option.text}</span>}
            {option.imageUrl && (
              <img src={`${option.imageUrl}`} alt="option-image" />
            )}
          </Option>
        ))}
      </OptionsContainer>
      <Button size="extra-large" onClick={handleNext} variation="primary">
        {index === numQuestions - 1 ? "SUBMIT" : "NEXT"}
      </Button>
    </QuestionContainer>
  );
}

export default QuestionComponent;
