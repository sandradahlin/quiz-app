import React from "react";
import { mount } from "enzyme";
import Timer from "./Timer";
import { findByTestAttr } from "../../utils/testHelpers";
import { AppContextProvider } from "../../context/quizContext";

const initialState = {
  questions: [],
  initialTimer: 15000,
  timer: 15000,
  currentQuestion: 0,
  showStatistics: false,
  isQuestionAnsweredCorrectly: "unanswered",
};

const switchQuestion = jest.fn();

const setup = (initialState, switchQuestion) => {
  return mount(
    <AppContextProvider value={{ initialState, switchQuestion }}>
      <Timer />
    </AppContextProvider>
  );
};

describe("Timer component", () => {
  it("renders without error", () => {
    const wrapper = setup(initialState, switchQuestion);
    const component = findByTestAttr(wrapper, "timer");
    expect(component.length).toBe(1);
  });
});
