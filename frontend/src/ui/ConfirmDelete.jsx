import styled from "styled-components";
import Button from "./Button";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 3.2rem;

  & p {
    color: var(--color-grey-700);
    margin-bottom: 1.2rem;
    font-size: 3.4rem;
    font-weight: 600;
  }

  & div {
    display: flex;
    justify-content: center;
    gap: 6.4rem;
  }
`;

import SpinnerMini from "./SpinnerMini";
import { useEffect } from "react";
import { useDeleteQuiz } from "../features/analytics/useDeleteQuiz";

function ConfirmDelete({ onClose, quizId }) {
  const { isDeleting, isDeleted, deleteQuiz } = useDeleteQuiz();

  useEffect(() => {
    if (!isDeleted) return;
    onClose?.();
  }, [isDeleted, onClose]);

  return (
    <StyledConfirmDelete>
      <p>Are you confirm you want to delate ?</p>

      <div>
        <Button
          size="extra-large"
          variation="danger"
          disabled={isDeleting}
          onClick={() => deleteQuiz(quizId)}
        >
          Confirm Delete
          <span>{isDeleting && <SpinnerMini />}</span>
        </Button>
        <Button size="extra-large" disabled={isDeleting} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
