import { authFetch } from "../ui/auth/authfetch.js";

export async function searchListings(query) {
    const url = `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(query)}&_bids=true&_seller=true`;
    const response = await authFetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch search results.");
    }

    return await response.json();
}



