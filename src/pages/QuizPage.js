import React, { useEffect } from "react";
import NextButton from "../components/NextButton";
import HelpButton from "../components/HelpButton";
import Loader from "../components/Loader";
import ProgressBar from "../components/ProgressBar";
import Quiz from "../components/Quiz";
import Timer from "../components/Timer";
import { SectionContainer } from "../containers/SectionContainer";
import { useAppContext } from "../context/quizContext";
import { ButtonsContainer } from "../containers/ButtonsContainer";

export default function QuizPage() {
  const {
    loading,
    resetQuiz,
    removeTwoIncorrect,
    addMoreTime,
    helpRemoveAnswersUsed,
    helpAddTimeUsed,
  } = useAppContext();

  useEffect(() => {
    return () => {
      resetQuiz();
    };
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <SectionContainer>
      <Timer />
      <ProgressBar />
      <Quiz />
      <NextButton />
      <ButtonsContainer>
        <HelpButton
          title="50/50"
          helpFunc={removeTwoIncorrect}
          isHelpUsed={helpRemoveAnswersUsed}
          btnClass="bg-blue"
        />
        <HelpButton
          title="+10s"
          helpFunc={addMoreTime}
          isHelpUsed={helpAddTimeUsed}
          btnClass="bg-yellow"
        />
      </ButtonsContainer>
    </SectionContainer>
  );
}
