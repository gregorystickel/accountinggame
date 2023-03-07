import classes from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FormRow from "./components/FormRow";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  //setup state
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [started, setStarted] = useState(false);
  const [message, setMessage] = useState([]);
  const [score, setScore] = useState(0);

  //sets started state
  const startHandler = (e) => {
    setStarted(true);
  };

  //Handle finish button click
  const finishHandler = () => {
    setStarted(false);
    setMessage([]);
  };
  //remove null values from object
  function removeEmptyValues(object) {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        var value = object[key];
        if (value === null || value === undefined || value === "") {
          delete object[key];
        }
      }
    }
  }

  //Handle submit button click
  const submitHandler = (e) => {
    e.preventDefault();
    setMessage([]);
    // get form  data
    const form = document.querySelector("#answerForm");
    const formData = new FormData(form);
    const values = [...formData.entries()];

    // store answers
    const cashAnswers =
      questionList[currentQuestion].correct_answers[0].entries;
    const accrualAnswers =
      questionList[currentQuestion].correct_answers[1].entries;

    // store form values in new variable
    let formFields = values.map((item) => {
      return item;
    }); // store values in a second array

    // splits form values into individual answers
    let firstAnswerCash = Object.fromEntries(formFields.slice(0, 4));
    let secondAnswerCash = Object.fromEntries(formFields.slice(4, 8));
    let firstAnswerAccrual = Object.fromEntries(formFields.slice(8, 12));
    let secondAnswerAccrual = Object.fromEntries(formFields.slice(12, 16));
    let thirdAnswerAccrual = Object.fromEntries(formFields.slice(16, 20));
    let fourthAnswerAccrual = Object.fromEntries(formFields.slice(20, 23));

    // removes null values from all answers
    removeEmptyValues(firstAnswerCash);
    removeEmptyValues(secondAnswerCash);
    removeEmptyValues(firstAnswerAccrual);
    removeEmptyValues(secondAnswerAccrual);
    removeEmptyValues(thirdAnswerAccrual);
    removeEmptyValues(fourthAnswerAccrual);

    //variable to store answers
    let cashAnswersCorrect = 0;
    let accrualAnswersCorrect = 0;

    // checkinng cash answers loop
    for (let i = 0; i < cashAnswers.length; i++) {
      if (
        cashAnswers[i].when === firstAnswerCash.cashdate0 &&
        cashAnswers[i].type === firstAnswerCash.cashtype0 &&
        // eslint-disable-next-line
        cashAnswers[i].Dr == firstAnswerCash.cashdr0
      ) {
        cashAnswersCorrect++;
      } else if (
        cashAnswers[i].when === secondAnswerCash.cashdate1 &&
        cashAnswers[i].type === secondAnswerCash.cashtype1 &&
        // eslint-disable-next-line
        cashAnswers[i].Cr == secondAnswerCash.cashcr1
      ) {
        cashAnswersCorrect++;
      } else {
      }
    }

    //If cash answers correct display message
    if (cashAnswersCorrect === cashAnswers.length) {
      setMessage((message) => [...message, "Cash answer correct!!!"]);
    } else {
      setMessage((message) => [...message, "Cash answer incorrect!!!"]);
    }

    //checking accrual answers loop
    for (let i = 0; i < accrualAnswers.length; i++) {
      if (
        accrualAnswers[i].when === firstAnswerAccrual.accrualdate0 &&
        accrualAnswers[i].type === firstAnswerAccrual.accrualtype0 &&
        // eslint-disable-next-line
        accrualAnswers[i].Dr == firstAnswerAccrual.accrualdr0
      ) {
        accrualAnswersCorrect++;
      } else if (
        accrualAnswers[i].when === secondAnswerAccrual.accrualdate1 &&
        accrualAnswers[i].type === secondAnswerAccrual.accrualtype1 &&
        // eslint-disable-next-line
        accrualAnswers[i].Cr == secondAnswerAccrual.accrualcr1
      ) {
        accrualAnswersCorrect++;
      } else if (
        accrualAnswers[i].when === thirdAnswerAccrual.accrualdate2 &&
        accrualAnswers[i].type === thirdAnswerAccrual.accrualtype2 &&
        // eslint-disable-next-line
        accrualAnswers[i].Dr == thirdAnswerAccrual.accrualdr2
      ) {
        accrualAnswersCorrect++;
      } else if (
        accrualAnswers[i].when === fourthAnswerAccrual.accrualdate3 &&
        accrualAnswers[i].type === fourthAnswerAccrual.accrualtype3 &&
        // eslint-disable-next-line
        accrualAnswers[i].Cr == fourthAnswerAccrual.accrualcr3
      ) {
        accrualAnswersCorrect++;
      }
    }
    console.log("Accrual Answers Correct", accrualAnswersCorrect);
    //if accrual asnwers are corret display message
    if (accrualAnswersCorrect === accrualAnswers.length) {
      setMessage((message) => [...message, "Accrual answer correct!!!"]);
    } else {
      setMessage((message) => [...message, "Accrual answer incorrect!!!"]);
    }
    //set score if both answers are correct
    if (
      accrualAnswersCorrect === accrualAnswers.length &&
      cashAnswersCorrect === cashAnswers.length
    ) {
      setScore(score + 1);
    }
  };

  //Get JSON Data for questions
  useEffect(() => {
    axios
      .get(
        "https://reclique.github.io/web-dev-testing/1_accounting_game/questions.json"
      )
      .then((response) => {
        console.log("Axios", response);
        setQuestionList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <Header score={score} message={message} questionList={questionList} />

      <div className={classes.container}>
        {!started && <button onClick={startHandler}>Start</button>}
        {started && (
          <div className={classes.questionContainer}>
            <h3>{questionList[currentQuestion].title}</h3>
            <h4>{questionList[currentQuestion].description}</h4>
            <form id="answerForm" onSubmit={submitHandler}>
              <p>Cash:</p>
              {questionList[currentQuestion].correct_answers[0].entries.map(
                (entry, index) => {
                  return <FormRow key={index} name="cash" index={index} />;
                }
              )}
              <p>Accrual:</p>
              {questionList[currentQuestion].correct_answers[1].entries.map(
                (entry, index) => {
                  return <FormRow key={index} name="accrual" index={index} />;
                }
              )}
              <div className={classes.submitButton}>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        )}
      </div>

      <Footer
        questionList={questionList}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        finishHandler={finishHandler}
        setMessage={setMessage}
      />
    </div>
  );
}

export default App;
