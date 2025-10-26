import type { AppStore } from "../../store";
import { makeStore } from "../../store";
import type { PreOfferState } from "../preOfferSlice";
import {
    preOfferSlice,
    updateField,
    updateMultipleFields,
    resetForm,
    setContactInfo,
    setAddresses,
    setMovingDetails,
    setEstimatedPrice,
    clearEstimatedPrice,
    selectPreOfferState,
    selectContactInfo,
    selectAddresses,
    selectMovingDetails,
    selectRateParams,
    selectIsFormValid,
    selectEstimatedPrice,
    selectLastSubmittedData,
    selectIsFormDataUnchanged,
} from "../preOfferSlice";

type LocalTestContext = {
    store: AppStore;
};

describe( "preOffer reducer", () => {
    beforeEach<LocalTestContext>( context => {
        const initialState: PreOfferState = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phoneNumber: "+46701234567",
            addressFrom: "Stockholm, Sweden",
            addressTo: "Gothenburg, Sweden",
            livingAreaInM2: 80,
            extraAreaInM2: 20,
            numbersOfPianos: 1,
            packingAssistanceNeeded: true,
            estimatedPrice: null,
            lastSubmittedData: null,
        };

        const store = makeStore( { preOffer: initialState } );

        context.store = store;
    } );

    it( "should handle initial state", () => {
        expect( preOfferSlice.reducer( undefined, { type: "unknown" } ) ).toStrictEqual( {
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
        } );
    } );

    it<LocalTestContext>( "should handle updateField", ( { store } ) => {
        expect( selectPreOfferState( store.getState() ).firstName ).toBe( "John" );

        store.dispatch( updateField( { field: "firstName", value: "Jane" } ) );

        expect( selectPreOfferState( store.getState() ).firstName ).toBe( "Jane" );
    } );

    it<LocalTestContext>( "should handle updateMultipleFields", ( { store } ) => {
        store.dispatch(
            updateMultipleFields( {
                firstName: "Jane",
                lastName: "Smith",
                email: "jane.smith@example.com",
            } ),
        );

        const state = selectPreOfferState( store.getState() );
        expect( state.firstName ).toBe( "Jane" );
        expect( state.lastName ).toBe( "Smith" );
        expect( state.email ).toBe( "jane.smith@example.com" );
    } );

    it<LocalTestContext>( "should handle resetForm", ( { store } ) => {
        store.dispatch( resetForm() );

        const state = selectPreOfferState( store.getState() );
        expect( state ).toStrictEqual( {
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
        } );
    } );

    it<LocalTestContext>( "should handle setContactInfo", ( { store } ) => {
        store.dispatch(
            setContactInfo( {
                firstName: "Alice",
                lastName: "Johnson",
                email: "alice@example.com",
                phoneNumber: "+46709876543",
            } ),
        );

        const contactInfo = selectContactInfo( store.getState() );
        expect( contactInfo.firstName ).toBe( "Alice" );
        expect( contactInfo.lastName ).toBe( "Johnson" );
        expect( contactInfo.email ).toBe( "alice@example.com" );
        expect( contactInfo.phoneNumber ).toBe( "+46709876543" );
    } );

    it<LocalTestContext>( "should handle setAddresses", ( { store } ) => {
        store.dispatch(
            setAddresses( {
                addressFrom: "Malmö, Sweden",
                addressTo: "Uppsala, Sweden",
            } ),
        );

        const addresses = selectAddresses( store.getState() );
        expect( addresses.addressFrom ).toBe( "Malmö, Sweden" );
        expect( addresses.addressTo ).toBe( "Uppsala, Sweden" );
    } );

    it<LocalTestContext>( "should handle setMovingDetails", ( { store } ) => {
        store.dispatch(
            setMovingDetails( {
                livingAreaInM2: 120,
                extraAreaInM2: 30,
                numbersOfPianos: 2,
                packingAssistanceNeeded: false,
            } ),
        );

        const movingDetails = selectMovingDetails( store.getState() );
        expect( movingDetails.livingAreaInM2 ).toBe( 120 );
        expect( movingDetails.extraAreaInM2 ).toBe( 30 );
        expect( movingDetails.numbersOfPianos ).toBe( 2 );
        expect( movingDetails.packingAssistanceNeeded ).toBe( false );
    } );

    it<LocalTestContext>( "should select rate params correctly", ( { store } ) => {
        const rateParams = selectRateParams( store.getState() );
        expect( rateParams ).toStrictEqual( {
            livingAreaInM2: 80,
            extraAreaInM2: 20,
            numbersOfPianos: 1,
        } );
    } );

    it<LocalTestContext>( "should validate form correctly", ( { store } ) => {
        // Initial state should be valid
        expect( selectIsFormValid( store.getState() ) ).toBe( true );

        // Reset form - should be invalid
        store.dispatch( resetForm() );
        expect( selectIsFormValid( store.getState() ) ).toBe( false );

        // Set only contact info - still invalid (missing addresses and living area)
        store.dispatch(
            setContactInfo( {
                firstName: "Test",
                lastName: "User",
                email: "test@example.com",
                phoneNumber: "+46701234567",
            } ),
        );
        expect( selectIsFormValid( store.getState() ) ).toBe( false );

        // Add addresses and living area - should be valid
        store.dispatch(
            setAddresses( {
                addressFrom: "Address A",
                addressTo: "Address B",
            } ),
        );
        store.dispatch(
            setMovingDetails( {
                livingAreaInM2: 50,
                extraAreaInM2: 0,
                numbersOfPianos: 0,
                packingAssistanceNeeded: false,
            } ),
        );
        expect( selectIsFormValid( store.getState() ) ).toBe( true );
    } );

    it<LocalTestContext>( "should handle setEstimatedPrice", ( { store } ) => {
        const estimatedPrice = { value: 1000, currency: "USD" };
        const submittedData = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phoneNumber: "+46701234567",
            addressFrom: "Stockholm, Sweden",
            addressTo: "Gothenburg, Sweden",
            livingAreaInM2: 80,
            extraAreaInM2: 20,
            numbersOfPianos: 1,
            packingAssistanceNeeded: true,
        };

        store.dispatch( setEstimatedPrice( { estimatedPrice, submittedData } ) );

        expect( selectEstimatedPrice( store.getState() ) ).toStrictEqual( estimatedPrice );
        expect( selectLastSubmittedData( store.getState() ) ).toStrictEqual( submittedData );
    } );

    it<LocalTestContext>( "should handle clearEstimatedPrice", ( { store } ) => {
        // First set a price
        store.dispatch(
            setEstimatedPrice( {
                estimatedPrice: { value: 1000, currency: "USD" },
                submittedData: {
                    firstName: "John",
                    lastName: "Doe",
                    email: "john.doe@example.com",
                    phoneNumber: "+46701234567",
                    addressFrom: "Stockholm, Sweden",
                    addressTo: "Gothenburg, Sweden",
                    livingAreaInM2: 80,
                    extraAreaInM2: 20,
                    numbersOfPianos: 1,
                    packingAssistanceNeeded: true,
                },
            } ),
        );

        // Then clear it
        store.dispatch( clearEstimatedPrice() );

        expect( selectEstimatedPrice( store.getState() ) ).toBeNull();
        expect( selectLastSubmittedData( store.getState() ) ).toBeNull();
    } );

    it<LocalTestContext>( "should detect unchanged form data", ( { store } ) => {
        // Set estimated price with submitted data
        store.dispatch(
            setEstimatedPrice( {
                estimatedPrice: { value: 1000, currency: "USD" },
                submittedData: {
                    firstName: "John",
                    lastName: "Doe",
                    email: "john.doe@example.com",
                    phoneNumber: "+46701234567",
                    addressFrom: "Stockholm, Sweden",
                    addressTo: "Gothenburg, Sweden",
                    livingAreaInM2: 80,
                    extraAreaInM2: 20,
                    numbersOfPianos: 1,
                    packingAssistanceNeeded: true,
                },
            } ),
        );

        // Data should be unchanged (matches initial state)
        expect( selectIsFormDataUnchanged( store.getState() ) ).toBe( true );

        // Change a field
        store.dispatch( updateField( { field: "firstName", value: "Jane" } ) );

        // Data should now be changed
        expect( selectIsFormDataUnchanged( store.getState() ) ).toBe( false );
    } );
} );
