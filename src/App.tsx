import "./App.scss"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "./components"
import { PreOffer, Confirmation, OfferSubmitted } from "./pages"

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/pre-offer" replace />} />
        <Route path="pre-offer" element={<PreOffer />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="offer-submitted" element={<OfferSubmitted />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
