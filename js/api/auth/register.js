import { API_AUTH_REGISTER } from "../constants.js"

/**
 * Registers a new user by sending their details to the authentication API.
 * 
 * @async
 * @function register
 * @param {Object} userDetails - The user's registration details.
 * @param {string} userDetails.name - The name of the user.
 * @param {string} userDetails.email - The email address of the user.
 * @param {string} userDetails.password - The password of the user.
 * @param {string} [userDetails.bio] - A short biography of the user (optional).
 * @param {string} [userDetails.banner] - The URL of the user's banner image (optional).
 * @param {string} [userDetails.avatar] - The URL of the user's avatar image (optional).
 * @returns {Promise<Object>} A promise that resolves to the response object containing the registration result.
 * 
 * @throws {Error} Throws an error if the registration request fails.
 * 
 * @example
 * // Example usage:
 * register({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'securepassword',
 *   bio: 'Hi, i'm John Doe',
 *   banner: 'https://example.com/banner.jpg',
 *   avatar: 'https://example.com/avatar.jpg'
 * })
 * .then(result => {
 *   console.log('Registration successful:', result);
 * })
 * .catch(error => {
 *   console.error('Registration failed:', error);
 * });
 */
export async function register({
  name,
  email,
  password,
  bio,
  banner,
  avatar,
}) {

  const registerURL = API_AUTH_REGISTER;

  const response = await fetch(registerURL, {
    method: 'POST', // Specify the method
    headers: {
      'Content-Type': 'application/json', // Set the content type
    },
    body: JSON.stringify({
      name,
      email,
      password,
      bio, 
      banner,
      avatar,
    }),
  });

  const result = await response.json();
  
  if (response.ok) {
    alert("You have been registered.");
  } else {
    alert("Registration failed: " + result.message);
  }
  
  return result;
}