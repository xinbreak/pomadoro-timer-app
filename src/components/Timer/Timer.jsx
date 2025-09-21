import StartPauseButton from '../UI/StartPauseButton'
import ResetButton from '../UI/ResetButton'
import styles from './Timer.module.css'

export default function Timer({
  timeLeft,
  isRunning,
  isSession,
  onStartPause,
  onReset,
}) {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <div className={styles.timer}>
      <h4 className={styles.title}>{isSession ? 'SESSION' : 'BREAK'}</h4>
      <h1 className={styles.clock}>{formatTime(timeLeft)}</h1>
      <div className={styles.buttonBlock}>
        <StartPauseButton isRunning={isRunning} onClick={onStartPause} />
        <ResetButton onClick={onReset} />
      </div>
    </div>
  )
}
