import type { ReactNode } from "react"
import styles from "./Card.module.scss"

type CardProps = {
  /** Optional step number/label shown in top-left corner */
  step?: string
  /** Card header/title */
  header: string
  /** Card content */
  children: ReactNode
  /** Mode: "input" for form fields (default), "display" for read-only values */
  mode?: "input" | "display"
  /** Optional additional className */
  className?: string
}

const Card = ({
  step,
  header,
  children,
  mode = "input",
  className,
}: CardProps) => {
  const modeClass = mode === "display" ? styles["card--display"] : ""

  return (
    <div className={`${styles.card} ${modeClass} ${className ?? ""}`}>
      <div className={styles.card__header}>
        {step && <div className={styles.card__step}>{step}</div>}
        <h3 className={styles.card__title}>{header}</h3>
      </div>
      <div className={styles.card__content}>{children}</div>
    </div>
  )
}

export default Card
