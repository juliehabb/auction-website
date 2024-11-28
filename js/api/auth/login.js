import { API_AUTH_LOGIN, API_KEY} from "../constants.js"
import * as storage from "../auth/key.js"


/**
 * Logs in a user by sending their email and password to the authentication API.
 * 
 * @async
 * @function login
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The email address of the user.
 * @param {string} credentials.password - The password of the user.
 * @returns {Promise<Object>} A promise that resolves to the response object containing the login result.
 * 
 * @throws {Error} Throws an error if the login request fails.
 * 
 * @example
 * // Example usage:
 * login({ email: 'user@example.com', password: 'password123' })
 *   .then(result => {
 *     console.log('Login successful:', result);
 *   })
 *   .catch(error => {
 *     console.error('Login failed:', error);
 *   });
 */

export async function login({
  email,
  password,
}) {

  const loginURL = API_AUTH_LOGIN;

  const response = await fetch(loginURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await response.json();

  if(response.ok) {
    storage.save("token", result.data.accessToken);
    storage.save("profile", result);

    storage.save("apiKey", API_KEY);

    alert("You have been logged in.")
  } else {
    alert("login failed: " + result.message);
  }
  
  return result;
}