import React from "react";
import { shallow } from "enzyme";
import CircleProgressBar from "./CircleProgressBar";

describe("CircleProgressBar Component", () => {
  it("renders without error", () => {
    shallow(
      <CircleProgressBar
        size="130"
        progress="70"
        strokeWidth="9"
        circleOneStroke="#7ea9e1"
        circleTwoStroke="#ff943d"
        value="10000"
        totalValue="10000"
      />
    );
  });
});
