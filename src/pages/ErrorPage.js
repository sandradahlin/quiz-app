import React from "react";
import { Link } from "react-router-dom";
import { SectionContainer } from "../containers/SectionContainer";

export default function ErrorPage() {
  return (
    <SectionContainer>
      <p>Page not found</p>
      <Link to="/" className="btn btn-primary">
        Back to home page
      </Link>
    </SectionContainer>
  );
}
