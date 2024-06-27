import { react } from "react";
import { useEffect, useState } from "react";
import style from "./Quiz.module.css";
import Amical from "../quiz/patient/amical.json";
import Formel from "../quiz/patient/formel.json";

export default function Quiz() {
  const [quiz, setQuiz] = useState();
  const [displayedQuestion, setDisplayedQuestion] = useState("");
  const [talkToPatient, setTalkToPatient] = useState(false);

  const setComportement = (comportement) => {
    if (comportement === "amical") {
      setQuiz(Amical);
    } else {
      setQuiz(Formel);
    }
  };

  const handleNextQuestion = () => {
    const currentIndex = quiz.indexOf(displayedQuestion);
    if (currentIndex < quiz.length - 1) {
      setDisplayedQuestion(quiz[currentIndex + 1]);
    }
  };

  const playQuiz = () => {
    return talkToPatient ? (
      <h1>Test</h1>
    ) : (
      <div>
        <h3>{displayedQuestion.question}</h3>
        <div className={style.responsesContainer}>
          {displayedQuestion?.reponses?.map((reponse) => {
            return (
              <button
                onClick={() => {
                  handleNextQuestion();
                }}
                className={style.btn}
              >
                {reponse.label}
              </button>
            );
          })}
        </div>
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
      <div className={style.back}>
        <button className={style.btn}> Précédent</button>
      </div>

      <div className="page">
        <h1 className="pageTitle">Quiz</h1>

        {!quiz ? (
          <>
            <h2>De quel manière le Chat doit s'adresser à vous</h2>
            <div className={style.btnContainer}>
              <button
                onClick={() => {
                  setComportement("amical");
                }}
                className={style.btn}
              >
                Amical
              </button>
              <button
                onClick={() => {
                  setComportement("formel");
                }}
                className={style.btn}
              >
                Formel
              </button>
            </div>
          </>
        ) : (
          playQuiz()
        )}
      </div>
    </>
  );
}
