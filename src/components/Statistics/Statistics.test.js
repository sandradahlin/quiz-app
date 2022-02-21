import React from "react";
import { shallow, mount } from "enzyme";
import Statistics from "./Statistics";
import { findByTestAttr } from "../../utils/testHelpers";
import * as AppContext from "../../context/quizContext";
import StatisticsItem from "./StatisticsItem";

describe("Statistics Component", () => {
  let wrapper;

  const contextValues = {
    showStatistics: true,
    score: 5,
    statistics: [{ question: "test question", correct: "correct" }],
    resetQuiz: jest.fn(),
  };

  beforeEach(() => {
    jest
      .spyOn(AppContext, "useAppContext")
      .mockImplementation(() => contextValues);

    wrapper = shallow(<Statistics />);
  });

  it("renders without error", () => {
    const heading = findByTestAttr(wrapper, "statistics-score");
    expect(heading.length).toBe(1);
  });

  it("shows correct heading", () => {
    const heading = findByTestAttr(wrapper, "statistics-score");

    expect(heading.text()).toEqual(`You won ${contextValues.score} points`);
  });

  it("renders links correctly", () => {
    const links = findByTestAttr(wrapper, "statistics-links");
    expect(links.length).toBe(1);
  });
});

describe("StatisticsItem Component", () => {
  let wrapper;
  const testProps = {
    status: "correct",
    getStatistics: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<StatisticsItem {...testProps} />);
  });

  it("shows correct statistics info", () => {
    const correct = findByTestAttr(wrapper, "statistics-correct");

    expect(correct.text()).toBe(`${testProps.status}: `);
  });
});
