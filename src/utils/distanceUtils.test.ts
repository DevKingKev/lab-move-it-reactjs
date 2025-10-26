import { describe, it, expect } from "vitest";
import {
    calculateDistance,
    calculateDistanceFromAddresses,
    parseFullAddress,
} from "./distanceUtils";

describe( "distanceUtils", () => {
    describe( "parseFullAddress", () => {
        it( "should parse a complete address", () => {
            const result = parseFullAddress( "Wolfgatan 1, 11021, Stockholm" );
            expect( result ).toEqual( {
                street: "Wolfgatan 1",
                postalCode: "11021",
                city: "Stockholm",
            } );
        } );

        it( "should handle addresses with extra spaces", () => {
            const result = parseFullAddress( "  Wolfgatan 1  ,  11021  ,  Stockholm  " );
            expect( result ).toEqual( {
                street: "Wolfgatan 1",
                postalCode: "11021",
                city: "Stockholm",
            } );
        } );

        it( "should handle partial addresses", () => {
            const result = parseFullAddress( "Wolfgatan 1, 11021" );
            expect( result ).toEqual( {
                street: "Wolfgatan 1",
                postalCode: "11021",
                city: "Unknown",
            } );
        } );
    } );

    describe( "calculateDistance", () => {
        it( "should return 0 for identical addresses", () => {
            const distance = calculateDistance(
                "Wolfgatan 1",
                "11021",
                "Stockholm",
                "Wolfgatan 1",
                "11021",
                "Stockholm"
            );
            expect( distance ).toBe( 0 );
        } );

        it( "should calculate 0.01km per house number difference on same street", () => {
            const distance = calculateDistance(
                "Wolfgatan 1",
                "11021",
                "Stockholm",
                "Wolfgatan 2",
                "11021",
                "Stockholm"
            );
            expect( distance ).toBe( 0.01 );
        } );

        it( "should calculate 0.1km for 10 house numbers difference", () => {
            const distance = calculateDistance(
                "Wolfgatan 1",
                "11021",
                "Stockholm",
                "Wolfgatan 11",
                "11021",
                "Stockholm"
            );
            expect( distance ).toBe( 0.1 );
        } );

        it( "should calculate 1km per last digit change in postal code", () => {
            const distance = calculateDistance(
                "Wolfgatan 1",
                "11021",
                "Stockholm",
                "Wolfgatan 1",
                "11022",
                "Stockholm"
            );
            expect( distance ).toBe( 1 );
        } );

        it( "should calculate 10km per second-to-last digit change", () => {
            const distance = calculateDistance(
                "Wolfgatan 1",
                "11021",
                "Stockholm",
                "Wolfgatan 1",
                "11031",
                "Stockholm"
            );
            expect( distance ).toBe( 10 );
        } );

        it( "should be deterministic - same inputs produce same output", () => {
            const distance1 = calculateDistance(
                "Main Street 5",
                "12345",
                "City A",
                "Oak Avenue 10",
                "54321",
                "City B"
            );
            const distance2 = calculateDistance(
                "Main Street 5",
                "12345",
                "City A",
                "Oak Avenue 10",
                "54321",
                "City B"
            );
            expect( distance1 ).toBe( distance2 );
        } );

        it( "should cap distance at 1000km", () => {
            const distance = calculateDistance(
                "Street A",
                "00000",
                "City A",
                "Street B",
                "99999",
                "City B"
            );
            expect( distance ).toBeLessThanOrEqual( 1000 );
        } );

        it( "should return different distances for different streets in same postal code", () => {
            const distance1 = calculateDistance(
                "Wolfgatan 1",
                "11021",
                "Stockholm",
                "Birger Jarlsgatan 1",
                "11021",
                "Stockholm"
            );
            const distance2 = calculateDistance(
                "Wolfgatan 1",
                "11021",
                "Stockholm",
                "Drottninggatan 1",
                "11021",
                "Stockholm"
            );
            // Different streets should have different distances
            expect( distance1 ).not.toBe( distance2 );
            // But both should be within the 2km limit for same postal code
            expect( distance1 ).toBeLessThanOrEqual( 2 );
            expect( distance2 ).toBeLessThanOrEqual( 2 );
        } );
    } );

    describe( "calculateDistanceFromAddresses", () => {
        it( "should parse and calculate distance between full address strings", () => {
            const distance = calculateDistanceFromAddresses(
                "Wolfgatan 1, 11021, Stockholm",
                "Wolfgatan 2, 11021, Stockholm"
            );
            expect( distance ).toBe( 0.01 );
        } );

        it( "should handle postal code changes", () => {
            const distance = calculateDistanceFromAddresses(
                "Wolfgatan 1, 11021, Stockholm",
                "Wolfgatan 1, 11022, Stockholm"
            );
            expect( distance ).toBe( 1 );
        } );

        it( "should be deterministic", () => {
            const address1 = "Main Street 5, 12345, City A";
            const address2 = "Oak Avenue 10, 54321, City B";

            const distance1 = calculateDistanceFromAddresses( address1, address2 );
            const distance2 = calculateDistanceFromAddresses( address1, address2 );

            expect( distance1 ).toBe( distance2 );
        } );
    } );
} );
