import React, { createContext, useContext, useState } from "react";

const defaultContext = {
  questions: [],
  setQuestions: () => {},
}

const AppContext = createContext(defaultContext)

const AppProvider = ({children}) => {
  const [questions, setQuestions] = useState([])
  const [preparedQuestions, setPreparedQuestions] = useState([])
  const [precomputedQuestions, setPrecomputedQuestions] = useState([])
  const [questionsLeft, setQuestionsLeft] = useState([])

  const [answers, setAnswers] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <AppContext.Provider value={
      {
        questions,
        setQuestions,
        answers,
        setAnswers,
        currentQuestion,
        setCurrentQuestion,
        score,
        setScore,
        gameOver,
        setGameOver,
        gameStarted,
        setGameStarted,
        preparedQuestions,
        setPreparedQuestions,
        precomputedQuestions,
        setPrecomputedQuestions,
        questionsLeft,
        setQuestionsLeft
      }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  const context = useContext(AppContext)
  if(!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

export {AppProvider, useAppContext}