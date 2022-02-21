import React from "react";
import { useAppContext } from "../../context/quizContext";

/**
 * Shows current question and number of questions
 */
const ProgressBar = () => {
  const { questions, currentQuestion } = useAppContext();

  return (
    <div className="progress-bar m-sm-y">
      <h5 data-test="progressbar-heading">
        Question {currentQuestion + 1} Of {questions.length}
      </h5>
    </div>
  );
};

export default ProgressBar;
