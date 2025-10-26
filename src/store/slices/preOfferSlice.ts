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
} = preOfferSlice.actions;

// Export selectors
export const {
    selectPreOfferState,
    selectContactInfo,
    selectAddresses,
    selectMovingDetails,
    selectRateParams,
    selectIsFormValid,
} = preOfferSlice.selectors;
