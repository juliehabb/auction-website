import { remove } from "../../api/auth/key.js";

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
    const logoutButton = document.querySelector(".logout-button")

    logoutButton.addEventListener("click", () => {
        remove("token")
        alert("You have been logged out");
        window.location.reload();
    });

    console.log(logoutButton);
}

onLogout();