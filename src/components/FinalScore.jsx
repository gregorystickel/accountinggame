import React from "react";
import classes from "./FinalScore.module.css";

const FinalScore = ({ score, setScore, questionList, setShowFinal }) => {
  const playAgainHandler = (e) => {
    setScore(0);
    setShowFinal(false);
  };

  return (
    <div className={classes.container}>
      <h1>Your Final Score:</h1>
      <h2>
        {score}/{questionList.length}
      </h2>
      <button onClick={playAgainHandler}>Play Again</button>
    </div>
  );
};
export default FinalScore;
