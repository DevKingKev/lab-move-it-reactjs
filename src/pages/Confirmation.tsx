import styles from "./Confirmation.module.scss"

const Confirmation = () => {
  return (
    <div className={styles.confirmation}>
      <div className={styles.confirmation__container}>
        <h2 className={styles.confirmation__title}>Your Moving Quote</h2>

        <div className={styles.confirmation__content}>
          <div className={styles.confirmation__priceSection}>
            {/* Price display component will be added here */}
            <div className={styles.confirmation__pricePlaceholder}>
              <p>Price display will be shown here...</p>
            </div>
          </div>

          <div className={styles.confirmation__detailsSection}>
            {/* Details summary components will be added here */}
            <div className={styles.confirmation__detailsPlaceholder}>
              <p>Move details summary will be shown here...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
