import styled from "styled-components";
import { copyToClipboard } from "../../utils/copyToClipboard";
import Table from "../../ui/Table";
import { useModal } from "../../ui/Modal";
import { FiEdit, FiTrash, FiShare2 } from "react-icons/fi";
import { FormatDigit } from "../../utils/formatDigit";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";

const RowItem = styled.p`
  text-align: left;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-800);

  a {
    font-size: 1.3rem;
    text-decoration: underline;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

function QuizRow({ quiz, srNo }) {
  const { open, setData } = useModal();
  const { id: quizId, title: name, createdAt, impressions } = quiz;
  const quizLink = `${window.location.origin}/quiz/${quizId}`;

  function handleConfirmDelete() {
    open("quiz-delete");
    setData({ quizId });
  }

  function handleEdit() {
    open("create-question-form");
    setData({ ...quiz });
  }

  return (
    <Table.Row>
      <RowItem>{srNo}</RowItem>
      <RowItem>{name}</RowItem>
      <RowItem>{formatDate(createdAt)}</RowItem>
      <RowItem>{FormatDigit(impressions)}</RowItem>
      <RowItem>
        <IconButton onClick={handleEdit}>
          <FiEdit color="var(--color-purple-700)" />
        </IconButton>

        <IconButton onClick={handleConfirmDelete}>
          <FiTrash color="var(--color-red-700)" />
        </IconButton>

        <IconButton onClick={() => copyToClipboard(quizLink)}>
          <FiShare2 color="var(--color-green-700)" />
        </IconButton>
      </RowItem>
      <RowItem>
        <Link to={`${quizId}`}>Question Wise Analysis</Link>
      </RowItem>
    </Table.Row>
  );
}

export default QuizRow;
