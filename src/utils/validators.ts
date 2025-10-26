/**
 * Validation utilities for form fields
 */

/**
 * Validates an email address
 * @param email - Email address to validate
 * @returns true if valid, false otherwise
 */
export function isValidEmail ( email: string | number | null ): boolean {
    if ( !email || typeof email !== "string" || email.trim() === "" ) {
        return false;
    }

    // RFC 5322 compliant email regex (simplified version)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test( email.trim() );
}

/**
 * Validates a phone number
 * Accepts formats like: +46701234567, 0701234567, +1-555-123-4567, etc.
 * @param phone - Phone number to validate
 * @returns true if valid, false otherwise
 */
export function isValidPhoneNumber ( phone: string | number | null ): boolean {
    if ( !phone || typeof phone !== "string" || phone.trim() === "" ) {
        return false;
    }

    // Allow digits, spaces, hyphens, parentheses, and optional leading +
    // Must have at least 7 digits (minimum for most phone numbers)
    const phoneRegex = /^[+]?[\d\s\-()]+$/;
    const trimmedPhone = phone.trim();

    // Check if format matches
    if ( !phoneRegex.test( trimmedPhone ) ) {
        return false;
    }

    // Count digits (must have at least 7)
    const digitCount = trimmedPhone.replace( /\D/g, "" ).length;
    return digitCount >= 7 && digitCount <= 15;
}

/**
 * Validates that a value is a valid number
 * @param value - Value to validate
 * @returns true if valid number, false otherwise
 */
export function isValidNumber ( value: string | number | null ): boolean {
    if ( value === null || value === "" ) {
        return false;
    }

    const num = typeof value === "string" ? parseFloat( value ) : value;
    return !isNaN( num ) && isFinite( num );
}

/**
 * Validates that a string is not empty
 * @param value - String to validate
 * @returns true if not empty, false otherwise
 */
export function isNotEmpty ( value: string ): boolean {
    return value.trim() !== "";
}

/**
 * Validates that a required field has a value
 * @param value - Value to validate
 * @returns true if has value, false otherwise
 */
export function hasValue ( value: string | number | null ): boolean {
    if ( value === null ) {
        return false;
    }

    if ( typeof value === "string" ) {
        return value.trim() !== "";
    }

    return true;
}
