function QuizResult({ points, totalQuestions }) {
  console.log(totalQuestions, points);
  return (
    <>
      <h2>Congrats! Quiz is completed</h2>
      <img src="/img/trophy.png" />
      <h2>
        Your score is{" "}
        <span>
          0{points}/0{totalQuestions}
        </span>
      </h2>
    </>
  );
}

export default QuizResult;
