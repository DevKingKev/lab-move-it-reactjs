import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../utils/test-utils"
import InputField from "../InputField"

describe("InputField", () => {
  test("renders and handles change", () => {
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

  test("capitalizes label", () => {
    const handleChange = vi.fn()
    renderWithProviders(
      <InputField label="lowercase label" value="" onChange={handleChange} />,
    )

    expect(screen.getByText("LOWERCASE LABEL")).toBeInTheDocument()
  })

  test("shows required indicator when required", () => {
    const handleChange = vi.fn()
    renderWithProviders(
      <InputField
        label="Required Field"
        value=""
        onChange={handleChange}
        required
      />,
    )

    expect(screen.getByText("REQUIRED FIELD")).toBeInTheDocument()
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  test("handles number type input", () => {
    const handleChange = vi.fn()
    renderWithProviders(
      <InputField
        label="Number Field"
        value={0}
        onChange={handleChange}
        type="number"
      />,
    )

    const input = screen.getByDisplayValue("0")
    expect(input).toHaveAttribute("type", "number")
  })
})
