import { API_AUCTION_LISTINGS } from "../constants.js";
import { API_AUCTION_PROFILES} from "../constants.js";
import { authFetch } from "../../ui/auth/authfetch.js"

/**
 * Fetch a single auction listing with additional details.
 *
 * This function retrieves detailed information about a specific listing,
 * including its seller and bid history.
 *
 * @async
 * @function readListing
 * @param {string} id - The ID of the listing to fetch.
 * @returns {Promise<Object>} A promise that resolves to the listing details.
 *
 * @throws {Error} Throws an error if the listing ID is not provided or the request fails.
 *
 * @example
 * try {
 *     const listing = await readListing("12345");
 *     console.log("Listing Details:", listing);
 * } catch (error) {
 *     console.error("Error fetching listing:", error);
 * }
 */
export async function readListing(id) {
    const getListingUrl = `${API_AUCTION_LISTINGS}/${id}?_seller=true&_bids=true`;

    if (!id) {
        throw new Error("Listing ID is required.");
    }

    try {
        const response = await authFetch(getListingUrl, { method: "GET" });
        if (!response.ok) {
            console.error("Error fetching listing:", response.status, response.statusText);
            throw new Error("Failed to fetch listing");
        }

        const data = await response.json();
        console.log("Listing with seller and bids:", data); // Log full response
        return data;
    } catch (error) {
        console.error("Error fetching listing:", error);
        throw error;
    }
}


/**
 * Fetch a paginated list of auction listings.
 *
 * This function retrieves a list of auction listings, optionally paginated
 * and filtered by tags.
 *
 * @async
 * @function readListings
 * @param {number} [limit=12] - The number of listings to retrieve per page.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {string} [tag] - Optional tag filter to narrow the results.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of listings.
 *
 * @throws {Error} Throws an error if the request fails.
 *
 * @example
 * try {
 *     const listings = await readListings(10, 2, "Art");
 *     console.log("Listings:", listings);
 * } catch (error) {
 *     console.error("Error fetching listings:", error);
 * }
 */

export async function readListings(limit = 12, page = 1, tag) {
    const getListingsUrl = API_AUCTION_LISTINGS;

    const response = await authFetch(getListingsUrl);

    const listings = await response.json();

    console.log(listings)

    return listings.data

    
}



/**
 * Fetch a list of auction listings created by a specific user.
 *
 * This function retrieves listings associated with the authenticated user
 * or a specified username. It supports pagination and filtering.
 *
 * @async
 * @function readListingsByUser
 * @param {string} [username] - The username whose listings are to be fetched. If not provided, the function retrieves the username from localStorage.
 * @param {number} [limit=12] - The number of listings to retrieve per page.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {string} [tag] - Optional tag filter to narrow the results.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of listings by the user.
 *
 * @throws {Error} Throws an error if the username is not provided or the request fails.
 *
 * @example
 * try {
 *     const userListings = await readListingsByUser("username");
 *     console.log("User Listings:", userListings);
 * } catch (error) {
 *     console.error("Error fetching user listings:", error);
 * }
 */

export async function readListingsByUser(username, limit = 12, page = 1, tag) {
    // If username is not provided, retrieve it from localStorage
    const profile = JSON.parse(localStorage.getItem("profile"));
    username = profile?.data?.name; 

    // Check if username exists
    if (!username) {
        throw new Error("Username not found in localStorage");
    }
    const getListingsUrl = `${API_AUCTION_PROFILES}/${username}/listings?limit=${limit}&page=${page}`;
    console.log("Fetching URL:", getListingsUrl);

    const response = await authFetch(getListingsUrl);

    const listings = await response.json();
    console.log("Raw API Response:", listings);

    return listings.data;
}

export async function searchListings(query) {
    const url = `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(
        query
    )}&_bids=true&_seller=true`;

    const response = await authFetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch search results.");
    }

    return await response.json();
}