1. Run npm install and navigate to http://localhost:3000/
2. When on home page, click on PLAY NOW.
3. Loading spinner should be shown and then the first question should be visible.
4. Answer correctly on the first question and then click through the quiz without answering the questions.
   The timer should be reset to 15s every time you click on the next button.
5. When on the last question, the button should show "Finish" instead of "Next" and the quiz should end.
6. Once the quiz is ended, the statistics summary modal should be shown.
7. The statistics summary should show the score(correct answeres, the correct number of questions answered correctly, incorrectly and those that were left unananswered. (if you followed the step 4 of this Read me, you should have only 1 point for the score, 1 answered correctly and 9 unanswered questions.
8. Now, try answering differently and check if the summary shows the right statistics.
9. Start the quiz again, and try using the lifelines - 50/50 and +10s.
  50/50 should remove two incorrect answers and +10s should add addditional 10s to the timer.
  Each lifeline can be used only once during the quiz.
10. If you choose to play again, the quiz should reset.
11. If you don't click on the next/finish button, and the timer is up, the next question should be shown automatically (quiz ended if it is the last question)
12. There are a total of 12 hardcoded question, but each time the quiz is initialized, the questions are shuffled and only 10 questions are shown.
