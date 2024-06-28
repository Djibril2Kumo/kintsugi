import { react } from "react";
import { useEffect, useState, useContext } from "react";
import style from "./Quiz.module.css";
import Amical from "../quiz/patient/amical.json";
import Formel from "../quiz/patient/formel.json";
import { DarkContext } from "../App";

export default function Quiz() {
  const [quiz, setQuiz] = useState();
  const [displayedQuestion, setDisplayedQuestion] = useState("");
  const [talkToPatient, setTalkToPatient] = useState(false);
  const [answerToDisplay, setAnswerToDisplay] = useState("");
  const [showPrecdent, setShowPrecedent] = useState(false);
  const [currentAnswerScore, setCurrentAnswerScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [helpScore, setHelpScore] = useState(0);

  const darkMode = useContext(DarkContext);

  console.log("darkMode", darkMode);

  const setComportement = (comportement) => {
    if (comportement === "amical") {
      setQuiz(Amical);
    } else {
      setQuiz(Formel);
    }
  };

  useEffect(() => {
    const indexOfDisplayedQuestion = quiz?.indexOf(displayedQuestion);
    setShowPrecedent(indexOfDisplayedQuestion > 0);
  }, [displayedQuestion]);

  const handleNextQuestion = () => {
    const currentIndex = quiz?.indexOf(displayedQuestion);
    setCurrentAnswerScore(0)
    if (currentIndex < quiz?.length - 1) {
      setTalkToPatient(false);
      setHelpScore(helpScore + currentAnswerScore);
      setDisplayedQuestion(quiz[currentIndex + 1]);
    } else if (currentIndex === quiz?.length - 1){
      alert('vous avez terminer le quiz')
      setAnswerToDisplay("");
    }
  };

  const handlePreviousQuestion = () => {
    setHelpScore(helpScore - lastScore);
    setCurrentAnswerScore(0)
    setTalkToPatient(false);
    setAnswerToDisplay("");
    const currentIndex = quiz?.indexOf(displayedQuestion);
    if (currentIndex > 0) {
      setDisplayedQuestion(quiz[currentIndex - 1]);
    }
  };

  useEffect(()=>{
    console.log("----------------------> helpScore", helpScore)
  }, [helpScore])

  const playQuiz = () => {
    return (
      <div className={style.anchor}>
        {talkToPatient ? (
          <p>{answerToDisplay}</p>
        ) : (
          <div>
            <h3>{displayedQuestion.question}</h3>
            <div className={style.responsesContainer}>
              {displayedQuestion?.reponses?.map((reponse) => {
                return (
                  <button
                    onClick={() => {
                      setCurrentAnswerScore(reponse.value)
                      setLastScore(reponse.value)
                      setTalkToPatient(true);
                      setAnswerToDisplay(reponse.messageToDisplay);
                    }}
                    className={style.btn}
                  >
                    {reponse.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (quiz) {
      setDisplayedQuestion(quiz[0]);
    }
  }, [quiz]);

  return (
    <>
      <div className={`page ${darkMode ? 'darkMode' : 'lightMode'}`}>
        <h1 className="pageTitle">Quiz</h1>

        {!quiz ? (
          <>
            <h2>Bonsoir, souhaiterais-tu discuter de manière amicale ou de manière formelle ?</h2>
            <div className={style.btnContainer}>
              <button
                onClick={() => {
                  setComportement("amical");
                }}
                className={style.btn}
              >
                Amicale
              </button>
              <button
                onClick={() => {
                  setComportement("formel");
                }}
                className={style.btn}
              >
                Formelle
              </button>
            </div>
          </>
        ) : (
          <>
            {playQuiz()}
            <div className={style.navigationBtn}>
              <button
                className={style.green}
                disabled={!showPrecdent}
                onClick={() => {
                  handlePreviousQuestion();
                }}
              >
                {" "}
                Precedent
              </button>
              <button
                className={style.blue}
                disabled={!talkToPatient}
                onClick={() => {
                  handleNextQuestion();
                }}
              >
                Suivant
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
