import "./Confirmation.module.scss"

const Confirmation = () => {
  return (
    <div className="confirmation">
      <div className="confirmation__container">
        <h2 className="confirmation__title">Your Moving Quote</h2>

        <div className="confirmation__content">
          <div className="confirmation__price-section">
            {/* Price display component will be added here */}
            <div className="confirmation__price-placeholder">
              <p>Price display will be shown here...</p>
            </div>
          </div>

          <div className="confirmation__details-section">
            {/* Details summary components will be added here */}
            <div className="confirmation__details-placeholder">
              <p>Move details summary will be shown here...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
