import styles from "./Spinner.module.scss"

type SpinnerProps = {
  /** Optional size variant */
  size?: "small" | "medium" | "large"
  /** Optional additional className */
  className?: string
  /** Full page overlay mode */
  fullPage?: boolean
  /** Loading text to display */
  loadingText?: string
}

const Spinner = ({
  size = "medium",
  className,
  fullPage = false,
  loadingText,
}: SpinnerProps) => {
  const spinnerContent = (
    <div
      className={`${styles.spinner} ${styles[`spinner--${size}`]} ${
        className ?? ""
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className={styles.spinner__outer}></div>
      <div className={styles.spinner__middle}></div>
      <div className={styles.spinner__inner}></div>
    </div>
  )

  if (fullPage) {
    return (
      <div className={styles.spinner__overlay}>
        <div className={styles.spinner__overlayContent}>
          {spinnerContent}
          {loadingText && (
            <p className={styles.spinner__loadingText}>{loadingText}</p>
          )}
        </div>
      </div>
    )
  }

  return spinnerContent
}

export default Spinner
