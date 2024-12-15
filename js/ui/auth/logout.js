import { remove } from "../../api/auth/key.js";
import { isAuthenticated } from "../../api/auth/authUtils.js";

/**
 * Initializes the logout functionality for the user.
 *
 * This function adds an event listener to the logout button, which, when clicked,
 * removes the user's token from local storage, alerts the user that they have been 
 * logged out, and then reloads the page to reflect the logout state.
 *
 * @function onLogout
 * @returns {void}
 *
 * @example
 * // Call this function to set up logout functionality.
 * onLogout();
 */
export function onLogout() {
    document.addEventListener("DOMContentLoaded", () => {
        const logoutButton = document.querySelector(".logout-button");

        if (!logoutButton) {
            console.error("Logout button not found.");
            return;
        }

        logoutButton.addEventListener("click", () => {
            remove("token"); // Remove the authentication token
            alert("You have been logged out");

            // Redirect to the login page
            window.location.href = "/index.html"; // Update this to your login form path
        });

        console.log("Logout button initialized:", logoutButton);
    });
}

/**
 * Dynamically replace "+ New Listing" button with a "Log In" button 
 * if the user is not authenticated.
 */
export function updateListingButton() {
    const newListingContainer = document.querySelector(".ml-3");

    if (!newListingContainer) {
        console.error("Container for the new listing button not found.");
        return;
    }

    // Clear the container to dynamically add the appropriate button
    newListingContainer.innerHTML = "";

    if (isAuthenticated()) {
        // Add "+ New Listing" button if the user is authenticated
        const newListingButton = document.createElement("button");
        newListingButton.type = "button";
        newListingButton.className = "btn btn-primary ml-3 new-listing";
        newListingButton.textContent = "+ New Listing";

        newListingButton.addEventListener("click", () => {
        
        });

        newListingContainer.appendChild(newListingButton);
    } else {
        // Add "Log In" button if the user is not authenticated
        const loginButton = document.createElement("button");
        loginButton.type = "button";
        loginButton.className = "btn btn-primary ml-3";
        loginButton.textContent = "Log In";

        loginButton.addEventListener("click", () => {
            window.location.href = "pages/login.html"; 
        });

        newListingContainer.appendChild(loginButton);
    }
}

updateListingButton()
onLogout();