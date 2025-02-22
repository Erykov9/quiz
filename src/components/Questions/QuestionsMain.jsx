import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router'
import Question from '../Question/Question'
import './questionsmain.css'

const QuestionsMain = () => {
  const {preparedQuestions, setGameStarted, currentQuestion} = useAppContext()
  const [start, setStart] = useState(false)
  const navigate = useNavigate()
  console.log(preparedQuestions)
  console.log('currentQuestion', currentQuestion)

  useEffect(() => {

  }, [preparedQuestions])
  return (
    <div className="questions-main">
      <div className="questions-main__header">
        <h3>Pula pytań została przygotowana</h3>
        <h5>Kliknij start aby rozpocząć grę</h5>
        <button onClick={() => setStart(true)}>Start</button>
        <button className="return-btn" onClick={() => 
          {
            setGameStarted(false)
            navigate(-1)
          }
        }>Powrót</button>
      </div>
      {start && <div className="questions-main__questions">
        {preparedQuestions.map((question, index) => {
          return currentQuestion === index && <Question key={question.id} question={question} />
        })}
      </div>}
    </div>
  )
}

export default QuestionsMain