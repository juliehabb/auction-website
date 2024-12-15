import { authFetch } from "../../ui/auth/authfetch.js";

/**
 * Place a bid on a specific listing.
 *
 * This function sends a POST request to the API to place a bid on a given listing.
 * It requires the listing ID and the bid amount as parameters. The bid amount
 * must be provided as a number, and the user must be authenticated (have a valid token).
 *
 * @async
 * @function placeBid
 * @param {string} listingId - The ID of the listing on which to place the bid.
 * @param {number} bidAmount - The amount to bid on the listing.
 * @returns {Promise<Object>} Resolves to the response JSON from the API if the bid is successful.
 *
 * @throws {Error} Throws an error if the bid request fails or if the response is not OK.
 *
 * @example
 * try {
 *     const bidResponse = await placeBid("12345", 100);
 *     console.log("Bid placed successfully:", bidResponse);
 * } catch (error) {
 *     console.error("Failed to place bid:", error);
 * }
 *
 * Features:
 * - Sends a POST request to the API endpoint for placing bids.
 * - Uses the `authFetch` utility for authenticated API requests.
 * - Includes error handling to throw meaningful errors if the request fails.
 * - Expects the bid amount to be a valid numeric value.
 */
export async function placeBid(listingId, bidAmount) {
    const url = `https://v2.api.noroff.dev/auction/listings/${listingId}/bids`;

    const response = await authFetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: bidAmount }),
    });

    if (!response.ok) {
        throw new Error("Failed to place bid");
    }

    return await response.json();
}

