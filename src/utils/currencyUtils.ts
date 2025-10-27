/**
 * Currency utility functions for formatting prices with proper currency symbols
 */

/**
 * Get the currency symbol for a given currency code
 * @param currency - Currency code (e.g., "USD", "EUR", "SEK")
 * @returns The currency symbol (e.g., "$", "€", "kr")
 */
export function getCurrencySymbol ( currency: string ): string {
    const currencyMap: Record<string, string> = {
        USD: "$",
        EUR: "€",
        GBP: "£",
        SEK: "kr",
        NOK: "kr",
        DKK: "kr",
        JPY: "¥",
        CNY: "¥",
        CHF: "Fr",
        AUD: "A$",
        CAD: "C$",
        NZD: "NZ$",
        INR: "₹",
        RUB: "₽",
        BRL: "R$",
        ZAR: "R",
        KRW: "₩",
        MXN: "$",
        SGD: "S$",
        HKD: "HK$",
        PLN: "zł",
        THB: "฿",
        TRY: "₺",
        IDR: "Rp",
        MYR: "RM",
        PHP: "₱",
        CZK: "Kč",
        HUF: "Ft",
        ILS: "₪",
        AED: "د.إ",
        SAR: "﷼",
    };

    return currencyMap[currency.toUpperCase()] || currency;
}

/**
 * Check if the currency should display the code after the value
 * Some currencies like EUR, GBP typically don't repeat the currency code
 * @param currency - Currency code (e.g., "USD", "EUR", "SEK")
 * @returns true if the currency code should be displayed after the value
 */
export function shouldDisplayCurrencyCode ( currency: string ): boolean {
    const currenciesWithoutCode = ["EUR", "GBP", "JPY", "CNY"];
    return !currenciesWithoutCode.includes( currency.toUpperCase() );
}

/**
 * Format a price with the appropriate currency symbol and code
 * @param value - The numeric price value
 * @param currency - Currency code (e.g., "USD", "EUR", "SEK")
 * @returns Formatted price string (e.g., "$1000 USD", "kr 1000 SEK", "€1000")
 */
export function formatPrice ( value: number, currency: string ): string {
    const symbol = getCurrencySymbol( currency );
    const displayCode = shouldDisplayCurrencyCode( currency );

    // For currencies that display symbol before the value (like USD, EUR)
    const symbolBeforeCurrencies = ["USD", "GBP", "EUR", "AUD", "CAD", "NZD", "SGD", "HKD"];
    const symbolBefore = symbolBeforeCurrencies.includes( currency.toUpperCase() );

    if ( symbolBefore ) {
        // Symbol before value: "$1000 USD" or "€1000"
        return displayCode ? `${symbol}${String( value )} ${currency}` : `${symbol}${String( value )}`;
    } else {
        // Symbol before value: "kr 1000 SEK" or "¥1000"
        return displayCode ? `${symbol} ${String( value )} ${currency}` : `${symbol}${String( value )}`;
    }
}

/**
 * Get just the currency symbol/prefix part for displaying before the value
 * @param currency - Currency code (e.g., "USD", "EUR", "SEK")
 * @returns Currency symbol to display before the value (e.g., "$", "€", "kr")
 */
export function getCurrencyPrefix ( currency: string ): string {
    const symbol = getCurrencySymbol( currency );
    return symbol;
}

/**
 * Get the currency suffix part for displaying after the value
 * @param currency - Currency code (e.g., "USD", "EUR", "SEK")
 * @returns Currency symbol/code to display after the value
 */
export function getCurrencySuffix ( currency: string ): string {
    const displayCode = shouldDisplayCurrencyCode( currency );

    // For currencies that display symbol before the value
    const symbolBeforeCurrencies = ["USD", "GBP", "EUR", "AUD", "CAD", "NZD", "SGD", "HKD"];
    const symbolBefore = symbolBeforeCurrencies.includes( currency.toUpperCase() );

    if ( symbolBefore ) {
        // Return just the code if it should be displayed: " USD"
        return displayCode ? ` ${currency}` : "";
    } else {
        // Return just the code: " SEK"
        return displayCode ? ` ${currency}` : "";
    }
}
