import React from "react";
import { shallow, mount } from "enzyme";
import Quiz from "./Quiz";
import { findByTestAttr } from "../../utils/testHelpers";
import * as AppContext from "../../context/quizContext";
import Answer from "../Answer";

let wrapper;
const contextValues = {
  questions: [
    {
      text: "Question 1",
      answers: [
        { answer: "amswer1", correct: true },
        { answer: "amswer2", correct: false },
        { answer: "amswer4", correct: false },
        { answer: "amswer4", correct: false },
      ],
    },
    {
      text: "Question 2",
      answers: [
        { answer: "amswer1", correct: true },
        { answer: "amswer2", correct: false },
        { answer: "amswer4", correct: false },
        { answer: "amswer4", correct: false },
      ],
    },
  ],
  currentPage: 1,
  setIsQuestionAnsweredCorrectly: jest.fn(),
};

beforeEach(() => {
  jest
    .spyOn(AppContext, "useAppContext")
    .mockImplementation(() => contextValues);

  wrapper = shallow(<Quiz />);
});

describe("Quiz component", () => {
  it("renders without error", () => {
    const component = findByTestAttr(wrapper, "quiz");
    expect(component.length).toBe(1);
  });

  it("renders correct question text", () => {
    const component = findByTestAttr(wrapper, "quiz-question");
    expect(component.text()).toBe(
      contextValues.questions[contextValues.currentPage].text
    );
  });

  it("contains child components", () => {
    const component = findByTestAttr(wrapper, "quiz-answers");
    expect(component.containsMatchingElement(<Answer />)).toEqual(true);
  });
});
