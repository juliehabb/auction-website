import { login} from "../api/auth/login.js";

/**
 * Sets up an event listener for the login form submission.
 * When the form is submitted, it prevents the default action, gathers the
 * form data, and sends the data to the login API.
 * 
 * @function setloginFormListener
 * @returns {void}
 * 
 * @example
 * // Call this function to initialize the login form listener.
 * setloginFormListener();
 */

export function setloginFormListener () {
    const form = document.querySelector("form[name='login']");


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);// Create a FormData object from the submitted form.
    const profile = Object.fromEntries(formData.entries()); // Convert FormData to a plain object.

    //send to API
    login(profile);
})
}

setloginFormListener();