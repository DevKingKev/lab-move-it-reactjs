import type { ReactNode } from "react"
import styles from "./FormSection.module.scss"

type FormSectionProps = {
  /** Form section content (InputFields) */
  children: ReactNode
  /** Optional layout: "grid" for two-column, "stack" for single column */
  layout?: "grid" | "stack"
  /** Mode: "input" for form fields (default), "display" for read-only values */
  mode?: "input" | "display"
  /** Optional additional className */
  className?: string
}

const FormSection = ({
  children,
  layout = "grid",
  mode = "input",
  className,
}: FormSectionProps) => {
  const modeClass = mode === "display" ? styles["formSection--display"] : ""

  return (
    <div
      className={`${styles.formSection} ${styles[`formSection--${layout}`]} ${modeClass} ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  )
}

export default FormSection
