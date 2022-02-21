import React from "react";
import { useAppContext } from "../../context/quizContext";
import { QuizContainer } from "../../containers/QuizContainer";

export default function NextButton() {
  const {
    currentQuestion,
    switchQuestion,
    questions,
    endQuiz,
    addToStatistics,
    isQuestionAnsweredCorrectly,
  } = useAppContext();

  /**
   * When user click on next button, statistics item is
   * added to statistics, keeping track of user's answers. If there
   * are following questions, the next question is shown.
   * If not, the quiz is ended and statistics summary is shown.
   */
  const isLastPage = currentQuestion < questions.length - 1 ? false : true;

  const handleClick = () => {
    addToStatistics({
      question: questions[currentQuestion].text,
      correct: isQuestionAnsweredCorrectly,
    });
    if (isLastPage) {
      endQuiz();
    } else {
      switchQuestion();
    }
  };
  return (
    <QuizContainer className="m-m-y">
      <button
        data-test="control-button"
        className="btn btn-primary next-btn"
        onClick={handleClick}
      >
        {isLastPage ? "Finish" : "Next"}
      </button>
    </QuizContainer>
  );
}
