import React, { useState, useEffect, useRef } from 'react'
import Timer from './components/Timer/Timer'
import BreakLength from './components/BreakLength/BreakLength'
import SessionLength from './components/SessionLength/SessionLength'
import './App.css'

function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isSession, setIsSession] = useState(true)
  const intervalRef = useRef(null)

  // Запуск таймера
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true)
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1
          } else {
            const newMode = !isSession
            setIsSession(newMode)
            return newMode ? sessionLength * 60 : breakLength * 60
          }
        })
      }, 1000)
    }
  }

  // Сброс таймера
  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setIsRunning(false)
    setBreakLength(5)
    setSessionLength(25)
    setTimeLeft(25 * 60)
    setIsSession(true)
  }

  // Обновление времени при изменении длительности сессии
  useEffect(() => {
    if (isSession && !isRunning) {
      setTimeLeft(sessionLength * 60)
    }
  }, [sessionLength, isSession, isRunning])

  // Обновление времени при изменении длительности перерыва
  useEffect(() => {
    if (!isSession && !isRunning) {
      setTimeLeft(breakLength * 60)
    }
  }, [breakLength, isSession, isRunning])

  // Очистка интервала при ресете
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <main>
      <Timer
        timeLeft={timeLeft}
        isRunning={isRunning}
        isSession={isSession}
        onStart={handleStart}
        onReset={handleReset}
      />

      <div className="lengthControlsContainer">
        <BreakLength
          breakLength={breakLength}
          onIncrement={() =>
            !isRunning && setBreakLength((b) => Math.min(b + 1, 60))
          }
          onDecrement={() =>
            !isRunning && setBreakLength((b) => Math.max(b - 1, 1))
          }
          isRunning={isRunning}
        />

        <SessionLength
          sessionLength={sessionLength}
          onIncrement={() =>
            !isRunning && setSessionLength((s) => Math.min(s + 1, 60))
          }
          onDecrement={() =>
            !isRunning && setSessionLength((s) => Math.max(s - 1, 1))
          }
          isRunning={isRunning}
        />
      </div>
    </main>
  )
}

export default App
