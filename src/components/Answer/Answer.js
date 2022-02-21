import React from "react";

export default function Answer({ answer, setAnswer }) {
  return (
    <button
      className="btn btn-secondary quiz-btn"
      onClick={(e) => setAnswer(e)}
      data-test="answer-button"
    >
      {answer}
    </button>
  );
}
