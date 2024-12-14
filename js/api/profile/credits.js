import { authFetch } from "../../ui/auth/authfetch.js";

export async function fetchUserCredits(username) {
    const url = `https://v2.api.noroff.dev/auction/profiles/${username}/credits`;

    try {
        const response = await authFetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch user credits. Status: ${response.status}`);
        }

        const creditsData = await response.json(); // Parse the JSON response
        console.log("Credits Data:", creditsData); // Log parsed data for debugging

        return creditsData; // Return the parsed JSON
    } catch (error) {
        console.error("Error fetching user credits:", error);
        throw error; // Re-throw the error for handling in the calling function
    }
}