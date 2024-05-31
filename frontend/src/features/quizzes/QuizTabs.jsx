import styled, { css } from "styled-components";
import Row from "../../ui/Row";
import { RxCross2 } from "react-icons/rx";
import { HiPlus } from "react-icons/hi";
import ButtonCloseIcon from "../../ui/ButtonCloseIcon";

const StyledQuizTabs = styled(Row)`
  justify-content: flex-start;
  gap: 2.4rem;
  position: relative;
  transition: all 0.4s;

  & p {
    color: var(--color-grey-400);
    position: absolute;
    font-size: 2rem;
    font-weight: 500;
    right: 0;
    top: 0;
  }

  & svg {
    cursor: pointer;
    color: var(--color-grey-400);
    font-size: 3.2rem;
    font-weight: 600;
  }
`;

const Tab = styled.div`
  display: flex;
  position: relative;
  border: none;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  cursor: pointer;

  /* To give the same height as select */
  padding: 0.4rem;
  transition: all 0.3s;
  width: 5.2rem;
  height: 5.2rem;
  margin: 1.8rem 0;
  box-shadow: var(--shadow-md);

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-grey-100);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-grey-100);
  }

  & span {
    font-size: 2rem;
    font-weight: 500;
    color: var(--color-grey-400);
  }
`;

const ButtonClose = styled(ButtonCloseIcon)`
  top: -0.3rem;
  right: 0.7rem;

  & svg {
    color: var(--color-grey-800);
    width: 1.2rem;
    height: 1.2rem;
    stroke-width: 1.2px;
  }
`;

// import { useEffect, useState } from "react";

function QuizTabs({
  questions,
  currentQuestionIndex,
  switchQuestion,
  addQuestion,
  removeQ,
}) {
  return (
    <>
      <StyledQuizTabs type="horizontal">
        <p>Max 5 questions</p>

        {questions.map((question, index) => {
          return (
            <Tab
              key={index}
              onClick={() => switchQuestion(index)}
              className={currentQuestionIndex === index ? "active" : ""}
              active={currentQuestionIndex === index}
            >
              <span>{index + 1}</span>
              {index >= 1 && ( // Render close button for all tabs greater than four
                <ButtonClose onClickCapture={() => removeQ(index)}>
                  <RxCross2 />
                </ButtonClose>
              )}
            </Tab>
          );
        })}
        {questions.length < 5 && <HiPlus onClick={addQuestion} />}
      </StyledQuizTabs>
    </>
  );
}

export default QuizTabs;
