import type { ReactNode } from "react"
import styles from "./FormSection.module.scss"

type FormSectionProps = {
  /** Form section content (InputFields) */
  children: ReactNode
  /** Optional layout: "grid" for two-column, "stack" for single column */
  layout?: "grid" | "stack"
  /** Optional additional className */
  className?: string
}

const FormSection = ({
  children,
  layout = "grid",
  className,
}: FormSectionProps) => {
  return (
    <div
      className={`${styles.formSection} ${styles[`formSection--${layout}`]} ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  )
}

export default FormSection
