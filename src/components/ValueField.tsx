import styles from "./ValueField.module.scss"

type ValueFieldProps = {
  /** Field label (will be capitalized with colon) */
  label: string
  /** Display value */
  value: string | number | boolean
  /** Optional type for special rendering (e.g., email) */
  type?: "text" | "email"
  /** Optional additional className */
  className?: string
}

const ValueField = ({
  label,
  value,
  type = "text",
  className,
}: ValueFieldProps) => {
  const displayValue =
    typeof value === "boolean" ? (value ? "Yes" : "No") : value
  const stringValue = String(value)

  return (
    <div className={`${styles.valueField} ${className ?? ""}`}>
      <div className={styles.valueField__label}>{label.toUpperCase()}:</div>
      {type === "email" ? (
        <a href={`mailto:${stringValue}`} className={styles.valueField__email}>
          {displayValue}
        </a>
      ) : (
        <div className={styles.valueField__value}>{displayValue}</div>
      )}
    </div>
  )
}

export default ValueField
