import styled from "styled-components";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import ButtonCloseIcon from "./ButtonCloseIcon";
import CreateQuizForm from "../features/quizzes/CreateQuizForm";
import CreateQuiz from "../features/quizzes/CreateQuiz";
import ConfirmDelete from "./ConfirmDelete";
import ShareQuiz from "../features/quizzes/ShareQuiz";

const StyledModal = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  position: relative;
  /* position: fixed; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 4.8rem 4rem;
  transition: all 0.5s;

  &:has(button) {
    max-width: 100rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled(ButtonCloseIcon)`
  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }
  top: 1.2rem;
  right: 1.9rem;
`;

const ModalContext = createContext({
  open: () => {},
  setData: () => {},
});

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);
  // This is use to pass data to child component
  const [data, setData] = useState({});

  const windowRegistry = {
    "quiz-create": <CreateQuiz />,

    "create-question-form": <CreateQuizForm quiz={data} />,

    "quiz-delete": <ConfirmDelete quizId={data?.quizId} />,

    "quiz-share": <ShareQuiz quizId={data?.quizId} />,
  };

  const renderModal = (name) => {
    if (!name || !windowRegistry[name]) return null;

    return createPortal(
      <Overlay>
        <StyledModal>
          <Button onClick={close}>
            <HiXMark />
          </Button>
          {cloneElement(windowRegistry[name], { onClose: close })}
        </StyledModal>
      </Overlay>,
      document.body
    );
  };

  return (
    <ModalContext.Provider value={{ open, setData }}>
      {children}
      {renderModal(openName)}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

export default Modal;
