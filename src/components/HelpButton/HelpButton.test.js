import React from "react";
import { shallow } from "enzyme";
import HelpButton from "./HelpButton";
import { findByTestAttr } from "../../utils/testHelpers";

describe("HelpButton Component", () => {
  let wrapper;
  const testProps = {
    title: "Title",
    helpFunc: jest.fn(),
    isHelpUsed: false,
    btnClass: "class",
  };
  
  beforeEach(() => {
    wrapper = shallow(<HelpButton {...testProps} />);
  });

  it("Renders without error", () => {
    const button = findByTestAttr(wrapper, "help-button");
    expect(button.length).toBe(1);
  });

  it("shows correct button text", () => {
    const button = findByTestAttr(wrapper, "help-button");
    expect(button.text()).toEqual(testProps.title);
  });

  it("shows correct disabled attribute", () => {
    const button = findByTestAttr(wrapper, "help-button");
    expect(button.prop("disabled")).toBe(false);
  });

  it("triggers function", () => {
    const button = findByTestAttr(wrapper, "help-button");
    button.simulate("click");
    expect(testProps.helpFunc).toHaveBeenCalled();
  });
});
