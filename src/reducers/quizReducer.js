import {
  SET_THEME,
  SWITCH_QUESTION,
  SET_QUESTIONS_START,
  SET_QUESTIONS_SUCCESS,
  SET_QUESTIONS_ERROR,
  COUNTDOWN,
  RESET_QUIZ,
  INCREASE_SCORE,
  ADD_TO_STATISTICS,
  SET_QUESTION_STATUS,
  REMOVE_TWO_INCORRECT_ANSWERS,
  ADD_MORE_TIME,
  END_QUIZ,
} from "../actions/actions";

const quizReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: payload };
    case SWITCH_QUESTION:
      return {
        ...state,
        timer: 15000,
        initialTimer: 15000,
        currentQuestion: state.currentQuestion + 1,
        isQuestionAnsweredCorrectly: "unanswered",
      };
    case SET_QUESTIONS_START:
      return { ...state, loading: true };
    case SET_QUESTIONS_SUCCESS:
      return { ...state, loading: false, questions: payload };
    case SET_QUESTIONS_ERROR:
      return { ...state, loading: false, error: true };
    case COUNTDOWN:
      return { ...state, timer: state.timer - 1000 };
    case INCREASE_SCORE:
      return { ...state, score: state.score + 1 };
    case ADD_TO_STATISTICS:
      return { ...state, statistics: [...state.statistics, payload] };
    case SET_QUESTION_STATUS:
      return {
        ...state,
        isQuestionAnsweredCorrectly: payload,
      };

    case REMOVE_TWO_INCORRECT_ANSWERS:
      return {
        ...state,
        questions: payload,
        helpRemoveAnswersUsed: true,
      };
    case ADD_MORE_TIME:
      return {
        ...state,
        timer: state.timer + 10000,
        initialTimer: state.initialTimer + 10000,
        helpAddTimeUsed: true,
      };
    case END_QUIZ:
      return { ...state, showStatistics: true };
    case RESET_QUIZ:
      return { ...payload };
    default:
      return { ...state };
  }
};

export default quizReducer;
