import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useModal } from "../../ui/Modal";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";

const QuizInput = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 1.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  width: 100%;
  font-size: 2rem;

  &::placeholder {
    text-transform: capitalize;
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-grey-500);
  }
`;

const QuizTypeButton = styled(Button)`
  margin-left: 1.8rem;
  font-weight: 600;
  color: ${({ isSelected }) =>
    isSelected ? "var(--color-grey-0)" : "var(--color-grey-700)"};
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--color-green-700)" : "transparent"};
`;

function CreateQuiz({ onClose }) {
  const [type, setType] = useState("q&a");
  const [title, setTitle] = useState("");
  const { open, setData } = useModal();
  // Derived state(Check quiz name)
  const isFilled = title.length === 0;

  function handleCreateQuiz(e) {
    e.preventDefault();
    open("create-question-form");
    setData({ title, type });
  }

  function handleQuizType(e) {
    e.preventDefault();
    setType(e.target.value);
  }

  const handleClose = (e) => {
    e.preventDefault();
    onClose?.();
  };

  return (
    <Form>
      <FormRow error={!title && "Quiz name is required!"}>
        <QuizInput
          type="text"
          placeholder="Quiz Name"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormRow>
      {/* <Error error={error}>Both quiz name and quiz type are required!</Error> */}
      <FormRow label="Quiz Type">
        <>
          <QuizTypeButton
            isSelected={type === "q&a"}
            value="q&a"
            onClick={handleQuizType}
          >
            Q&A
          </QuizTypeButton>
          <QuizTypeButton
            isSelected={type === "poll"}
            value="poll"
            onClick={handleQuizType}
          >
            Poll
          </QuizTypeButton>
        </>
      </FormRow>
      <FormRow>
        <>
          <Button size="extra-large" onClick={handleClose} type="button">
            Cancel
          </Button>

          <Button
            size="extra-large"
            variation="primary"
            onClickCapture={handleCreateQuiz}
            disabled={isFilled}
          >
            Continue
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateQuiz;
