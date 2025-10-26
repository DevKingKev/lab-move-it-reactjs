import type { ReactNode } from "react"
import styles from "./FormField.module.scss"

type FormFieldProps = {
  /** Form field content (InputFields) */
  children: ReactNode
  /** Optional layout: "grid" for two-column, "stack" for single column */
  layout?: "grid" | "stack"
  /** Optional additional className */
  className?: string
}

const FormField = ({
  children,
  layout = "grid",
  className,
}: FormFieldProps) => {
  return (
    <div
      className={`${styles.formField} ${styles[`formField--${layout}`]} ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  )
}

export default FormField
