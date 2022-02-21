import React, { useEffect } from "react";
import { useAppContext } from "../../context/quizContext";
import CircleProgressBar from "../CircleProgressBar";

export default function Timer() {
  const {
    initialTimer,
    timer,
    switchQuestion,
    currentQuestion,
    setCountdown,
    questions,
    endQuiz,
    showStatistics,
    isQuestionAnsweredCorrectly,
    addToStatistics,
  } = useAppContext();
  const isLastPage = currentQuestion < questions.length - 1 ? false : true;

  /**
   * Times swiches the question when the time runs out and
   * adds current question to statistics that will be
   * shown to the user at the ned of the quiz.
   * If the current question is the last question of
   * the quiz, the quiz is ended.
   */
  useEffect(() => {
    if (showStatistics) {
      return;
    }
    if (!timer) {
      addToStatistics({
        question: questions[currentQuestion].text,
        correct: isQuestionAnsweredCorrectly,
      });
      if (isLastPage) {
        endQuiz();
        return;
      } else {
        switchQuestion();
        return;
      }
    }
    const countdown = setInterval(() => {
      setCountdown();
    }, 1000);
    return () => clearInterval(countdown);
    // eslint-disable-next-line
  }, [timer]);

  return (
    <CircleProgressBar
      size="130"
      progress="70"
      strokeWidth="9"
      circleOneStroke="#7ea9e1"
      circleTwoStroke="#ff943d"
      value={timer}
      totalValue={initialTimer}
      data-test="timer"
    />
  );
}
