import styles from './StartButton.module.css'

export default function StartButton({ isRunning, onClick }) {
  return (
    <button className={styles.startButton} id="start_pause" onClick={onClick}>
      {isRunning ? 'Pause' : 'Start'}
    </button>
  )
}
