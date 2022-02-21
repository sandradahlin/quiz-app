import React, { useEffect, useRef, useState } from "react";
import { QuizContainer } from "../../containers/QuizContainer";
import { useAppContext } from "../../context/quizContext";
import Answer from "../Answer";

export default function Quiz() {
  const { questions, currentQuestion, setIsQuestionAnsweredCorrectly } =
    useAppContext();

  const { answers, text } = questions[currentQuestion];
  const [selected, setSelected] = useState("");
  const refs = useRef(null);
  /**
   * Sets the correct answer of the current question
   */
  const correctAnswer = questions[currentQuestion].answers.find(
    (answer) => answer.correct === true
  );

  const setAnswer = (e) => {
    clearStatus(refs.current.children);
    e.target.classList.add("selected");
    setSelected(e.target.textContent);
  };

  /**
   * Upon selected question, checks if the selected answer is
   * correct, updates question status that will be used for 
   * statistics
   */
  const checkAnswer = () => {
    if (selected) {
      if (selected === correctAnswer.answer) {
        setIsQuestionAnsweredCorrectly("correct");
      } else {
        setIsQuestionAnsweredCorrectly("incorrect");
      }
    }
  };

  const clearStatus = (element) => {
    Array.from(element).forEach((el) => {
      el.classList.remove("selected");
    });
  };

  const renderAnswers = () =>
    answers.map((answer, index) => {
      return <Answer key={index} {...answer} setAnswer={setAnswer} />;
    });

  useEffect(() => {
    if (refs) {
      clearStatus(refs.current.children);
    }
  }, [currentQuestion]);

  useEffect(() => {
    checkAnswer();
  }, [selected]);

  return (
    <QuizContainer data-test="quiz">
      <h4 data-test="quiz-question">{text}</h4>
      <div className="quiz-answers" ref={refs} data-test="quiz-answers">
        {renderAnswers()}
      </div>
    </QuizContainer>
  );
}
