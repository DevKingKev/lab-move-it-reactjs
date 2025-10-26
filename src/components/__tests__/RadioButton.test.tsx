import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../utils/test-utils"
import RadioButton from "../RadioButton"

describe("RadioButton", () => {
  test("renders with options", () => {
    const handleChange = vi.fn()
    renderWithProviders(
      <RadioButton
        label="Test Radio"
        value="yes"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        onChange={handleChange}
        name="testRadio"
      />,
    )

    expect(screen.getByText("TEST RADIO")).toBeInTheDocument()
    expect(screen.getByText("YES")).toBeInTheDocument()
    expect(screen.getByText("NO")).toBeInTheDocument()
  })

  test("capitalizes label", () => {
    const handleChange = vi.fn()
    renderWithProviders(
      <RadioButton
        label="lowercase radio label"
        value="option1"
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
        ]}
        onChange={handleChange}
        name="testRadio"
      />,
    )

    expect(screen.getByText("LOWERCASE RADIO LABEL")).toBeInTheDocument()
  })

  test("capitalizes option labels", () => {
    const handleChange = vi.fn()
    renderWithProviders(
      <RadioButton
        label="Test Radio"
        value="yes"
        options={[
          { value: "yes", label: "yes" },
          { value: "no", label: "no" },
        ]}
        onChange={handleChange}
        name="testRadio"
      />,
    )

    expect(screen.getByText("YES")).toBeInTheDocument()
    expect(screen.getByText("NO")).toBeInTheDocument()
  })

  test("shows required indicator when required", () => {
    const handleChange = vi.fn()
    renderWithProviders(
      <RadioButton
        label="Required Radio"
        value="yes"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        onChange={handleChange}
        name="testRadio"
        required
      />,
    )

    expect(screen.getByText("REQUIRED RADIO")).toBeInTheDocument()
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  test("handles boolean values", () => {
    const handleChange = vi.fn()
    renderWithProviders(
      <RadioButton
        label="Boolean Radio"
        value={true}
        options={[
          { value: true, label: "True" },
          { value: false, label: "False" },
        ]}
        onChange={handleChange}
        name="booleanRadio"
      />,
    )

    expect(screen.getByText("TRUE")).toBeInTheDocument()
    expect(screen.getByText("FALSE")).toBeInTheDocument()
  })
})
