import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Rate query parameters for calculating moving costs
 */
export type RateQueryParams = {
    /** Distance of the move in kilometers (required) */
    distanceInKm: number;
    /** Living area size in square meters (required) */
    livingAreaInM2: number;
    /** Extra area such as attic or basement in square meters (optional, default: 0) */
    extraAreaInM2?: number;
    /** Number of pianos or other special heavy/bulky items (optional, default: 0) */
    numbersOfPianos?: number;
};

/**
 * Price response from the rate API
 */
export type PriceResponse = {
    /** Price value as an integer */
    value: number;
    /** Currency code (e.g., "SEK", "EUR", "USD") */
    currency: string;
};

/**
 * Rate API service using RTK Query
 * Calculates moving costs based on distance and volume
 */
export const rateAPI = createApi( {
    reducerPath: "rateAPI",
    baseQuery: fetchBaseQuery( {
        baseUrl: "https://moveitcaseapi.azurewebsites.net",
    } ),
    endpoints: builder => ( {
        /**
         * Get moving rate quote
         * @param params - Rate calculation parameters
         * @returns Price object with value and currency
         */
        getRate: builder.query<PriceResponse, RateQueryParams>( {
            query: params => ( {
                url: "/api/rate",
                params: {
                    distanceInKm: params.distanceInKm,
                    livingAreaInM2: params.livingAreaInM2,
                    extraAreaInM2: params.extraAreaInM2 ?? 0,
                    numbersOfPianos: params.numbersOfPianos ?? 0,
                },
            } ),
        } ),
    } ),
} );

// Export hooks for usage in components
export const { useGetRateQuery, useLazyGetRateQuery } = rateAPI;
