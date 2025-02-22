import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router";
import "./question.css";

const Question = ({ question, index }) => {
  const {
    setCurrentQuestion,
    currentQuestion,
    setScore,
    setGameOver,
    preparedQuestions,
  } = useAppContext();
  const navigate = useNavigate();

  const [time, setTime] = useState(25);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [disableAnswers, setDisableAnswers] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (time === 0) {
      handleTimeout();
      return;
    }

    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [time]);

  const handleTimeout = () => {
    setDisableAnswers(true);
    goToNextQuestion();
  };

  const handleAnswer = (answer) => {
    if (disableAnswers) return;

    setDisableAnswers(true);
    setSelectedAnswer(answer);

    if (answer === question.correct) {
      setScore((prevScore) => prevScore + 1);
    }

    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    if (currentQuestion + 1 < preparedQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setTime(25);
      setSelectedAnswer(null);
      setDisableAnswers(false);
    } else {
      setCurrentQuestion(0);
      setGameOver(true);
      navigate("/summary");
    }
  };

  return (
    <div className="question">
      <h4>{question.question}</h4>
      <p>Pytanie {index + 1}/{preparedQuestions.length}</p>
      <h5>Pozostały czas: {time}s</h5>
      <div className="timer-bar" style={{ width: `${(time / 25) * 100}%` }}></div>
      <div className="question__answers">
        {question.answers.map((answer, index) => (
          <div
            key={index}
            className={`question__answer ${
              selectedAnswer === answer
                ? answer === question.correct
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() => handleAnswer(answer)}
          >
            {answer}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
