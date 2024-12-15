import { authFetch } from "../ui/auth/authfetch.js";

/**
 * Fetch details of a specific listing.
 *
 * This function retrieves the details of a listing, including its bids and seller information,
 * by sending a GET request to the API. It returns the listing data in JSON format.
 *
 * @async
 * @function readListing
 * @param {string} listingId - The unique identifier of the listing to fetch.
 * @returns {Promise<Object>} A promise that resolves to the listing details.
 *
 * @throws {Error} Throws an error if the API request fails or returns a non-OK status.
 *
 * @example
 * try {
 *     const listing = await readListing("1234");
 *     console.log("Listing Details:", listing);
 * } catch (error) {
 *     console.error("Error fetching listing details:", error);
 * }
 */

export async function readListing(listingId) {
    const url = `https://v2.api.noroff.dev/auction/listings/${listingId}?_bids=true&_seller=true`;
    const response = await authFetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch listing details");
    }

    return await response.json();
}

/**
 * Place a bid on a specific listing.
 *
 * This function sends a POST request to the API to place a bid on a listing. The bid amount
 * is sent as part of the request payload. If the request is successful, the API returns
 * the updated listing or bid data.
 *
 * @async
 * @function placeBid
 * @param {string} listingId - The unique identifier of the listing to place a bid on.
 * @param {number} bidAmount - The amount to bid on the listing.
 * @returns {Promise<Object>} A promise that resolves to the updated listing or bid data.
 *
 * @throws {Error} Throws an error if the API request fails or returns a non-OK status.
 *
 * @example
 * try {
 *     const updatedListing = await placeBid("1234", 50);
 *     console.log("Bid placed successfully:", updatedListing);
 * } catch (error) {
 *     console.error("Error placing bid:", error);
 * }
 */

export async function placeBid(listingId, bidAmount) {
    const url = `https://v2.api.noroff.dev/auction/listings/${listingId}/bids`;

    const response = await authFetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: bidAmount }), // Ensure the payload is correct
    });

    if (!response.ok) {
        const errorDetails = await response.text(); // Fetch additional error details if provided
        console.error("Error details:", errorDetails); // Log the response for debugging
        throw new Error("Failed to place bid");
    }

    return await response.json();
}