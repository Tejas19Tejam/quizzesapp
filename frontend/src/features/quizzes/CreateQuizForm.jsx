import styled, { css } from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import QuizTabs from "./QuizTabs";
import RadioButton from "../../ui/RadioButton";
import Button from "../../ui/Button";
import { Controller } from "react-hook-form";

const Section = styled.section`
  display: grid;
  width: 100%;
  row-gap: 1.8rem;
  padding: 0 2.4rem;

  ${({ columns }) =>
    columns &&
    css`
      grid-template-columns: ${columns};
      /* padding: 0; */
    `}
`;

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 86%;
  align-items: center;
  width: 100%;
  gap: 1.8rem;
`;

const Input = styled.input`
  border: none;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 1.2rem;
  box-shadow: var(--shadow-lg);
  width: 100%;

  &::placeholder {
    font-size: 1.8rem;
    font-weight: 500;
    color: var(--color-grey-400);
  }

  ${({ isAnswer }) =>
    isAnswer &&
    css`
      background-color: var(--color-green-700);
      color: var(--color-grey-0);

      &::placeholder {
        color: var(--color-grey-0);
      }
    `};
`;

const Label = styled.label`
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-grey-400);
  white-space: nowrap;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1.8rem 2.4rem;
  width: 100%;
  column-gap: 2.4rem;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.8rem;
`;

const OptionRow = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  align-self: flex-start;
`;

const AddButton = styled(Button)`
  align-self: flex-start;
  margin-left: 3.2rem;
  color: var(--color-grey-400);
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;

  & button:first-child {
    margin-top: 1.7rem;
  }
`;

const DeleteButton = styled(FaTrashAlt)`
  position: absolute;
  color: var(--color-red-700);
  cursor: pointer;
  right: -4.8rem;
`;

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: flex-end;
  margin-right: 4.4rem;
  margin-top: auto;
`;

const TimeButton = styled(Button)`
  ${({ selected }) =>
    selected &&
    css`
      background: var(--color-red-700);
      color: var(--color-grey-0);
    `}
`;

// const initialOption = { text: "", imageUrl: "" };
// const initialQuestion = {
//   questionText: "",
//   options: [initialOption, initialOption],
//   correctOption: 0,
// };

const MAX_OPTIONS = 4;

import useQuizForm from "./useQuizForm";

const CreateQuizForm = ({ onClose, quiz }) => {
  // const { quizToEdit } = data;
  const {
    control,
    handleSubmit,
    setValue,
    questions,
    currentQuestionIndex,
    optionsType,
    timer,
    options,
    correctOption,
    questionText,
    addOption,
    removeOption,
    switchQuestion,
    addQuestion,
    removeQuestion,
    onSubmit,
    setOptionsType,
    setTimer,
    quizType,
    isWorking,
  } = useQuizForm(quiz, onClose);

  return (
    <QuizContainer>
      <Section>
        <QuizTabs
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          switchQuestion={switchQuestion}
          addQuestion={addQuestion}
          removeQ={removeQuestion}
        />
      </Section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <QuestionInput
            control={control}
            questionText={questionText}
            currentQuestionIndex={currentQuestionIndex}
            setValue={setValue}
          />
          <OptionTypeSelector
            optionsType={optionsType}
            setOptionsType={setOptionsType}
          />
        </Section>
        <Section columns="1.5fr 1fr">
          <OptionListComponent
            options={options}
            correctOption={correctOption}
            optionsType={optionsType}
            control={control}
            setValue={setValue}
            addOption={addOption}
            removeOption={removeOption}
            currentQuestionIndex={currentQuestionIndex}
            quizType={quizType}
          />
          {quizType === "q&a" && (
            <TimerComponent timer={timer} setTimer={setTimer} />
          )}
        </Section>
        <Section>
          <ActionButtons onClose={onClose} isWorking={isWorking} />
        </Section>
      </form>
    </QuizContainer>
  );
};
// Question Input Component
const QuestionInput = ({
  control,
  questionText,
  currentQuestionIndex,
  setValue,
}) => (
  <Controller
    name={`questions.${currentQuestionIndex}.questionText`}
    control={control}
    render={({ field }) => (
      <Input
        {...field}
        value={questionText}
        onChange={(e) =>
          setValue(
            `questions.${currentQuestionIndex}.questionText`,
            e.target.value
          )
        }
        placeholder="Poll Question"
      />
    )}
  />
);

// Option Type Selector Component
const OptionTypeSelector = ({ optionsType, setOptionsType }) => (
  <Row>
    <Label>Option Type</Label>

    <RadioButton
      type="radio"
      value="text"
      checked={optionsType === "text"}
      onChange={() => setOptionsType("text")}
    />

    <Label>Text</Label>
    <RadioButton
      type="radio"
      value="url"
      checked={optionsType === "url"}
      onChange={() => setOptionsType("url")}
    />
    <Label>Image URL</Label>
    <RadioButton
      type="radio"
      value="text_url"
      checked={optionsType === "text_url"}
      onChange={() => setOptionsType("text_url")}
    />
    <Label>Text & Image URL</Label>
  </Row>
);

// Option List Component
function OptionListComponent({
  options,
  correctOption,
  optionsType,
  control,
  setValue,
  addOption,
  removeOption,
  currentQuestionIndex,
  quizType,
}) {
  const isQnA = quizType === "q&a";

  return (
    <OptionList>
      {options.map((option, oIndex) => (
        <OptionRow key={oIndex}>
          {isQnA && (
            <RadioButton
              filled={true}
              type="radio"
              name={`questions.${currentQuestionIndex}.correctOption`}
              checked={isQnA && correctOption === oIndex}
              onChange={() =>
                setValue(
                  `questions.${currentQuestionIndex}.correctOption`,
                  oIndex
                )
              }
            />
          )}
          {(optionsType === "text" || optionsType === "text_url") && (
            <Controller
              name={`questions.${currentQuestionIndex}.options.${oIndex}.text`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Text"
                  isAnswer={isQnA && correctOption === oIndex}
                />
              )}
            />
          )}
          {(optionsType === "url" || optionsType === "text_url") && (
            <Controller
              name={`questions.${currentQuestionIndex}.options.${oIndex}.imageUrl`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Image URL"
                  isAnswer={isQnA && correctOption === oIndex}
                />
              )}
            />
          )}
          {oIndex > 1 && <DeleteButton onClick={() => removeOption(oIndex)} />}
        </OptionRow>
      ))}
      {options.length < MAX_OPTIONS && (
        <AddButton onClick={addOption} size="extra-large" type="button">
          Add option
        </AddButton>
      )}
    </OptionList>
  );
}

// Timer Component
const TimerComponent = ({ timer, setTimer }) => (
  <TimerContainer>
    <Label>Timer</Label>
    <ButtonGroup>
      <TimeButton
        size="medium"
        selected={timer === 0}
        onClick={() => setTimer(0)}
        type="button"
      >
        OFF
      </TimeButton>
      <TimeButton
        size="medium"
        selected={timer === 5}
        onClick={() => setTimer(5)}
        type="button"
      >
        5 sec
      </TimeButton>
      <TimeButton
        size="medium"
        selected={timer === 10}
        onClick={() => setTimer(10)}
        type="button"
      >
        10 sec
      </TimeButton>
    </ButtonGroup>
  </TimerContainer>
);

// Action Buttons Component
const ActionButtons = ({ onClose, isWorking }) => (
  <Row>
    <Button
      size="extra-large"
      onClick={onClose}
      type="reset"
      disabled={isWorking}
    >
      Cancel
    </Button>

    <Button
      size="extra-large"
      variation="primary"
      type="submit"
      disabled={isWorking}
    >
      {isWorking ? "Creating..." : "Create Quiz"}
    </Button>
  </Row>
);

export default CreateQuizForm;
