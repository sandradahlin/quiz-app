import React from "react";
import { shallow } from "enzyme";
import ProgressBar from "./ProgressBar";
import { findByTestAttr } from "../../utils/testHelpers";
import * as AppContext from "../../context/quizContext";

describe("ProgressBar Component", () => {
  let wrapper;
  const contextValues = {
    questions: [{ text: "question1" }],
    currentQuestion: 1,
  };

  beforeEach(() => {
    jest
      .spyOn(AppContext, "useAppContext")
      .mockImplementation(() => contextValues);

    wrapper = shallow(<ProgressBar />);
  });

  it("Renders without error", () => {
    const heading = findByTestAttr(wrapper, "progressbar-heading");
    expect(heading.length).toBe(1);
    expect(heading.text()).toEqual(
      `Question ${contextValues.currentQuestion + 1} Of ${
        contextValues.questions.length
      }`
    );
  });
});
