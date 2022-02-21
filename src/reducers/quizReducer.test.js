import reducer from "./quizReducer";
import * as actions from "../actions/actions";

const currentState = {
  theme: "light-theme",
  questions: [],
  loading: true,
  error: false,
  initialTimer: 15000,
  timer: 15000,
  currentPage: 0,
  showStatistics: false,
  score: 0,
  numberOfIncorrectAnswers: 0,
  numberOfUnansweredQuestions: 0,
  statistics: [],
  isQuestionAnsweredCorrectly: "",
  helpRemoveAnswersUsed: false,
  helpAddTimeUsed: false,
};

describe("Reducer", () => {
  it("no matching action type should return default state", () => {
    const newState = reducer(currentState, {});

    expect(newState).not.toBeUndefined();
    expect(newState).toEqual(currentState);
  });

  it(`reduces ${actions.SET_THEME} correctly`, () => {
    const theme =
      currentState.theme === "light-theme" ? "dark-theme" : "light-theme";

    const newState = reducer(currentState, {
      type: actions.SET_THEME,
      payload: theme,
    });

    expect(newState.theme).toEqual("dark-theme");
    expect(newState.theme).not.toEqual("light-theme");
  });

  it(`reduces ${actions.SWITCH_QUESTION} correctly`, () => {
    const newState = reducer(currentState, {
      type: actions.SWITCH_QUESTION,
    });

    expect(newState.currentPage).toBeGreaterThan(currentState.currentPage);
    expect(newState.timer && newState.initialTimer).toEqual(currentState.timer);
    expect(newState.isQuestionAnsweredCorrectly).toEqual("unanswered");
  });

  it(`reduces ${actions.SET_QUESTIONS_START} correctly`, () => {
    const newState = reducer(currentState, {
      type: actions.SET_QUESTIONS_START,
    });

    expect(newState.loading).toEqual(true);
  });

  it(`reduces ${actions.SET_QUESTIONS_SUCCESS} correctly`, () => {
    const questions = [
      {
        question: "Test 1",
        answers: [
          { answer: "answer1", correct: false },
          { answer: "answer2", correct: false },
          { answer: "answer3", correct: false },
          { answer: "answer4", correct: true },
        ],
      },
      {
        question: "Test 2",
        answers: [
          { answer: "answer1", correct: false },
          { answer: "answer2", correct: false },
          { answer: "answer3", correct: false },
          { answer: "answer4", correct: true },
        ],
      },
    ];

    const newState = reducer(currentState, {
      type: actions.SET_QUESTIONS_SUCCESS,
      payload: questions,
    });

    expect(newState.loading).toEqual(false);
    expect(newState.questions).not.toBeUndefined();
    expect(newState.questions).toEqual(questions);
  });

  it(`reduces ${actions.SET_QUESTIONS_ERROR} correctly`, () => {
    const newState = reducer(currentState, {
      type: actions.SET_QUESTIONS_ERROR,
    });

    expect(newState.error).toEqual(true);
  });

  it(`reduces ${actions.COUNTDOWN} correctly`, () => {
    const countdown = 14000;

    const newState = reducer(currentState, {
      type: actions.COUNTDOWN,
    });

    expect(newState.timer).toBeLessThan(currentState.timer);
    expect(newState.timer).toEqual(countdown);
  });

  it(`reduces ${actions.INCREASE_SCORE} correctly`, () => {
    const newScore = 1;

    const newState = reducer(currentState, {
      type: actions.INCREASE_SCORE,
    });

    expect(newState.score).toBeGreaterThan(currentState.score);
    expect(newState.score).toEqual(newScore);
  });

  it(`reduces ${actions.ADD_TO_STATISTICS} correctly`, () => {
    const statisticsItem = {
      question: "Test question",
      correct: "incorrect",
    };

    const newState = reducer(currentState, {
      type: actions.ADD_TO_STATISTICS,
      payload: statisticsItem,
    });

    expect(newState.statistics).not.toBeUndefined();
    expect(newState.statistics).toContain(statisticsItem);
    expect(newState.statistics[0].correct).toEqual("incorrect");
  });

  it(`reduces ${actions.REMOVE_TWO_INCORRECT_ANSWERS} correctly`, () => {
    const currentstateWithQuestions = {
      questions: [
        {
          text: "Question 1",
          answers: [
            { answer: "answer 1", correct: true },
            { answer: "answer 2", correct: false },
            { answer: "answer 3", correct: false },
            { answer: "answer 3", correct: false },
          ],
        },
        {
          text: "Question 2",
          answers: [
            { answer: "answer 1", correct: true },
            { answer: "answer 2", correct: false },
          ],
        },
      ],
      currentPage: 1,
      helpRemoveAnswersUsed: false,
    };

    const newState = reducer(currentstateWithQuestions, {
      type: actions.REMOVE_TWO_INCORRECT_ANSWERS,
      payload: currentstateWithQuestions.questions,
    });

    expect(newState.helpRemoveAnswersUsed).toEqual(true);
    expect(newState.questions).not.toBeUndefined();
    expect(
      newState.questions[currentstateWithQuestions.currentPage].answers.length
    ).toBe(2);
    expect(
      newState.questions[currentstateWithQuestions.currentPage].answers
    ).toContainEqual({ answer: "answer 1", correct: true });
    expect(newState.questions.length).toEqual(
      currentstateWithQuestions.questions.length
    );
  });

  it(`reduces ${actions.ADD_MORE_TIME} correctly`, () => {
    const newState = reducer(currentState, {
      type: actions.ADD_MORE_TIME,
    });

    expect(newState.timer).toBeGreaterThan(currentState.timer);
    expect(newState.timer).toBe(25000);
    expect(newState.initialTimer).toBeGreaterThan(currentState.initialTimer);
    expect(newState.initialTimer).toBe(25000);
    expect(newState.helpAddTimeUsed).toBe(true);
  });

  it(`reduces ${actions.END_QUIZ} correctly`, () => {
    const newState = reducer(currentState, {
      type: actions.END_QUIZ,
    });

    expect(newState.showStatistics).toEqual(true);
  });

  it(`reduces ${actions.RESET_QUIZ} correctly`, () => {
    const newState = reducer(currentState, {
      type: actions.RESET_QUIZ,
      payload: currentState,
    });

    expect(newState).not.toBeUndefined();
    expect(newState).toEqual(currentState);
  });
});
