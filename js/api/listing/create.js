import { API_AUCTION_LISTINGS } from "../constants.js";
import { authFetch } from "../../ui/auth/authfetch.js";
import { API_AUTH_KEY } from "../constants.js";
import { save } from "../auth/key.js";


/**
 * Creates an API key by sending a POST request to the authentication API.
 * The retrieved API key is then saved to local storage.
 * 
 * @async
 * @function createKey
 * @returns {Promise<void>} A promise that resolves when the API key has been saved.
 * 
 * @example
 * // Example usage:
 * createKey().then(() => {
 *   console.log('API key created and saved.');
 * }).catch(error => {
 *   console.error('Error creating API key:', error);
 * });
 */
export async function createKey() {
    const createKeyURL = API_AUTH_KEY;
    
    const response = await authFetch(createKeyURL, {
        method: "POST", 
        body: JSON.stringify({}) // Send empty data if no data is needed
    });

    const apiKey = await response.json();

    save("apiKey", apiKey.data.key);
}

createKey();


/**
 * Create a new auction listing.
 *
 * This function sends a POST request to the API to create a new auction listing. 
 * It requires the listing details, including the title, description, end date, tags, 
 * and media (optional). The user must be authenticated to create a listing.
 *
 * @async
 * @function createListing
 * @param {Object} listingDetails - The details of the new listing.
 * @param {string} listingDetails.title - The title of the listing.
 * @param {string} listingDetails.description - A detailed description of the listing.
 * @param {string} listingDetails.endsAt - The end date and time of the auction (ISO format).
 * @param {Array<string>} [listingDetails.tags=[]] - Tags for the listing (optional).
 * @param {Array<string>} [listingDetails.media=[]] - Array of media URLs for the listing (optional).
 * @returns {Promise<Object>} Resolves to the newly created listing object if successful.
 *
 * @throws {Error} Throws an error if the listing creation request fails or the response is not OK.
 *
 * @example
 * try {
 *     const newListing = await createListing({
 *         title: "Vintage Painting",
 *         description: "A beautiful vintage painting from the 18th century.",
 *         endsAt: "2024-12-25T12:00:00Z",
 *         tags: ["Art", "Vintage"],
 *         media: ["https://example.com/image.jpg"],
 *     });
 *     console.log("Listing created successfully:", newListing);
 * } catch (error) {
 *     console.error("Failed to create listing:", error);
 * }
 *
 * Features:
 * - Sends a POST request to the API endpoint for creating listings.
 * - Uses `authFetch` to ensure the user is authenticated.
 * - Validates and serializes the listing data before sending the request.
 * - Handles server response and logs the created listing.
 */
export async function createListing({ title, description, endsAt, tags, media }) {
    const createListingUrl = API_AUCTION_LISTINGS;
    
    const response = await authFetch (createListingUrl, {

        method: "post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            description,
            endsAt,
            tags,
            media
        }),
    });

    const listing =  await response.json();

    console.log(listing);

    return listing;
}