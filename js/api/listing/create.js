import { API_AUCTION_LISTINGS } from "../constants.js";
import { authFetch } from "../../ui/auth/authfetch.js";
import { API_AUTH_KEY } from "../constants.js";
import { save } from "../auth/key.js";


/**
 * Creates an API key by sending a POST request to the authentication API.
 * The retrieved API key is then saved to local storage.
 * 
 * @async
 * @function createKey
 * @returns {Promise<void>} A promise that resolves when the API key has been saved.
 * 
 * @example
 * // Example usage:
 * createKey().then(() => {
 *   console.log('API key created and saved.');
 * }).catch(error => {
 *   console.error('Error creating API key:', error);
 * });
 */
export async function createKey() {
    const createKeyURL = API_AUTH_KEY;
    
    const response = await authFetch(createKeyURL, {
        method: "POST", 
        body: JSON.stringify({}) // Send empty data if no data is needed
    });

    const apiKey = await response.json();

    save("apiKey", apiKey.data.key);
}

createKey();


/** 
 * Creates a new post using the social API.
 * 
 * @async
 * @function createPost
 * @param {Object} postDetails - The details of the post to be created.
 * @param {string} postDetails.title - The title of the post.
 * @param {string} postDetails.body - The body content of the post.
 * @param {Array<string>} postDetails.tags - An array of tags associated with the post.
 * @param {Array<string>} [postDetails.media] - An optional array of media URLs associated with the post.
 * @returns {Promise<Object>} A promise that resolves to the created post object.
 * 
 * @example
 * // Example usage:
 * createPost({
 *   title: 'My First Post',
 *   body: 'This is the body of my first post.',
 *   tags: ['introduction', 'firstPost'],
 *   media: ['https://example.com/image.jpg']
 * }).then(post => {
 *   console.log('Post created:', post);
 * }).catch(error => {
 *   console.error('Error creating post:', error);
 * });
 */
export async function createListing({ title, description, endsAt, tags, media }) {
    const createListingUrl = API_AUCTION_LISTINGS;
    
    const response = await authFetch (createListingUrl, {

        method: "post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            description,
            endsAt,
            tags,
            media
        }),
    });

    const listing =  await response.json();

    console.log(listing);

    return listing;
}