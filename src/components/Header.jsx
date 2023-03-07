import React from "react";
import classes from "./Header.module.css";

const Header = ({ score, message, questionList }) => {
  return (
    <div className={classes.container}>
      <h1>Accounting Game</h1>
      {message && <div className={classes.message}>
        {message.map((item, index)=> { return <p key={index} >{item}</p>})}
      </div>}
      <div className={classes.score}>Score: {score}/{questionList.length}</div>
    </div>
  );
};
export default Header;
