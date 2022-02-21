import React from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useAppContext } from "../../context/quizContext";
import { questionStatusAlternatives, statisticsLinks } from "../../constants";
import StatisticsItem from "./StatisticsItem";

export default function Statistics() {
  const { showStatistics, score, statistics, resetQuiz } = useAppContext();

  /**
   * Gets the number of correct/incorrect/unanswered questions
   */
  const getStatistics = (status) => {
    const nrOfAnswers = statistics.filter((item) => item.correct === status);
    return nrOfAnswers.length;
  };

  /**
   * Renders the title with the quiz score (correct answers)
   */
  const renderStatisticsTitle = () => (
    <p data-test="statistics-score">You won {score} points</p>
  );

  /**
   * Renders the number of correct/incorrect/unanswered questions
   */
  const renderStatisticsStats = () =>
    questionStatusAlternatives.map((item, index) => {
      return (
        <StatisticsItem
          key={index}
          status={item}
          getStatistics={getStatistics}
        />
      );
    });

  /**
   * Renders all questions and show respective icon if the
   * question has been answered correctly or unanswered = incorrectly
   */
  const renderStatisticsSummary = () =>
    statistics.map((item, index) => {
      return (
        <li key={index}>
          {item.question}
          {item.correct === "correct" ? (
            <FaCheck className="check-icon" />
          ) : (
            <AiOutlineClose className="wrong-icon" />
          )}
        </li>
      );
    });

  /**
   * Renders links
   */
  const renderStatisticsLinks = () =>
    statisticsLinks.map((link, index) => {
      const { path, classname, testAttr, text } = link;
      return (
        <Link
          key={index}
          to={path}
          className={classname}
          onClick={resetQuiz}
          data-test={testAttr}
        >
          {text}
        </Link>
      );
    });

  if (showStatistics) {
    return (
      <section className="modal-container">
        {renderStatisticsTitle()}
        <div className="statistics-info">{renderStatisticsStats()}</div>
        <ul className="statistics-container" test-data="summary">
          {renderStatisticsSummary()}
        </ul>
        <div data-test="statistics-links">{renderStatisticsLinks()}</div>
      </section>
    );
  } else {
    return null;
  }
}
