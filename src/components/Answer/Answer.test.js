import React from "react";
import { shallow } from "enzyme";
import Answer from "./Answer";
import { findByTestAttr } from "../../utils/testHelpers";

const testData = {
  answer: "test answer",
  setAnswer: jest.fn(),
};

describe("Answer Component", () => {
  const wrapper = shallow(<Answer {...testData} />);

  it("Renders without error", () => {
    const answer = findByTestAttr(wrapper, "answer-button");
    expect(answer.length).toBe(1);
  });

  it("Renders answer text", () => {
    const answer = findByTestAttr(wrapper, "answer-button");
    expect(answer.text()).toBe(testData.answer);
  });

  it("Calls props function", () => {
    const answer = findByTestAttr(wrapper, "answer-button");
    answer.simulate("click");
    expect(testData.setAnswer).toHaveBeenCalled();
  });

  it("Calls props function with event", () => {
    const answer = findByTestAttr(wrapper, "answer-button");
    const mockEvent = { target: {} };
    answer.simulate("click", mockEvent);
    expect(testData.setAnswer).toHaveBeenCalledWith(mockEvent);
  });
});
