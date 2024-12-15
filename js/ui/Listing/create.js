import { createListing } from "../../api/listing/create.js";
import { isAuthenticated} from "../../api/auth/authUtils.js"

document.addEventListener("DOMContentLoaded", () => {
    // Restrict access to authenticated users
    if (!isAuthenticated()) {
        alert("You must be logged in to create a new listing.");
        window.location.href = "/login.html"; // Redirect to login page
        return;
    }

    const form = document.getElementById("new-listing-form");
    if (form) {
        form.addEventListener("submit", onCreateListing);
    }
});

/**
 * Handle the creation of a new listing.
 *
 * This function is triggered when the new listing form is submitted. It collects the form data,
 * validates the input, and sends the data to the API to create a new listing. If successful,
 * the page reloads to reflect the changes. If an error occurs, an alert is shown to the user.
 *
 * @async
 * @function onCreateListing
 * @param {Event} event - The event object triggered by the form submission.
 * @throws {Error} Logs an error if the API call fails or the input validation fails.
 *
 * @example
 * document.getElementById("new-listing-form").addEventListener("submit", onCreateListing);
 */

export async function onCreateListing(event) {
    event.preventDefault();

    //get form data
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const endsAt = `${form.endDate.value}T${form.endTime.value}`;
    const price = parseFloat(form.price.value);

    const tags = form.tags.value.split(",").map(tag => tag.trim());

    const mediaUrl = form.media.value;
   

    if (!title || !description || !endsAt || isNaN(price) || !mediaUrl ) {
        alert("Please fill out all required fields.");
        return;
    }


    try {
        const listing = await createListing({ title, description, endsAt, tags, mediaUrl});
        alert("Listing created successfully!");
        window.location.reload();
    } catch (error) {
        console.error("Error creating listing:", error)
        alert("Failed to create listing. Please try again.");
    }
}
