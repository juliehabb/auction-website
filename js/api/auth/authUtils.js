/**
 * Check if the user is authenticated.
 * @returns {boolean} True if the user is authenticated, false otherwise.
 */
export function isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token; // Return true if token exists, false otherwise
}

/**
 * Ensure the user is authenticated to access a page.
 * Redirects to login if not authenticated.
 */
export function requireAuthentication() {
    if (!isAuthenticated()) {
        alert("You must be logged in to access this feature.");
        window.location.href = "/login.html"; // Redirect to the login page
    }
}