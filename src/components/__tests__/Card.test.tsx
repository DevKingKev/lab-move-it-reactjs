import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../utils/test-utils"
import Card from "../Card"

describe("Card", () => {
  test("renders with step and header", () => {
    renderWithProviders(
      <Card step="1" header="Test Header">
        <p>Test content</p>
      </Card>,
    )

    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("Test Header")).toBeInTheDocument()
    expect(screen.getByText("Test content")).toBeInTheDocument()
  })

  test("renders without step", () => {
    renderWithProviders(
      <Card header="Test Header">
        <p>Test content</p>
      </Card>,
    )

    expect(screen.queryByText("1")).not.toBeInTheDocument()
    expect(screen.getByText("Test Header")).toBeInTheDocument()
  })

  test("renders with custom className", () => {
    renderWithProviders(
      <Card header="Test Header" className="custom-class">
        <p>Test content</p>
      </Card>,
    )

    expect(screen.getByText("Test Header")).toBeInTheDocument()
  })
})
