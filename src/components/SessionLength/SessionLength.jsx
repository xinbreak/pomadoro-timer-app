import React from 'react'
import styles from './SessionLength.module.css'

const SessionLength = ({
  sessionLength,
  onIncrement,
  onDecrement,
  isRunning,
}) => {
  return (
    <div className={styles.sessionLengthContainer}>
      <div className={styles.counterBlock}>
        <button
          id="session-decrement"
          onClick={onDecrement}
          disabled={isRunning}
          className={styles.decrementButton}
        >
          <img src="/icons/decrement.svg" />
        </button>
        <span id="session-length" className="length-value">
          {sessionLength}
        </span>
        <button
          id="session-increment"
          onClick={onIncrement}
          disabled={isRunning}
          className={styles.incrementButton}
        >
          <img src="/icons/increment.svg" />
        </button>
      </div>
      <h4 className={styles.title}>Session Length</h4>
    </div>
  )
}

export default SessionLength
