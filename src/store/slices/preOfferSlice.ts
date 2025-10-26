import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../global/createAppSlice";

/**
 * Pre-offer form state
 */
export type PreOfferState = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addressFrom: string;
    addressTo: string;
    livingAreaInM2: number | null;
    extraAreaInM2: number | null;
    numbersOfPianos: number | null;
    packingAssistanceNeeded: boolean;
    // Cached estimated price from API
    estimatedPrice: {
        value: number;
        currency: string;
    } | null;
    // Last submitted form data (for cache comparison)
    lastSubmittedData: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        addressFrom: string;
        addressTo: string;
        livingAreaInM2: number;
        extraAreaInM2: number;
        numbersOfPianos: number;
        packingAssistanceNeeded: boolean;
    } | null;
};

const initialState: PreOfferState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    addressFrom: "",
    addressTo: "",
    livingAreaInM2: null,
    extraAreaInM2: null,
    numbersOfPianos: null,
    packingAssistanceNeeded: false,
    estimatedPrice: null,
    lastSubmittedData: null,
};

export const preOfferSlice = createAppSlice( {
    name: "preOffer",
    initialState,
    reducers: create => ( {
        /**
         * Update a specific field in the pre-offer form
         */
        updateField: create.reducer(
            ( state, action: PayloadAction<{ field: keyof PreOfferState; value: PreOfferState[keyof PreOfferState]; }> ) => {
                const { field, value } = action.payload;
                // TypeScript will ensure type safety here
                state[field] = value as never;
            },
        ),

        /**
         * Update multiple fields at once
         */
        updateMultipleFields: create.reducer(
            ( state, action: PayloadAction<Partial<PreOfferState>> ) => {
                return { ...state, ...action.payload };
            },
        ),

        /**
         * Reset the form to initial state
         */
        resetForm: create.reducer( () => {
            return initialState;
        } ),

        /**
         * Set contact information
         */
        setContactInfo: create.reducer(
            (
                state,
                action: PayloadAction<{
                    firstName: string;
                    lastName: string;
                    email: string;
                    phoneNumber: string;
                }>,
            ) => {
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.email = action.payload.email;
                state.phoneNumber = action.payload.phoneNumber;
            },
        ),

        /**
         * Set address information
         */
        setAddresses: create.reducer(
            (
                state,
                action: PayloadAction<{
                    addressFrom: string;
                    addressTo: string;
                }>,
            ) => {
                state.addressFrom = action.payload.addressFrom;
                state.addressTo = action.payload.addressTo;
            },
        ),

        /**
         * Set moving details
         */
        setMovingDetails: create.reducer(
            (
                state,
                action: PayloadAction<{
                    livingAreaInM2: number;
                    extraAreaInM2: number;
                    numbersOfPianos: number;
                    packingAssistanceNeeded: boolean;
                }>,
            ) => {
                state.livingAreaInM2 = action.payload.livingAreaInM2;
                state.extraAreaInM2 = action.payload.extraAreaInM2;
                state.numbersOfPianos = action.payload.numbersOfPianos;
                state.packingAssistanceNeeded = action.payload.packingAssistanceNeeded;
            },
        ),

        /**
         * Store the calculated price and submitted data
         */
        setEstimatedPrice: create.reducer(
            (
                state,
                action: PayloadAction<{
                    estimatedPrice: {
                        value: number;
                        currency: string;
                    };
                    submittedData: {
                        firstName: string;
                        lastName: string;
                        email: string;
                        phoneNumber: string;
                        addressFrom: string;
                        addressTo: string;
                        livingAreaInM2: number;
                        extraAreaInM2: number;
                        numbersOfPianos: number;
                        packingAssistanceNeeded: boolean;
                    };
                }>,
            ) => {
                state.estimatedPrice = action.payload.estimatedPrice;
                state.lastSubmittedData = action.payload.submittedData;
            },
        ),

        /**
         * Clear the cached price (e.g., when form changes)
         */
        clearEstimatedPrice: create.reducer( ( state ) => {
            state.estimatedPrice = null;
            state.lastSubmittedData = null;
        } ),
    } ),
    selectors: {
        /**
         * Select the entire pre-offer state
         */
        selectPreOfferState: state => state,

        /**
         * Select contact information
         */
        selectContactInfo: state => ( {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            phoneNumber: state.phoneNumber,
        } ),

        /**
         * Select address information
         */
        selectAddresses: state => ( {
            addressFrom: state.addressFrom,
            addressTo: state.addressTo,
        } ),

        /**
         * Select moving details
         */
        selectMovingDetails: state => ( {
            livingAreaInM2: state.livingAreaInM2,
            extraAreaInM2: state.extraAreaInM2,
            numbersOfPianos: state.numbersOfPianos,
            packingAssistanceNeeded: state.packingAssistanceNeeded,
        } ),

        /**
         * Select rate calculation parameters (for API call)
         */
        selectRateParams: state => ( {
            livingAreaInM2: state.livingAreaInM2,
            extraAreaInM2: state.extraAreaInM2,
            numbersOfPianos: state.numbersOfPianos,
        } ),

        /**
         * Check if the form is valid (basic validation)
         */
        selectIsFormValid: state => {
            return (
                state.firstName.trim() !== "" &&
                state.lastName.trim() !== "" &&
                state.email.trim() !== "" &&
                state.phoneNumber.trim() !== "" &&
                state.addressFrom.trim() !== "" &&
                state.addressTo.trim() !== "" &&
                state.livingAreaInM2 !== null &&
                state.livingAreaInM2 > 0
            );
        },

        /**
         * Select the estimated price
         */
        selectEstimatedPrice: state => state.estimatedPrice,

        /**
         * Select the last submitted data
         */
        selectLastSubmittedData: state => state.lastSubmittedData,

        /**
         * Check if current form data matches last submitted data
         */
        selectIsFormDataUnchanged: state => {
            if ( !state.lastSubmittedData ) {
                return false;
            }

            const last = state.lastSubmittedData;
            return (
                state.firstName === last.firstName &&
                state.lastName === last.lastName &&
                state.email === last.email &&
                state.phoneNumber === last.phoneNumber &&
                state.addressFrom === last.addressFrom &&
                state.addressTo === last.addressTo &&
                ( state.livingAreaInM2 ?? 0 ) === last.livingAreaInM2 &&
                ( state.extraAreaInM2 ?? 0 ) === last.extraAreaInM2 &&
                ( state.numbersOfPianos ?? 0 ) === last.numbersOfPianos &&
                state.packingAssistanceNeeded === last.packingAssistanceNeeded
            );
        },
    },
} );

// Export actions
export const {
    updateField,
    updateMultipleFields,
    resetForm,
    setContactInfo,
    setAddresses,
    setMovingDetails,
    setEstimatedPrice,
    clearEstimatedPrice,
} = preOfferSlice.actions;

// Export selectors
export const {
    selectPreOfferState,
    selectContactInfo,
    selectAddresses,
    selectMovingDetails,
    selectRateParams,
    selectIsFormValid,
    selectEstimatedPrice,
    selectLastSubmittedData,
    selectIsFormDataUnchanged,
} = preOfferSlice.selectors;
