import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../utils/test-utils"
import FormSection from "../FormSection"
import InputField from "../InputField"

describe("FormSection", () => {
  test("renders children", () => {
    const handleChange = vi.fn()
    renderWithProviders(
      <FormSection>
        <InputField label="Field 1" value="" onChange={handleChange} />
        <InputField label="Field 2" value="" onChange={handleChange} />
      </FormSection>,
    )

    expect(screen.getByText("FIELD 1")).toBeInTheDocument()
    expect(screen.getByText("FIELD 2")).toBeInTheDocument()
  })

  test("renders with grid layout by default", () => {
    const handleChange = vi.fn()
    renderWithProviders(
      <FormSection>
        <InputField label="Test Field" value="" onChange={handleChange} />
      </FormSection>,
    )

    expect(screen.getByText("TEST FIELD")).toBeInTheDocument()
  })

  test("renders with stack layout", () => {
    const handleChange = vi.fn()
    renderWithProviders(
      <FormSection layout="stack">
        <InputField label="Test Field" value="" onChange={handleChange} />
      </FormSection>,
    )

    expect(screen.getByText("TEST FIELD")).toBeInTheDocument()
  })
})
