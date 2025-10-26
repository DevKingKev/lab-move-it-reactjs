import type { ChangeEvent, HTMLInputTypeAttribute } from "react"
import styles from "./InputField.module.scss"

type InputFieldProps = {
  /** Field label (will be capitalized) */
  label: string
  /** Input value */
  value: string | number
  /** Change handler */
  onChange: (value: string | number) => void
  /** Input type (text, email, tel, number, etc.) */
  type?: HTMLInputTypeAttribute
  /** Optional placeholder text */
  placeholder?: string
  /** Optional required flag */
  required?: boolean
  /** Optional additional className */
  className?: string
  /** Optional min value for number inputs */
  min?: number
  /** Optional max value for number inputs */
  max?: number
  /** Optional step for number inputs */
  step?: number
}

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  className,
  min,
  max,
  step,
}: InputFieldProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = type === "number" ? Number(e.target.value) : e.target.value
    onChange(newValue)
  }

  return (
    <div className={`${styles.inputField} ${className ?? ""}`}>
      <label className={styles.inputField__label}>
        {label.toUpperCase()}
        {required && <span className={styles.inputField__required}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={styles.inputField__input}
        min={min}
        max={max}
        step={step}
      />
    </div>
  )
}

export default InputField
