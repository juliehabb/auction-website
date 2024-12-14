import { authFetch } from "../../ui/auth/authfetch.js";

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

