
/**
 * Saves a value to localStorage with the specified key.
 * 
 * @function save
 * @param {string} key - The key under which the value will be stored.
 * @param {*} value - The value to be stored; it can be of any type.
 * 
 * @example
 * // Example usage:
 * save('user', { name: 'John Doe', age: 30 });
 */
export function save(key,value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Loads a value from localStorage using the specified key.
 * If the key does not exist or an error occurs, it returns null.
 * 
 * @async
 * @function load
 * @param {string} key - The key of the value to load from localStorage.
 * @returns {Promise<*>} A promise that resolves to the loaded value, or null if the value is not found or an error occurs.
 * 
 * @example
 * // Example usage:
 * load('user')
 *   .then(user => {
 *     console.log('Loaded user:', user);
 *   })
 *   .catch(error => {
 *     console.error('Error loading user:', error);
 *   });
 */
export async function load(key) {
    try {
        const value = localStorage.getItem(key);
        return JSON.parse(value);

    } catch {
        return null;
    }
}

/**
 * Removes a value from localStorage using the specified key.
 * 
 * @function remove
 * @param {string} key - The key of the value to be removed from localStorage.
 * 
 * @example
 * // Example usage:
 * remove('user');
 */
export function remove(key) {
    localStorage.removeItem(key);
}