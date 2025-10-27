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
  /** Optional error state */
  error?: boolean
  /** Optional validation function */
  validate?: (value: string | number | null) => boolean
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
  error = false,
  validate,
}: InputFieldProps) => {
  const [localValue, setLocalValue] = useState<string | number | null>(value)
  const [hasInteracted, setHasInteracted] = useState(false)

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
      // For number inputs, only allow valid numbers
      const inputValue = e.target.value
      if (inputValue === "") {
        setLocalValue(null)
      } else {
        const numValue = Number(inputValue)
        if (!isNaN(numValue)) {
          setLocalValue(numValue)
        }
      }
    } else {
      setLocalValue(e.target.value)
    }
  }

  const handleBlur = () => {
    setHasInteracted(true)
  }

  // Determine if field should show error state
  const isInvalid =
    hasInteracted && (error || (validate && !validate(localValue)))
  const errorClass = isInvalid ? styles["inputField__input--error"] : ""

  return (
    <div className={`${styles.inputField} ${className ?? ""}`}>
      <label className={styles.inputField__label}>{label.toUpperCase()}</label>
      <input
        type={type}
        value={localValue ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        className={`${styles.inputField__input} ${errorClass}`}
        min={min}
        max={max}
        step={step}
      />
    </div>
  )
}

export default InputField
