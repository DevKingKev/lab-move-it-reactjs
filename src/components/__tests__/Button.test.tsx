import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../utils/test-utils"
import Button from "../Button"

describe("Button", () => {
  test("renders with text", () => {
    renderWithProviders(<Button>Test Button</Button>)

    expect(screen.getByText("Test Button")).toBeInTheDocument()
  })

  test("renders with primary variant by default", () => {
    renderWithProviders(<Button>Primary Button</Button>)

    const button = screen.getByText("Primary Button")
    expect(button).toBeInTheDocument()
  })

  test("renders with secondary variant", () => {
    renderWithProviders(<Button variant="secondary">Secondary Button</Button>)

    const button = screen.getByText("Secondary Button")
    expect(button).toBeInTheDocument()
  })

  test("renders full width button", () => {
    renderWithProviders(<Button fullWidth>Full Width Button</Button>)

    const button = screen.getByText("Full Width Button")
    expect(button).toBeInTheDocument()
  })
})
