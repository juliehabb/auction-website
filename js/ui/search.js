import { authFetch } from "../ui/auth/authfetch.js";

/**
 * Searches for auction listings based on a query string.
 * The search results include bids and seller information.
 *
 * @async
 * @function searchListings
 * @param {string} query - The search term used to filter listings.
 * @returns {Promise<Object>} A promise that resolves to the search results object containing the listings.
 *
 * @throws {Error} Throws an error if the fetch request fails or returns a non-OK response.
 *
 * @example
 * // Search for listings with the term "art"
 * searchListings("art").then(results => console.log(results)).catch(error => console.error(error));
 */
export async function searchListings(query) {
    const url = `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(query)}&_bids=true&_seller=true`;
    const response = await authFetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch search results.");
    }

    return await response.json();
}



