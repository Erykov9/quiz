import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router'
import './summary.css'

const Summary = () => {
  const {score, setScore} = useAppContext()
  const [summ, setSumm] = useState('')
  const navigate = useNavigate()

  const getSummaryText = () => {
    if(score === 0) {
      setSumm('Ja pierdole serio?')
    }

    if(score > 0 && score < 3) {
      setSumm('XD żenada')
    }

    if(score >= 3 && score < 5) {
      setSumm('średnio w chuj ale ok')
    }

    if(score >= 5 && score < 7) {
      setSumm('no dobra git')
    }

    if(score >= 7 && score < 9) {
      setSumm('zajebiście')
    }

    if(score > 9) {
      setSumm('kozak mordo')
    }
  }

  useEffect(() => {
    getSummaryText()
  })

  const handleNavigate = () => {
    setScore(0)
    navigate('/')
  }
  
  return (
    <div className="summary">
      <h2>Uzyskany wynik to: {score}</h2>
      <h3>{summ}</h3>
      <button onClick={handleNavigate}>Powrót</button>
    </div>
  )
}

export default Summary