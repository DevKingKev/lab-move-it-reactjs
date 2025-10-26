import type { ButtonHTMLAttributes } from "react"
import styles from "./Button.module.scss"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Button text */
  children: string
  /** Button variant */
  variant?: "primary" | "secondary"
  /** Full width button */
  fullWidth?: boolean
  /** Optional additional className */
  className?: string
}

const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[`button--${variant}`]} ${
        fullWidth ? styles["button--fullWidth"] : ""
      } ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
