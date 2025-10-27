import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../global/hooks"
import {
  selectEstimatedPrice,
  selectLastSubmittedData,
} from "../store/slices/preOfferSlice"
import { calculateDistanceFromAddresses } from "../utils/distanceUtils"
import { formatPrice } from "../utils/currencyUtils"
import { Card, FormSection, ValueField, Button } from "../components"
import styles from "./Confirmation.module.scss"

const Confirmation = () => {
  const navigate = useNavigate()
  const estimatedPrice = useAppSelector(selectEstimatedPrice)
  const lastSubmittedData = useAppSelector(selectLastSubmittedData)

  // If no estimated price or last submitted data, redirect to pre-offer
  if (!estimatedPrice || !lastSubmittedData) {
    void navigate("/")
    return null
  }

  // Use the last submitted data for display
  const formData = lastSubmittedData

  // Calculate distance for display
  const distanceInKm = calculateDistanceFromAddresses(
    formData.addressFrom,
    formData.addressTo,
  )

  const handleEditDetails = () => {
    void navigate("/")
  }

  const handleConfirmSubmit = () => {
    // Navigate to the offer submitted page
    void navigate("/offer-submitted")
  }

  return (
    <div className={styles.confirmation}>
      <div className={styles.confirmation__container}>
        <div className={styles.confirmation__header}>
          <div className={styles.confirmation__successIcon}>
            <img src="/img/check_circle.svg" alt="Success" />
          </div>
          <h2 className={styles.confirmation__title}>Offer calculated!</h2>
        </div>

        <div className={styles.confirmation__price}>
          <p className={styles.confirmation__priceLabel}>
            Your estimated price is:
          </p>
          <p className={styles.confirmation__priceValue}>
            {formatPrice(estimatedPrice.value, estimatedPrice.currency)}
          </p>
          <p className={styles.confirmation__priceTax}>incl. taxes</p>
        </div>

        <div className={styles.confirmation__details}>
          <p className={styles.confirmation__detailsHeader}>
            Based on your submitted details:
          </p>

          {/* Contact Details Card */}
          <Card header="Contact details" mode="display">
            <FormSection layout="grid" mode="display">
              <ValueField
                label="Name"
                value={`${formData.firstName} ${formData.lastName}`}
              />
              <ValueField label="Phone Number" value={formData.phoneNumber} />
              <ValueField label="E-mail" value={formData.email} type="email" />
            </FormSection>
          </Card>

          {/* Address Details Card */}
          <Card header="Address details" mode="display">
            <FormSection layout="grid" mode="display">
              <ValueField label="From" value={formData.addressFrom} />
              <ValueField label="To" value={formData.addressTo} />
              <ValueField
                label="Distance"
                value={`${distanceInKm.toFixed(2)} KM`}
              />
            </FormSection>
          </Card>

          {/* Moving Details Card */}
          <Card header="Moving details" mode="display">
            <FormSection layout="grid" mode="display">
              <ValueField
                label="Surface Area SQM"
                value={`${String(formData.livingAreaInM2)} SQM`}
              />
              <ValueField
                label="Ancillary Area SQM"
                value={`${String(formData.extraAreaInM2)} SQM`}
              />
              <ValueField
                label="Bulky Items"
                value={`${String(formData.numbersOfPianos)} PIANO`}
              />
              <ValueField
                label="Packing Assistance"
                value={formData.packingAssistanceNeeded}
              />
            </FormSection>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className={styles.confirmation__actions}>
          <Button variant="primary" onClick={handleEditDetails}>
            Edit details
          </Button>
          <Button variant="primary" onClick={handleConfirmSubmit}>
            Confirm and submit offer
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
