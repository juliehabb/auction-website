import { authFetch } from "../../ui/auth/authfetch.js";

/**
 * Update the user's avatar.
 *
 * This function updates the avatar URL of the authenticated user's profile by sending
 * a PUT request to the API. The updated avatar URL is included in the payload along with
 * optional alt text for accessibility.
 *
 * @async
 * @function updateAvatar
 * @param {string} avatarUrl - The new URL of the user's avatar.
 * @returns {Promise<Object>} A promise that resolves to the updated profile data.
 *
 * @throws {Error} Throws an error if the username is not found in localStorage or if the request fails.
 *
 * @example
 * try {
 *     const updatedProfile = await updateAvatar("https://example.com/new-avatar.jpg");
 *     console.log("Profile updated successfully:", updatedProfile);
 * } catch (error) {
 *     console.error("Error updating avatar:", error);
 * }
 */

export async function updateAvatar(avatarUrl) {
    const profile = JSON.parse(localStorage.getItem("profile"));
    const username = profile?.data?.name;

    if (!username) {
        throw new Error("Username not found in local storage.");
    }

    const url = `https://v2.api.noroff.dev/auction/profiles/${username}`;

    // Construct the payload for the avatar update
    const payload = {
        avatar: {
            url: avatarUrl,
            alt: "User profile avatar"
        }
    };

    // Send the PUT request
    const response = await authFetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    // Handle potential errors
    if (!response.ok) {
        const errorDetails = await response.json();
        console.error("API Error Details:", errorDetails);
        throw new Error("Failed to update avatar.");
    }

    return await response.json(); // Return updated profile
}


