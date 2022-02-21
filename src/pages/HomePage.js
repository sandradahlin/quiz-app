import React from "react";
import { Link } from "react-router-dom";
import { SectionContainer } from "../containers/SectionContainer";

export default function HomePage() {
  return (
    <SectionContainer>
      <h2>Welcome to Quiz App</h2>
      <Link to="/quiz" className="btn btn-primary">
        Play now
      </Link>
    </SectionContainer>
  );
}
