import React, { useContext, useReducer, useEffect, useCallback } from "react";
import {
  SET_THEME,
  SWITCH_QUESTION,
  SET_QUESTIONS_START,
  SET_QUESTIONS_SUCCESS,
  SET_QUESTIONS_ERROR,
  COUNTDOWN,
  RESET_QUIZ,
  INCREASE_SCORE,
  SET_QUESTION_STATUS,
  ADD_TO_STATISTICS,
  REMOVE_TWO_INCORRECT_ANSWERS,
  ADD_MORE_TIME,
  END_QUIZ,
} from "../actions/actions";
import * as helpers from "../utils/helpers";
import reducer from "../reducers/quizReducer";
import { questions } from "../data";

const AppContext = React.createContext();

/**
 * Set initial state
 */
const initialState = {
  theme: helpers.getStorageTheme("light-theme"),
  questions: [],
  loading: true,
  error: false,
  initialTimer: 15000,
  timer: 15000,
  currentQuestion: 0,
  showStatistics: false,
  score: 0,
  numberOfIncorrectAnswers: 0,
  numberOfUnansweredQuestions: 0,
  statistics: [],
  isQuestionAnsweredCorrectly: "unanswered",
  helpRemoveAnswersUsed: false,
  helpAddTimeUsed: false,
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Set questions - get all questions from data.js,
   *  shuffle them and set only 10 questions as state
   */
  const setQuestions = useCallback(() => {
    dispatch({ type: SET_QUESTIONS_START });
    const newQuestions = helpers.shuffleQuestions(questions);
    setTimeout(() => {
      dispatch({
        type: SET_QUESTIONS_SUCCESS,
        payload: newQuestions.slice(0, 10),
      });
    }, 2000);
    //dispatch SET_QUSTIONS_ERROR if response should fail
  }, []);

  /**
   * Switch question when the timer runs out
   * or when the user clicks on the next button
   */
  const switchQuestion = () => {
    dispatch({ type: SWITCH_QUESTION });
  };

  /**
   *End quiz when there are no questions
    remaining and show quiz statistics
   */
  const endQuiz = () => {
    dispatch({ type: END_QUIZ });
  };

  /**
   *Decrease timer during one question
   */
  const setCountdown = () => {
    dispatch({ type: COUNTDOWN });
  };

  /**
   * Increase score if the user answers correctly
   */
  const increaseScore = () => {
    dispatch({ type: INCREASE_SCORE });
  };

  /**
   *After each question, add entry to statistics 
   that will be shown at the end of the quiz
   */
  const addToStatistics = (item) => {
    dispatch({ type: ADD_TO_STATISTICS, payload: item });
    if (item.correct === "correct") {
      increaseScore();
    }
  };

  /**
   *Resets quiz to initial state
   */
  const resetQuiz = () => {
    dispatch({ type: RESET_QUIZ, payload: initialState });
    setQuestions();
  };

  /**
   *Sets status of the question, id if the question is
   answered correctl, incorrectly or left
   unanswered
   */
  const setIsQuestionAnsweredCorrectly = (status) => {
    dispatch({ type: SET_QUESTION_STATUS, payload: status });
  };

  /**
   *Toggles app theme - light or dark
   */
  const toggleTheme = (currentTheme) => {
    let theme = currentTheme === "light-theme" ? "dark-theme" : "light-theme";
    dispatch({ type: SET_THEME, payload: theme });
  };

  /**
   *One of the lifelines a user can choose, removes two incorrect
   answers in the current question. Can only be used once during
   the quiz.
   */
  const removeTwoIncorrect = () => {
    let newQuestions = state.questions.map((item) => {
      return { ...item };
    });
    let answers = newQuestions[state.currentQuestion].answers;
    const correctAnswerIndex = state.questions[
      state.currentQuestion
    ].answers.findIndex((answer) => answer.correct === true);
    let incorrectAnswers = answers.filter((answer) => answer.correct === false);
    const random = Math.ceil(Math.random() * incorrectAnswers.length - 1);
    const filtered = [answers[correctAnswerIndex], incorrectAnswers[random]];
    const shuffled = helpers.shuffleQuestions(filtered);
    newQuestions[state.currentQuestion].answers = [...shuffled];
    dispatch({ type: REMOVE_TWO_INCORRECT_ANSWERS, payload: newQuestions });
  };

  /**
   *One of the lifelines a user can choose, adds 10s to the 
   current timer.Can only be used once during
   the quiz.
   */
  const addMoreTime = () => {
    dispatch({ type: ADD_MORE_TIME });
  };

  useEffect(() => {
    setQuestions();
  }, [setQuestions]);

  useEffect(() => {
    document.documentElement.className = state.theme;
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        switchQuestion,
        setCountdown,
        resetQuiz,
        increaseScore,
        addToStatistics,
        setIsQuestionAnsweredCorrectly,
        removeTwoIncorrect,
        addMoreTime,
        toggleTheme,
        endQuiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider, useAppContext };
export default AppContext;
