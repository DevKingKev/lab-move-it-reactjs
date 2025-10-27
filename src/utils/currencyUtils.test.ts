import { describe, it, expect } from "vitest";
import {
    getCurrencySymbol,
    shouldDisplayCurrencyCode,
    formatPrice,
    getCurrencyPrefix,
    getCurrencySuffix,
} from "./currencyUtils";

describe( "currencyUtils", () => {
    describe( "getCurrencySymbol", () => {
        it( "should return correct symbol for USD", () => {
            expect( getCurrencySymbol( "USD" ) ).toBe( "$" );
        } );

        it( "should return correct symbol for EUR", () => {
            expect( getCurrencySymbol( "EUR" ) ).toBe( "€" );
        } );

        it( "should return correct symbol for SEK", () => {
            expect( getCurrencySymbol( "SEK" ) ).toBe( "kr" );
        } );

        it( "should return correct symbol for GBP", () => {
            expect( getCurrencySymbol( "GBP" ) ).toBe( "£" );
        } );

        it( "should return the currency code if no symbol is found", () => {
            expect( getCurrencySymbol( "XYZ" ) ).toBe( "XYZ" );
        } );

        it( "should handle lowercase currency codes", () => {
            expect( getCurrencySymbol( "usd" ) ).toBe( "$" );
            expect( getCurrencySymbol( "sek" ) ).toBe( "kr" );
        } );
    } );

    describe( "shouldDisplayCurrencyCode", () => {
        it( "should return true for SEK", () => {
            expect( shouldDisplayCurrencyCode( "SEK" ) ).toBe( true );
        } );

        it( "should return false for EUR", () => {
            expect( shouldDisplayCurrencyCode( "EUR" ) ).toBe( false );
        } );

        it( "should return true for USD", () => {
            expect( shouldDisplayCurrencyCode( "USD" ) ).toBe( true );
        } );

        it( "should return true for NOK", () => {
            expect( shouldDisplayCurrencyCode( "NOK" ) ).toBe( true );
        } );

        it( "should return true for DKK", () => {
            expect( shouldDisplayCurrencyCode( "DKK" ) ).toBe( true );
        } );
    } );

    describe( "formatPrice", () => {
        it( "should format USD correctly with code", () => {
            expect( formatPrice( 1000, "USD" ) ).toBe( "$1000 USD" );
        } );

        it( "should format EUR correctly without code", () => {
            expect( formatPrice( 1000, "EUR" ) ).toBe( "€1000" );
        } );

        it( "should format SEK correctly with code", () => {
            expect( formatPrice( 1000, "SEK" ) ).toBe( "kr 1000 SEK" );
        } );

        it( "should format GBP correctly without code", () => {
            expect( formatPrice( 1000, "GBP" ) ).toBe( "£1000" );
        } );

        it( "should format NOK correctly with code", () => {
            expect( formatPrice( 1000, "NOK" ) ).toBe( "kr 1000 NOK" );
        } );

        it( "should handle large numbers", () => {
            expect( formatPrice( 1000000, "SEK" ) ).toBe( "kr 1000000 SEK" );
        } );

        it( "should handle decimal values", () => {
            expect( formatPrice( 1000.50, "USD" ) ).toBe( "$1000.5 USD" );
        } );
    } );

    describe( "getCurrencyPrefix", () => {
        it( "should return $ for USD", () => {
            expect( getCurrencyPrefix( "USD" ) ).toBe( "$" );
        } );

        it( "should return € for EUR", () => {
            expect( getCurrencyPrefix( "EUR" ) ).toBe( "€" );
        } );

        it( "should return kr for SEK", () => {
            expect( getCurrencyPrefix( "SEK" ) ).toBe( "kr" );
        } );

        it( "should return £ for GBP", () => {
            expect( getCurrencyPrefix( "GBP" ) ).toBe( "£" );
        } );

        it( "should return kr for NOK", () => {
            expect( getCurrencyPrefix( "NOK" ) ).toBe( "kr" );
        } );
    } );

    describe( "getCurrencySuffix", () => {
        it( "should return ' USD' for USD", () => {
            expect( getCurrencySuffix( "USD" ) ).toBe( " USD" );
        } );

        it( "should return empty string for EUR", () => {
            expect( getCurrencySuffix( "EUR" ) ).toBe( "" );
        } );

        it( "should return ' SEK' for SEK", () => {
            expect( getCurrencySuffix( "SEK" ) ).toBe( " SEK" );
        } );

        it( "should return empty string for GBP", () => {
            expect( getCurrencySuffix( "GBP" ) ).toBe( "" );
        } );

        it( "should return ' NOK' for NOK", () => {
            expect( getCurrencySuffix( "NOK" ) ).toBe( " NOK" );
        } );
    } );
} );
