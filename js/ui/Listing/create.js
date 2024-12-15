import { createListing } from "../../api/listing/create.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("new-listing-form");
    if (form) {
        form.addEventListener("submit", onCreateListing);
    }
});

/**
 * Handles the creation of a new blog post.
 *
 * This function is triggered on the submission of the post creation form.
 * It retrieves the form data, constructs a post object, and sends it to the 
 * API to create a new post. If the post creation is successful, it returns 
 * the created post object. In case of an error, it logs the error message 
 * to the console.
 *
 * @async
 * @function onCreatePost
 * @param {Event} event - The event object representing the form submission.
 * @returns {Promise<Object|null>} A promise that resolves to the created post object, or null if an error occurred.
 *
 * @example
 * // Assuming there is a form with the name "createPost"
 * document.querySelector('form[name="createPost"]').addEventListener('submit', onCreatePost);
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
