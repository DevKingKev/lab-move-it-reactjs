import styles from "./RadioButton.module.scss"

type RadioOption = {
  value: string | number | boolean
  label: string
}

type RadioButtonProps = {
  /** Field label (will be capitalized) */
  label: string
  /** Currently selected value */
  value: string | number | boolean
  /** Available options */
  options: RadioOption[]
  /** Change handler */
  onChange: (value: string | number | boolean) => void
  /** Optional name for radio group */
  name: string
  /** Optional required flag */
  required?: boolean
  /** Optional additional className */
  className?: string
}

const RadioButton = ({
  label,
  value,
  options,
  onChange,
  name,
  required = false,
  className,
}: RadioButtonProps) => {
  return (
    <div className={`${styles.radioButton} ${className ?? ""}`}>
      <label className={styles.radioButton__label}>
        {label.toUpperCase()}
        {required && <span className={styles.radioButton__required}>*</span>}
      </label>
      <div className={styles.radioButton__options}>
        {options.map(option => (
          <label
            key={String(option.value)}
            className={`${styles.radioButton__option} ${
              value === option.value ? styles["radioButton__option--selected"] : ""
            }`}
          >
            <input
              type="radio"
              name={name}
              value={String(option.value)}
              checked={value === option.value}
              onChange={() => {
                onChange(option.value)
              }}
              className={styles.radioButton__input}
            />
            <span className={styles.radioButton__circle} />
            <span className={styles.radioButton__text}>
              {option.label.toUpperCase()}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioButton
