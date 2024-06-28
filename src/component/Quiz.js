import { react } from "react";
import { useEffect, useState } from "react";
import style from "./Quiz.module.css";
import Amical from "../quiz/patient/amical.json";
import Formel from "../quiz/patient/formel.json";
import Aidant from "../quiz/aidant.json";

export default function Quiz() {
  const [quiz, setQuiz] = useState();
  const [displayedQuestion, setDisplayedQuestion] = useState("");
  const [talkToPatient, setTalkToPatient] = useState(false);
  const [answerToDisplay, setAnswerToDisplay] = useState("");
  const [showPrecdent, setShowPrecedent] = useState(false);
  const [currentAnswerScore, setCurrentAnswerScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [helpScore, setHelpScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userType, setUserType] = useState("");

  const setComportement = (comportement) => {
    setIsPlaying(true);
    if (comportement === "amical") {
      setQuiz(Amical);
    } else if (comportement === "aidant") {
      setQuiz(Aidant);
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
    setCurrentAnswerScore(0);
    if (currentIndex < quiz?.length - 1) {
      setTalkToPatient(false);
      setHelpScore(helpScore + currentAnswerScore);
      setDisplayedQuestion(quiz[currentIndex + 1]);
    } else if (currentIndex === quiz?.length - 1) {
      setIsPlaying(false);
      alert("vous avez terminer le quiz");
      setAnswerToDisplay("");
    }
  };

  const handlePreviousQuestion = () => {
    setHelpScore(helpScore - lastScore);
    setCurrentAnswerScore(0);
    setTalkToPatient(false);
    setAnswerToDisplay("");
    const currentIndex = quiz?.indexOf(displayedQuestion);
    if (currentIndex > 0) {
      setDisplayedQuestion(quiz[currentIndex - 1]);
    }
  };

  const playQuiz = () => {
    return (
      <div className={style.anchor}>
        {talkToPatient ? (
          <p>{answerToDisplay}</p>
        ) : (
          <div className={style.questionsContainer}>
            <h3>{displayedQuestion.question}</h3>
            <div className={style.responsesContainer}>
              {displayedQuestion?.reponses?.map((reponse) => {
                return (
                  <button
                    onClick={() => {
                      setCurrentAnswerScore(reponse.value);
                      setLastScore(reponse.value);
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
      <div className="page">
        <img
          src="logo.png"
          alt="logo du kintsugi texte les heures kitsungi"
          className={style.logo}
        />

        {!userType && !quiz && (
          <div className={style.btnContainer}>
            <button
              onClick={() => {
                setUserType("patient");
              }}
              className={style.btn}
            >
              Patient
            </button>
            <button
              onClick={() => {
                setUserType("aidant");
                setComportement("aidant");
              }}
              className={style.btn}
            >
              Aidant
            </button>
          </div>
        )}

        {!quiz && userType ? (
          <>
            <h2>
              Bonsoir, souhaiterais-tu discuter de manière amicale ou de manière
              formelle ?
            </h2>
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
        ) : !isPlaying && userType ? (
          <>
            <h1>Vous avez fini le quiz</h1>
            <h2>
              {helpScore} sur {quiz?.length * 3}
            </h2>
          </>
        ) : !userType ? <></> : (
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
