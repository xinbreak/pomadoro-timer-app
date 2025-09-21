import React from 'react'
import styles from './BreakLength.module.css'

export default function BreakLength({
  breakLength,
  onIncrement,
  onDecrement,
  isRunning,
}) {
  return (
    <div className={styles.breakLengthContainer}>
      <div className={styles.counterBlock}>
        <button
          id="break-decrement"
          onClick={onDecrement}
          disabled={isRunning}
          className={styles.decrementButton}
        >
          <img src="/icons/decrement.svg" />
        </button>
        <span id="break-length">{breakLength}</span>
        <button
          id="break-increment"
          onClick={onIncrement}
          disabled={isRunning}
          className={styles.incrementButton}
        >
          <img src="/icons/increment.svg" />
        </button>
      </div>
      <h4 className={styles.title}>Break Length</h4>
    </div>
  )
}
