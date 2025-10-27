import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../global/hooks"
import {
  updateField,
  selectPreOfferState,
  selectEstimatedPrice,
  selectIsFormDataUnchanged,
  setEstimatedPrice,
} from "../store/slices/preOfferSlice"
import { useLazyGetRateQuery } from "../services/rateAPI"
import { calculateDistanceFromAddresses } from "../utils/distanceUtils"
import { isValidEmail, isValidPhoneNumber, hasValue } from "../utils/validators"
import {
  Card,
  FormSection,
  InputField,
  Button,
  RadioButton,
  Spinner,
} from "../components"
import styles from "./PreOffer.module.scss"

const PreOffer = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const formData = useAppSelector(selectPreOfferState)
  const estimatedPrice = useAppSelector(selectEstimatedPrice)
  const isFormDataUnchanged = useAppSelector(selectIsFormDataUnchanged)
  const [getRateQuery, { isLoading: isLoadingRate }] = useLazyGetRateQuery()
  const [error, setError] = useState<string | null>(null)

  // Check if all required fields are valid
  const isFormValid = () => {
    return (
      hasValue(formData.firstName) &&
      hasValue(formData.lastName) &&
      isValidEmail(formData.email) &&
      isValidPhoneNumber(formData.phoneNumber) &&
      hasValue(formData.addressFrom) &&
      hasValue(formData.addressTo) &&
      formData.livingAreaInM2 !== null &&
      formData.livingAreaInM2 > 0
    )
  }

  const handleFieldChange = (
    field: keyof typeof formData,
    value: string | number | boolean | null,
  ) => {
    dispatch(updateField({ field, value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Convert null values to 0 before submitting
    const submissionData = {
      ...formData,
      livingAreaInM2: formData.livingAreaInM2 ?? 0,
      extraAreaInM2: formData.extraAreaInM2 ?? 0,
      numbersOfPianos: formData.numbersOfPianos ?? 0,
    }

    // Check if we have a cached calculation with identical data
    if (isFormDataUnchanged && estimatedPrice) {
      // Reuse cached price without API call
      void navigate("/confirmation")
      return
    }

    // Calculate distance between addresses
    const distanceInKm = calculateDistanceFromAddresses(
      formData.addressFrom,
      formData.addressTo,
    )

    // Prepare API parameters
    const params = {
      distanceInKm,
      livingAreaInM2: submissionData.livingAreaInM2,
      extraAreaInM2: submissionData.extraAreaInM2,
      numbersOfPianos: submissionData.numbersOfPianos,
    }

    // Call the rate API
    void getRateQuery(params)
      .unwrap()
      .then(result => {
        // Store the calculation in Redux for future comparison
        dispatch(
          setEstimatedPrice({
            estimatedPrice: result,
            submittedData: submissionData,
          }),
        )

        // Navigate to confirmation
        void navigate("/confirmation")
      })
      .catch((err: unknown) => {
        console.error("Failed to get rate:", err)
        setError("Failed to calculate rate. Please try again.")
      })
  }

  return (
    <div className={styles.preOffer}>
      <div className={styles.preOffer__container}>
        <h1 className={styles.preOffer__title}>Pre-offer for home moving</h1>

        <form className={styles.preOffer__form} onSubmit={handleSubmit}>
          {/* Step 1: Contact Details */}
          <Card step="1" header="Contact details">
            <FormSection layout="grid">
              <InputField
                label="First Name"
                value={formData.firstName}
                onChange={value => {
                  handleFieldChange("firstName", value)
                }}
                type="text"
                required
                validate={hasValue}
              />
              <InputField
                label="Last Name"
                value={formData.lastName}
                onChange={value => {
                  handleFieldChange("lastName", value)
                }}
                type="text"
                required
                validate={hasValue}
              />
              <InputField
                label="E-mail"
                value={formData.email}
                onChange={value => {
                  handleFieldChange("email", value)
                }}
                type="email"
                required
                validate={isValidEmail}
              />
              <InputField
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={value => {
                  handleFieldChange("phoneNumber", value)
                }}
                type="tel"
                required
                validate={isValidPhoneNumber}
              />
            </FormSection>
          </Card>

          {/* Step 2: Address Details */}
          <Card step="2" header="Address details">
            <FormSection layout="grid">
              <InputField
                label="From which address are you moving?"
                value={formData.addressFrom}
                onChange={value => {
                  handleFieldChange("addressFrom", value)
                }}
                type="text"
                placeholder="Address, zipcode, city"
                required
                validate={hasValue}
              />
              <InputField
                label="To which address are you moving?"
                value={formData.addressTo}
                onChange={value => {
                  handleFieldChange("addressTo", value)
                }}
                type="text"
                placeholder="Address, zipcode, city"
                required
                validate={hasValue}
              />
            </FormSection>
          </Card>

          {/* Step 3: Moving Details */}
          <Card step="3" header="Moving details">
            <FormSection layout="grid">
              <InputField
                label="Surface area in sqm"
                value={formData.livingAreaInM2}
                onChange={value => {
                  handleFieldChange("livingAreaInM2", value)
                }}
                type="number"
                min={0}
                required
                validate={value =>
                  value !== null && typeof value === "number" && value > 0
                }
              />
              <InputField
                label="Any ancillary space, attic, forecourt, etc. in sqm"
                value={formData.extraAreaInM2}
                onChange={value => {
                  handleFieldChange("extraAreaInM2", value)
                }}
                type="number"
                min={0}
              />
              <InputField
                label="Any bulky items such as a piano etc"
                value={formData.numbersOfPianos}
                onChange={value => {
                  handleFieldChange("numbersOfPianos", value)
                }}
                type="number"
                min={0}
              />
              <RadioButton
                label="Is packing assistance needed?"
                value={formData.packingAssistanceNeeded}
                options={[
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ]}
                onChange={value => {
                  handleFieldChange("packingAssistanceNeeded", value)
                }}
                name="packingAssistance"
              />
            </FormSection>
          </Card>

          {/* Submit Button */}
          <div className={styles.preOffer__buttonContainer}>
            {error && <p className={styles.preOffer__error}>{error}</p>}
            <Button
              type="submit"
              fullWidth
              disabled={isLoadingRate || !isFormValid()}
            >
              {isLoadingRate ? "Calculating..." : "Request an offer"}
            </Button>
          </div>
        </form>
      </div>

      {/* Loading Overlay */}
      {isLoadingRate && (
        <Spinner
          size="large"
          fullPage={true}
          loadingText="Calculating your offer..."
        />
      )}
    </div>
  )
}

export default PreOffer
