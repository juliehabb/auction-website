import { authFetch } from "../ui/auth/authfetch.js";

export async function readListing(listingId) {
    const url = `https://v2.api.noroff.dev/auction/listings/${listingId}?_bids=true&_seller=true`;
    const response = await authFetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch listing details");
    }

    return await response.json();
}

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