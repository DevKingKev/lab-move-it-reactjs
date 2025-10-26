import { screen } from "@testing-library/react"
import { App } from "../App"
import { renderWithProviders } from "../utils/test-utils"

test("App should render Layout with header", () => {
  renderWithProviders(<App />)

  // The app should render the Move-It header
  expect(screen.getByRole("heading", { name: /Move-It/i })).toBeInTheDocument()
})

test("App should render PreOffer page by default", () => {
  renderWithProviders(<App />)

  // The PreOffer page should be rendered by default
  expect(screen.getByText(/Get Your Moving Quote/i)).toBeInTheDocument()
})
