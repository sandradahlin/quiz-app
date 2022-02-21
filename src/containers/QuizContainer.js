import styled from "styled-components";

export const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  text-align: center;
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;
