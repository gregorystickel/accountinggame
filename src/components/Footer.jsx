import React from "react";
import classes from "./Footer.module.css";

const Footer = ({
  currentQuestion,
  setCurrentQuestion,
  questionList,
  finishHandler,
  setMessage,
  
}) => {
  const incrementQuestion = () => {
    setMessage([]);
    //clear form
    document.getElementById("answerForm").reset();

    if (currentQuestion < questionList.length - 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  

  const decrementQuestion = () => {
    setMessage([]);
    //clear  form
    document.getElementById("answerForm").reset();

    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  return (
    <div className={classes.footer}>
      <button onClick={decrementQuestion}>Previous</button>
      <button onClick={finishHandler}>Finish</button>
      <button onClick={incrementQuestion}>Next</button>
    </div>
  );
};
export default Footer;
