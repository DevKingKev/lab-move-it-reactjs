import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../utils/test-utils"
import Card from "../Card/Card"
import InputField from "../InputField/InputField"
import Button from "../Button/Button"
import FormSection from "../FormSection/FormSection"

describe("Component Integration", () => {
  test("Card renders with step and header", () => {
    renderWithProviders(
      <Card step="1" header="Test Header">
        <p>Test content</p>
      </Card>,
    )

    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("Test Header")).toBeInTheDocument()
    expect(screen.getByText("Test content")).toBeInTheDocument()
  })

  test("Card renders without step", () => {
    renderWithProviders(
      <Card header="Test Header">
        <p>Test content</p>
      </Card>,
    )

    expect(screen.queryByText("1")).not.toBeInTheDocument()
    expect(screen.getByText("Test Header")).toBeInTheDocument()
  })

  test("InputField renders and handles change", () => {
    const handleChange = vi.fn()
    renderWithProviders(
      <InputField
        label="Test Field"
        value=""
        onChange={handleChange}
        placeholder="Enter text"
      />,
    )

    expect(screen.getByText("TEST FIELD")).toBeInTheDocument()
    const input = screen.getByPlaceholderText("Enter text")
    expect(input).toBeInTheDocument()
  })

  test("Button renders with text", () => {
    renderWithProviders(<Button>Test Button</Button>)

    expect(screen.getByText("Test Button")).toBeInTheDocument()
  })

  test("FormSection renders children", () => {
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
})
