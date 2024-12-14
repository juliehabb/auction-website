import { authFetch } from "../../ui/auth/authfetch.js";

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


