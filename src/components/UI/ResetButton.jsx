import styles from './ResetButton.module.css'

export default function ResetButton({ onClick }) {
  return (
    <button className={styles.resetButton} id="reset" onClick={onClick}>
      Reset
    </button>
  )
}
