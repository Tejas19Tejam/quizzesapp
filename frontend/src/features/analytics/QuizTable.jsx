import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import QuizRow from "./QuizRow";
import { useQuizzes } from "./useQuizzes";

function QuizTable() {
  const { quizzes, isLoading } = useQuizzes();
  if (isLoading) return <Spinner />;

  return (
    <Table columns="0.6fr 1fr 1.4fr 0.8fr 1.4fr 2.4fr">
      <Table.Header>
        <div>Sr.No</div>
        <div>Quiz Name</div>
        <div>Created on</div>
        <div>Impression</div>
        <div></div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={quizzes}
        render={(quiz, index) => (
          <QuizRow key={quiz.id} quiz={quiz} srNo={index + 1} />
        )}
      />
    </Table>
  );
}

export default QuizTable;
