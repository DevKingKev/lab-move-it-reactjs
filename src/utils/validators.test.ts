import { describe, it, expect } from "vitest";
import {
    isValidEmail,
    isValidPhoneNumber,
    isValidNumber,
    isNotEmpty,
    hasValue,
} from "./validators";

describe( "validators", () => {
    describe( "isValidEmail", () => {
        it( "should accept valid email addresses", () => {
            expect( isValidEmail( "test@example.com" ) ).toBe( true );
            expect( isValidEmail( "user.name@domain.co.uk" ) ).toBe( true );
            expect( isValidEmail( "email+tag@test.com" ) ).toBe( true );
        } );

        it( "should reject invalid email addresses", () => {
            expect( isValidEmail( "invalid" ) ).toBe( false );
            expect( isValidEmail( "@example.com" ) ).toBe( false );
            expect( isValidEmail( "test@" ) ).toBe( false );
            expect( isValidEmail( "test @example.com" ) ).toBe( false );
            expect( isValidEmail( "" ) ).toBe( false );
            expect( isValidEmail( null ) ).toBe( false );
            expect( isValidEmail( 123 ) ).toBe( false );
        } );

        it( "should handle whitespace", () => {
            expect( isValidEmail( "  test@example.com  " ) ).toBe( true );
            expect( isValidEmail( "   " ) ).toBe( false );
        } );
    } );

    describe( "isValidPhoneNumber", () => {
        it( "should accept valid phone numbers", () => {
            expect( isValidPhoneNumber( "+46701234567" ) ).toBe( true );
            expect( isValidPhoneNumber( "0701234567" ) ).toBe( true );
            expect( isValidPhoneNumber( "+1-555-123-4567" ) ).toBe( true );
            expect( isValidPhoneNumber( "+1 (555) 123-4567" ) ).toBe( true );
            expect( isValidPhoneNumber( "555-1234" ) ).toBe( true );
        } );

        it( "should reject invalid phone numbers", () => {
            expect( isValidPhoneNumber( "123" ) ).toBe( false ); // Too short
            expect( isValidPhoneNumber( "abc123" ) ).toBe( false ); // Contains letters
            expect( isValidPhoneNumber( "" ) ).toBe( false );
            expect( isValidPhoneNumber( null ) ).toBe( false );
            expect( isValidPhoneNumber( 123 ) ).toBe( false );
            expect( isValidPhoneNumber( "12345678901234567" ) ).toBe( false ); // Too long
        } );

        it( "should handle whitespace and formatting", () => {
            expect( isValidPhoneNumber( "  +46 70 123 45 67  " ) ).toBe( true );
            expect( isValidPhoneNumber( "070-123 45 67" ) ).toBe( true );
        } );
    } );

    describe( "isValidNumber", () => {
        it( "should accept valid numbers", () => {
            expect( isValidNumber( 0 ) ).toBe( true );
            expect( isValidNumber( 42 ) ).toBe( true );
            expect( isValidNumber( -10 ) ).toBe( true );
            expect( isValidNumber( 3.14 ) ).toBe( true );
            expect( isValidNumber( "123" ) ).toBe( true );
            expect( isValidNumber( "3.14" ) ).toBe( true );
        } );

        it( "should reject invalid numbers", () => {
            expect( isValidNumber( null ) ).toBe( false );
            expect( isValidNumber( "" ) ).toBe( false );
            expect( isValidNumber( "abc" ) ).toBe( false );
            expect( isValidNumber( NaN ) ).toBe( false );
            expect( isValidNumber( Infinity ) ).toBe( false );
            expect( isValidNumber( -Infinity ) ).toBe( false );
        } );
    } );

    describe( "isNotEmpty", () => {
        it( "should return true for non-empty strings", () => {
            expect( isNotEmpty( "hello" ) ).toBe( true );
            expect( isNotEmpty( "  text  " ) ).toBe( true );
        } );

        it( "should return false for empty strings", () => {
            expect( isNotEmpty( "" ) ).toBe( false );
            expect( isNotEmpty( "   " ) ).toBe( false );
        } );
    } );

    describe( "hasValue", () => {
        it( "should return true for values", () => {
            expect( hasValue( "hello" ) ).toBe( true );
            expect( hasValue( 42 ) ).toBe( true );
            expect( hasValue( 0 ) ).toBe( true );
            expect( hasValue( "  text  " ) ).toBe( true );
        } );

        it( "should return false for null or empty", () => {
            expect( hasValue( null ) ).toBe( false );
            expect( hasValue( "" ) ).toBe( false );
            expect( hasValue( "   " ) ).toBe( false );
        } );
    } );
} );
