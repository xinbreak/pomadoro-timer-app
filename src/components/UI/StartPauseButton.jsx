import styles from './StartPauseButton.module.css'

export default function StartPauseButton({ isRunning, onClick }) {
  return (
    <button
      className={styles.startPauseButton}
      id="start_pause"
      onClick={onClick}
    >
      {isRunning ? 'Pause' : 'Start'}
    </button>
  )
}
