import {
  useState,
  useEffect,
  type ChangeEvent,
  type HTMLInputTypeAttribute,
} from "react"
import styles from "./InputField.module.scss"

type InputFieldProps = {
  /** Field label (will be capitalized) */
  label: string
  /** Input value */
  value: string | number | null
  /** Change handler */
  onChange: (value: string | number | null) => void
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
  /** Optional debounce delay in ms (default: 500) */
  debounceDelay?: number
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
  debounceDelay = 500,
}: InputFieldProps) => {
  const [localValue, setLocalValue] = useState<string | number | null>(value)

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Debounce the onChange callback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue)
      }
    }, debounceDelay)

    return () => {
      clearTimeout(timer)
    }
  }, [localValue, debounceDelay, onChange, value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const newValue = e.target.value === "" ? null : Number(e.target.value)
      setLocalValue(newValue)
    } else {
      setLocalValue(e.target.value)
    }
  }

  return (
    <div className={`${styles.inputField} ${className ?? ""}`}>
      <label className={styles.inputField__label}>
        {label.toUpperCase()}
        {required && <span className={styles.inputField__required}>*</span>}
      </label>
      <input
        type={type}
        value={localValue ?? ""}
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
