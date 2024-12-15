import { load } from "../../api/auth/key.js";

/**
 * Constructs the headers for API requests, including authorization and content type.
 * 
 * @async
 * @function getHeaders
 * @returns {Promise<Object>} A promise that resolves to an object containing the headers.
 * 
 * @example
 * // Example usage:
 * getHeaders().then(headers => {
 *   console.log('API headers:', headers);
 * });
 */
export async function getHeaders() {
    const token = await load("token");
    const apiKey = await load("apiKey");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // Bearer token for authentication
        "X-Noroff-API-Key": apiKey
    };
}

/**
 * Performs a fetch request with authentication headers included.
 * 
 * @async
 * @function authFetch
 * @param {string} url - The URL to which the request is sent.
 * @param {Object} [options={}] - The options for the fetch request, such as method and body.
 * @param {Object} [options.headers={}] - Custom headers to be included in the request.
 * @returns {Promise<Response>} A promise that resolves to the Response object representing the response to the request.
 * 
 * @example
 * // Example usage:
 * authFetch('https://api.example.com/data', {
 *   method: 'GET'
 * })
 * .then(response => response.json())
 * .then(data => {
 *   console.log('Data:', data);
 * })
 * .catch(error => {
 *   console.error('Fetch error:', error);
 * });
 */
export async function authFetch(url, options = {}) {
    const headers = await getHeaders();

    return fetch(url, {
        ...options,
        headers: {
            ...headers,  // Merge with any additional headers
            ...(options.headers || {}), // Ensure custom headers are included if passed
        }
    });
}