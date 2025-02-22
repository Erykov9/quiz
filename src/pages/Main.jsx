import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router'
import './main.css'

const Main = () => {
  const {
    questions,
    setGameStarted,
    setPreparedQuestions,
    setPrecomputedQuestions,
    questionsLeft,
    setQuestionsLeft
  } = useAppContext()
  const navigate = useNavigate()

  const handleStart = () => {
    const questionsToPrepare = questionsLeft.length > 0 ? questionsLeft : [...questions]; 

    const shuffledQuestions = [...questionsToPrepare].sort(() => 0.5 - Math.random())
    const prepareQuestions = shuffledQuestions.slice(0, 2)
    const remainingQuestions = shuffledQuestions.slice(2)
  
    setPreparedQuestions(prepareQuestions)
    setPrecomputedQuestions((prev) => [...prev, ...prepareQuestions])
    setQuestionsLeft(remainingQuestions)
    setGameStarted(true)
    navigate('/quiz')
  }

  useEffect(() => {
  }, [questions, questionsLeft])

  return (
    <div className="main-quiz">
      <div className="main-quiz__header">
        <h2>Witam szanowych zebranych na quizach z okazji imprezy niespodzianki</h2>
        <p>Liczba pytań w bazie: <span className="main-quiz--qlength">{questions.length}</span></p>
        <p>Unikalnych pytań: <span>{questionsLeft.length}</span></p>
      </div>
      <div className="main-quiz__rules">
        <h3>Zasady gry</h3>
        <ul>
          <li>Pytania są losowe z różnych kategorii</li>
          <li>Macie 10 sekund na odpowiedź</li>
          <li>Na każde pytanie jest jedna odpowiedź</li>
          <li>Każde pytanie to 1 punkt</li>
        </ul>
      </div>
      <div className="main-quiz__start">
        <button onClick={() => handleStart()}>Start</button>
      </div>
    </div>
  )
}

export default Main