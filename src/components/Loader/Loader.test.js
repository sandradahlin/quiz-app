import React from "react";
import { shallow, mount } from "enzyme";
import Loader from "./Loader";
import { findByTestAtr } from "../../utils/testHelpers";
import * as AppContext from "../../context/quizContext";

describe("Loader Component", () => {
  let wrapper;
  let contextValues = {
    loading: true,
  };

  beforeEach(() => {
    jest
      .spyOn(AppContext, "useAppContext")
      .mockImplementation(() => contextValues);

    wrapper = shallow(<Loader />);
  });

  it("Renders without error", () => {
    expect(wrapper.length).toBe(1);
  });
});
