import { useNavigate, useLocation } from "react-router-dom"
import { Card, FormSection, ValueField, Button } from "../components"
import styles from "./Confirmation.module.scss"

type LocationState = {
  formData: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    addressFrom: string
    addressTo: string
    livingAreaInM2: number
    extraAreaInM2: number
    numbersOfPianos: number
    packingAssistanceNeeded: boolean
  }
  estimatedPrice?: {
    value: number
    currency: string
  }
}

const Confirmation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null

  // If no state, redirect to pre-offer
  if (!state?.formData) {
    void navigate("/")
    return null
  }

  const { formData, estimatedPrice } = state

  const handleEditDetails = () => {
    void navigate("/", { state: { formData } })
  }

  const handleConfirmSubmit = () => {
    // TODO: Implement submission logic
    console.log("Offer confirmed and submitted")
  }

  return (
    <div className={styles.confirmation}>
      <div className={styles.confirmation__container}>
        <div className={styles.confirmation__header}>
          <div className={styles.confirmation__successIcon}>✓</div>
          <h2 className={styles.confirmation__title}>Offer calculated!</h2>
        </div>

        {estimatedPrice && (
          <div className={styles.confirmation__price}>
            <p className={styles.confirmation__priceLabel}>
              Your estimated price is:
            </p>
            <p className={styles.confirmation__priceValue}>
              ${estimatedPrice.value} {estimatedPrice.currency}
            </p>
            <p className={styles.confirmation__priceTax}>incl. taxes</p>
          </div>
        )}

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
          <Button variant="secondary" onClick={handleEditDetails}>
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
