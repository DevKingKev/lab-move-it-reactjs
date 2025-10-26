/**
 * Calculates a deterministic distance between two addresses
 * The calculation is based on differences in street name, house number, postal code, and city
 * 
 * @param fromStreet - Source street address (e.g., "Wolfgatan 1")
 * @param fromPostalCode - Source postal code (e.g., "11021")
 * @param fromCity - Source city (e.g., "Stockholm")
 * @param toStreet - Destination street address (e.g., "Wolfgatan 2")
 * @param toPostalCode - Destination postal code (e.g., "11022")
 * @param toCity - Destination city (e.g., "Stockholm")
 * @returns Distance in kilometers (capped at 1000km)
 */
export function calculateDistance (
    fromStreet: string,
    fromPostalCode: string,
    fromCity: string,
    toStreet: string,
    toPostalCode: string,
    toCity: string
): number {
    // Normalize inputs (trim and lowercase for comparison)
    const fromStreetNorm = fromStreet.trim().toLowerCase();
    const toStreetNorm = toStreet.trim().toLowerCase();
    const fromCityNorm = fromCity.trim().toLowerCase();
    const toCityNorm = toCity.trim().toLowerCase();
    const fromPostalNorm = fromPostalCode.trim();
    const toPostalNorm = toPostalCode.trim();

    // If addresses are identical, distance is 0
    if (
        fromStreetNorm === toStreetNorm &&
        fromPostalNorm === toPostalNorm &&
        fromCityNorm === toCityNorm
    ) {
        return 0;
    }

    let distance = 0;

    // Extract street name and house number
    const fromStreetParts = parseStreetAddress( fromStreetNorm );
    const toStreetParts = parseStreetAddress( toStreetNorm );

    // Check if same city
    if ( fromCityNorm === toCityNorm ) {
        // Same city logic
        if ( fromPostalNorm === toPostalNorm ) {
            // Same postal code - check street name
            if ( fromStreetParts.name === toStreetParts.name ) {
                // Same street, different house numbers
                // Distance is 10 meters (0.01 km) per house number difference
                const houseNumDiff = Math.abs(
                    fromStreetParts.number - toStreetParts.number
                );
                distance = houseNumDiff * 0.01;
            } else {
                // Different streets in same postal code
                // Use hash-based deterministic calculation (max 2km)
                distance = calculateHashBasedDistance(
                    fromStreetNorm,
                    toStreetNorm,
                    fromPostalNorm,
                    2
                );
            }
        } else {
            // Different postal codes in same city
            distance = calculatePostalCodeDistance( fromPostalNorm, toPostalNorm );
        }
    } else {
        // Different cities
        // Use hash-based calculation for intercity distance
        const baseDistance = calculateHashBasedDistance(
            fromCityNorm,
            toCityNorm,
            fromPostalNorm + toPostalNorm,
            500
        );

        // Add postal code distance component
        const postalDistance = calculatePostalCodeDistance(
            fromPostalNorm,
            toPostalNorm
        );

        distance = baseDistance + postalDistance;
    }

    // Cap at 1000km
    return Math.min( distance, 1000 );
}

/**
 * Parses a full address string into components
 * Expected format: "Street Number, PostalCode, City"
 * Example: "Wolfgatan 1, 11021, Stockholm"
 */
export function parseFullAddress ( address: string ): {
    street: string;
    postalCode: string;
    city: string;
} {
    const parts = address.split( "," ).map( part => part.trim() );

    if ( parts.length >= 3 ) {
        return {
            street: parts[0],
            postalCode: parts[1],
            city: parts[2],
        };
    }

    // Fallback: try to handle partial addresses
    if ( parts.length === 2 ) {
        return {
            street: parts[0],
            postalCode: parts[1],
            city: "Unknown",
        };
    }

    // Single part or invalid format
    return {
        street: address,
        postalCode: "00000",
        city: "Unknown",
    };
}

/**
 * Calculates distance between two full address strings
 * @param fromAddress - Full address string (e.g., "Wolfgatan 1, 11021, Stockholm")
 * @param toAddress - Full address string (e.g., "Wolfgatan 2, 11021, Stockholm")
 * @returns Distance in kilometers
 */
export function calculateDistanceFromAddresses (
    fromAddress: string,
    toAddress: string
): number {
    const from = parseFullAddress( fromAddress );
    const to = parseFullAddress( toAddress );

    return calculateDistance(
        from.street,
        from.postalCode,
        from.city,
        to.street,
        to.postalCode,
        to.city
    );
}


/**
 * Parses a street address into name and number components
 */
function parseStreetAddress ( street: string ): { name: string; number: number; } {
    // Match patterns like "Wolfgatan 1" or "Main Street 42B"
    const regex = /^(.+?)\s+(\d+)/;
    const match = regex.exec( street );

    if ( match ) {
        return {
            name: match[1].trim(),
            number: parseInt( match[2], 10 ),
        };
    }

    // If no number found, use street name with default number
    return {
        name: street,
        number: 0,
    };
}

/**
 * Calculates distance based on postal code differences
 * - Last digit difference: 1km per digit
 * - Second-to-last digit difference: 10km per digit
 * - Earlier digits: progressively larger distances
 */
function calculatePostalCodeDistance (
    fromPostal: string,
    toPostal: string
): number {
    // Pad shorter postal codes with leading zeros for comparison
    const maxLength = Math.max( fromPostal.length, toPostal.length );
    const from = fromPostal.padStart( maxLength, "0" );
    const to = toPostal.padStart( maxLength, "0" );

    let distance = 0;

    // Iterate from right to left (least significant to most significant)
    for ( let i = 0; i < maxLength; i++ ) {
        const position = maxLength - 1 - i; // Position from the right
        const fromDigit = from[position];
        const toDigit = to[position];

        if ( fromDigit !== toDigit ) {
            // Calculate distance based on position
            // Position 0 (rightmost): 1km per difference
            // Position 1: 10km per difference
            // Position 2: 50km per difference
            // Position 3+: 100km per difference
            let multiplier: number;
            if ( i === 0 ) {
                multiplier = 1; // Last digit
            } else if ( i === 1 ) {
                multiplier = 10; // Second-to-last digit
            } else if ( i === 2 ) {
                multiplier = 50; // Third-to-last digit
            } else {
                multiplier = 100; // Earlier digits
            }

            // Add distance based on digit difference
            const digitDiff = Math.abs(
                parseInt( fromDigit, 10 ) - parseInt( toDigit, 10 )
            );
            distance += digitDiff * multiplier;
        }
    }

    return distance;
}

/**
 * Generates a deterministic hash-based distance between two strings
 * Uses simple string hashing to ensure same inputs always produce same output
 */
function calculateHashBasedDistance (
    str1: string,
    str2: string,
    salt: string,
    maxDistance: number
): number {
    // Create a deterministic hash from the two strings
    const combined = [str1, str2].sort().join( "|" ) + salt;
    let hash = 0;

    for ( let i = 0; i < combined.length; i++ ) {
        const char = combined.charCodeAt( i );
        hash = ( hash << 5 ) - hash + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    // Convert hash to a value between 0 and maxDistance
    const normalizedHash = Math.abs( hash ) / 2147483647; // Max 32-bit int value
    return normalizedHash * maxDistance;
}
