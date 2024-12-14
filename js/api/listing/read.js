import { API_AUCTION_LISTINGS } from "../constants.js";
import { API_AUCTION_PROFILES} from "../constants.js";
import { authFetch } from "../../ui/auth/authfetch.js"

/**
 * Retrieves a singular post from the API using the specified post ID.
 * 
 * @async
 * @function readPost
 * @param {string} id - The ID of the post to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the post object.
 * 
 * @throws {Error} Throws an error if the post ID is not provided.
 * 
 * @example
 * // Example usage:
 * readPost('12345')
 *   .then(post => {
 *     console.log('Post details:', post);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching post:', error);
 *   });
 */
export async function readListing(id) {
    const getListingUrl = `${API_AUCTION_LISTINGS}/${id}?_seller=true&_bids=true`;

    if (!id) {
        throw new Error("Listing ID is required.");
    }

    try {
        const response = await authFetch(getListingUrl, { method: "GET" });
        if (!response.ok) {
            console.error("Error fetching listing:", response.status, response.statusText);
            throw new Error("Failed to fetch listing");
        }

        const data = await response.json();
        console.log("Listing with seller and bids:", data); // Log full response
        return data;
    } catch (error) {
        console.error("Error fetching listing:", error);
        throw error;
    }
}


/**
 * Retrieves all posts from the API with optional pagination.
 * 
 * @async
 * @function readPosts
 * @param {number} [limit=12] - The maximum number of posts to retrieve.
 * @param {number} [page=1] - The page number for pagination.
 * @param {string} [tag] - An optional tag to filter the posts.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of post objects.
 * 
 * @example
 * // Example usage:
 * readPosts(10, 2)
 *   .then(posts => {
 *     console.log('Posts:', posts);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching posts:', error);
 *   });
 */
export async function readListings(limit = 12, page = 1, tag) {
    const getListingsUrl = API_AUCTION_LISTINGS;

    const response = await authFetch(getListingsUrl);

    const listings = await response.json();

    console.log(listings)

    return listings.data

    
}



/**
 * Retrieves posts created by a specific user from the API.
 * If the username is not provided, it retrieves it from localStorage.
 * 
 * @async
 * @function readPostsByUser
 * @param {string} [username] - The username of the user whose posts are to be retrieved.
 * @param {number} [limit=12] - The maximum number of posts to retrieve.
 * @param {number} [page=1] - The page number for pagination.
 * @param {string} [tag] - An optional tag to filter the posts.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of post objects created by the specified user.
 * 
 * @throws {Error} Throws an error if the username is not found in localStorage.
 * 
 * @example
 * // Example usage:
 * readPostsByUser('john_doe')
 *   .then(posts => {
 *     console.log('User posts:', posts);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching user posts:', error);
 *   });
 */
export async function readListingsByUser(username, limit = 12, page = 1, tag) {
    // If username is not provided, retrieve it from localStorage
    const profile = JSON.parse(localStorage.getItem("profile"));
    username = profile?.data?.name; 

    // Check if username exists
    if (!username) {
        throw new Error("Username not found in localStorage");
    }
    const getListingsUrl = `${API_AUCTION_PROFILES}/${username}/listings?limit=${limit}&page=${page}`;
    console.log("Fetching URL:", getListingsUrl);

    const response = await authFetch(getListingsUrl);

    const listings = await response.json();
    console.log("Raw API Response:", listings);

    return listings.data;
}

export async function searchListings(query) {
    const url = `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(
        query
    )}&_bids=true&_seller=true`;

    const response = await authFetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch search results.");
    }

    return await response.json();
}