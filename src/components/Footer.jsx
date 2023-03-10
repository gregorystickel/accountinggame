import React from "react";
import classes from "./Footer.module.css";

const Footer = ({
  currentQuestion,
  setCurrentQuestion,
  questionList,
  finishHandler,
  setMessage,
  started,
}) => {
  
  //go to next question and clear messages
  const incrementQuestion = () => {
    setMessage([]);
    //clear form
    document.getElementById("answerForm").reset();
    if (currentQuestion < questionList.length - 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  //go to previous question and clear messages
  const decrementQuestion = () => {
    setMessage([]);
    //clear  form
    document.getElementById("answerForm").reset();
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  return (
    <div className={classes.footer}>
      {started && <button onClick={decrementQuestion}>Previous</button>}
      {started && <button onClick={finishHandler}>Finish</button>}
      {started && <button onClick={incrementQuestion}>Next</button>}
    </div>
  );
};
export default Footer;
