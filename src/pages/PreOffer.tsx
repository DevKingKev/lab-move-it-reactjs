import { useAppDispatch, useAppSelector } from "../global/hooks"
import { updateField, selectPreOfferState } from "../store/slices/preOfferSlice"
import { Card, FormSection, InputField, Button } from "../components"
import "./PreOffer.module.scss"

const PreOffer = () => {
  const dispatch = useAppDispatch()
  const formData = useAppSelector(selectPreOfferState)

  const handleFieldChange = (
    field: keyof typeof formData,
    value: string | number | boolean,
  ) => {
    dispatch(updateField({ field, value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement rate API call and navigation to confirmation
    console.log("Form submitted:", formData)
  }

  return (
    <div className="pre-offer">
      <div className="pre-offer__container">
        <h2 className="pre-offer__title">Pre-offer for home moving</h2>

        <form className="pre-offer__form" onSubmit={handleSubmit}>
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
              />
              <InputField
                label="Last Name"
                value={formData.lastName}
                onChange={value => {
                  handleFieldChange("lastName", value)
                }}
                type="text"
                required
              />
              <InputField
                label="E-mail"
                value={formData.email}
                onChange={value => {
                  handleFieldChange("email", value)
                }}
                type="email"
                required
              />
              <InputField
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={value => {
                  handleFieldChange("phoneNumber", value)
                }}
                type="tel"
                required
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
              <div className="pre-offer__checkbox-field">
                <label className="pre-offer__checkbox-label">
                  Is packing assistance needed?
                </label>
                <div className="pre-offer__radio-group">
                  <label className="pre-offer__radio-option">
                    <input
                      type="radio"
                      name="packingAssistance"
                      checked={formData.packingAssistanceNeeded}
                      onChange={() => {
                        handleFieldChange("packingAssistanceNeeded", true)
                      }}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="pre-offer__radio-option">
                    <input
                      type="radio"
                      name="packingAssistance"
                      checked={!formData.packingAssistanceNeeded}
                      onChange={() => {
                        handleFieldChange("packingAssistanceNeeded", false)
                      }}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </FormSection>
          </Card>

          {/* Submit Button */}
          <div className="pre-offer__button-container">
            <Button type="submit" fullWidth>
              Request an offer
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PreOffer
