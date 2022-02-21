import React from "react";
import { shallow } from "enzyme";
import NextButton from "./NextButton";
import { findByTestAttr } from "../../utils/testHelpers";
import * as AppContext from "../../context/quizContext";

const setup = (values) => {
  jest.spyOn(AppContext, "useAppContext").mockImplementation(() => values);

  return shallow(<NextButton />);
};

describe("NextButton Component", () => {
  let wrapper;

  let contextValues = {
    questions: [
      { text: "question1" },
      { text: "question2" },
      { text: "question3" },
    ],
    currentPage: 1,
    isQuestionAnsweredCorrectly: "",
    addToStatistics: jest.fn(),
    switchQuestion: jest.fn().mockReturnValue(4),
    endQuiz: jest.fn(),
  };

  beforeEach(() => {
    wrapper = setup(contextValues);
  });

  it("Renders without error", () => {
    const button = findByTestAttr(wrapper, "control-button");
    expect(button.length).toBe(1);
  });

  it("Shows correct button text", () => {
    const button = findByTestAttr(wrapper, "control-button");
    expect(button.text()).toEqual("Next");
  });

  it("addToStatistics function is called on click", () => {
    const button = findByTestAttr(wrapper, "control-button");
    button.simulate("click");
    expect(contextValues.switchQuestion).toHaveBeenCalled();
  });

  it("switchQuestion function is called on click", () => {
    const button = findByTestAttr(wrapper, "control-button");
    button.simulate("click");
    expect(contextValues.addToStatistics).toHaveBeenCalled();
  });

  it("endQuiz function is not called on click", () => {
    const button = findByTestAttr(wrapper, "control-button");
    button.simulate("click");
    expect(contextValues.endQuiz).not.toHaveBeenCalled();
  });
});
