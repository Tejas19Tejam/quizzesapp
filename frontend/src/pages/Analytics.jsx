import QuizTable from "../features/analytics/QuizTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Analytics() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Quiz Analysis</Heading>
      </Row>
      <Row>
        <QuizTable />
      </Row>
    </>
  );
}

export default Analytics;
