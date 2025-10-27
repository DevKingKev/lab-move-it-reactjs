import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../global/hooks"
import {
  selectLastSubmittedData,
  resetForm,
} from "../store/slices/preOfferSlice"
import { Button } from "../components"
import styles from "./OfferSubmitted.module.scss"

const OfferSubmitted = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const lastSubmittedData = useAppSelector(selectLastSubmittedData)

  // If no last submitted data, redirect to pre-offer
  if (!lastSubmittedData) {
    void navigate("/pre-offer")
    return null
  }

  const handleMakeAnotherOffer = () => {
    // Reset the pre-offer state to start fresh
    dispatch(resetForm())
    void navigate("/pre-offer")
  }

  return (
    <div className={styles.offerSubmitted}>
      <div className={styles.offerSubmitted__container}>
        <div className={styles.offerSubmitted__header}>
          <div className={styles.offerSubmitted__successIcon}>
            <img src="/img/check_circle.svg" alt="Success" />
          </div>
          <h1 className={styles.offerSubmitted__title}>Offer Submitted!</h1>
        </div>

        <div className={styles.offerSubmitted__content}>
          <p className={styles.offerSubmitted__message}>
            Your offer has been successfully submitted to:
          </p>

          <div className={styles.offerSubmitted__details}>
            <p className={styles.offerSubmitted__name}>
              {lastSubmittedData.firstName} {lastSubmittedData.lastName}
            </p>
            <p className={styles.offerSubmitted__email}>
              {lastSubmittedData.email}
            </p>
          </div>

          <p className={styles.offerSubmitted__followUp}>
            We will contact you shortly with further details.
          </p>
        </div>

        <div className={styles.offerSubmitted__actions}>
          <Button variant="primary" onClick={handleMakeAnotherOffer}>
            Prepare another offer
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OfferSubmitted
