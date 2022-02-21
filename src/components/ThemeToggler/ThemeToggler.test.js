import React from "react";
import { shallow, mount } from "enzyme";
import ThemeToggler from "./ThemeToggler";
import { findByTestAttr } from "../../utils/testHelpers";
import * as AppContext from "../../context/quizContext";

describe("ThemeToggler Component", () => {
  let wrapper;
  let button;
  let contextValues = {
    theme: "light-theme",
    toggleTheme: jest.fn(),
  };

  beforeEach(() => {
    jest
      .spyOn(AppContext, "useAppContext")
      .mockImplementation(() => contextValues);

    wrapper = shallow(<ThemeToggler />);
    button = findByTestAttr(wrapper, "theme-toggle-button");
  });

  it("Renders without error", () => {
    expect(button.length).toBe(1);
    expect(button.text()).toEqual("dark mode");
  });

  it("calls function", () => {
    button.simulate("click");
    expect(contextValues.toggleTheme).toHaveBeenCalled();
  });
});
