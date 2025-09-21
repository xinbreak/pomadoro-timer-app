import React, { useState, useEffect } from 'react'
import Timer from './components/Timer/Timer'
import BreakLength from './components/BreakLength/BreakLength'
import SessionLength from './components/SessionLength/SessionLength'
import './App.css'

function App() {
  // Состояние приложения
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isSession, setIsSession] = useState(true)

  // Функции для управления BreakLength
  const incrementBreak = () => {
    if (breakLength < 60 && !isRunning) {
      setBreakLength(breakLength + 1)
    }
  }

  const decrementBreak = () => {
    if (breakLength > 1 && !isRunning) {
      setBreakLength(breakLength - 1)
    }
  }

  // Функции для управления SessionLength
  const incrementSession = () => {
    if (sessionLength < 60 && !isRunning) {
      const newSessionLength = sessionLength + 1
      setSessionLength(newSessionLength)
      setTimeLeft(newSessionLength * 60)
    }
  }

  const decrementSession = () => {
    if (sessionLength > 1 && !isRunning) {
      const newSessionLength = sessionLength - 1
      setSessionLength(newSessionLength)
      setTimeLeft(newSessionLength * 60)
    }
  }

  // Функции для управления Timer
  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setBreakLength(5)
    setSessionLength(25)
    setTimeLeft(25 * 60)
    setIsSession(true)
  }

  // Эффект для обновления времени при изменении sessionLength
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(sessionLength * 60)
    }
  }, [sessionLength, isRunning])

  // Эффект для работы таймера
  useEffect(() => {
    let interval = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (isRunning && timeLeft === 0) {
      setIsSession(!isSession)
      setTimeLeft(isSession ? breakLength * 60 : sessionLength * 60)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isSession, breakLength, sessionLength])

  return (
    <main>
      <Timer
        timeLeft={timeLeft}
        isRunning={isRunning}
        isSession={isSession}
        onStartPause={handleStartPause}
        onReset={handleReset}
      />

      <div className="lengthControlsContainer">
        <BreakLength
          breakLength={breakLength}
          onIncrement={incrementBreak}
          onDecrement={decrementBreak}
          isRunning={isRunning}
        />

        <SessionLength
          sessionLength={sessionLength}
          onIncrement={incrementSession}
          onDecrement={decrementSession}
          isRunning={isRunning}
        />
      </div>
    </main>
  )
}

export default App
