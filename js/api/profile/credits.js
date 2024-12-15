import { authFetch } from "../../ui/auth/authfetch.js";

/**
 * Fetch the credits of a specific user.
 *
 * This function retrieves the credit balance of a specified user by sending a GET request
 * to the API. The response includes the user's credit data, which can be used for display
 * or further processing.
 *
 * @async
 * @function fetchUserCredits
 * @param {string} username - The username of the user whose credits are to be fetched.
 * @returns {Promise<Object>} A promise that resolves to the user's credit data.
 *
 * @throws {Error} Throws an error if the API request fails or returns a non-OK status.
 *
 * @example
 * try {
 *     const credits = await fetchUserCredits("john_doe");
 *     console.log("User Credits:", credits);
 * } catch (error) {
 *     console.error("Error fetching user credits:", error);
 * }
 */

export async function fetchUserCredits(username) {
    const url = `https://v2.api.noroff.dev/auction/profiles/${username}/credits`;

    try {
        const response = await authFetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch user credits. Status: ${response.status}`);
        }

        const creditsData = await response.json();
        console.log("Credits Data:", creditsData); 

        return creditsData; 
    } catch (error) {
        console.error("Error fetching user credits:", error);
        throw error; 
    }
}