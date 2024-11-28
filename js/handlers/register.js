import { register } from "../api/auth/register.js";

/**
 * Sets up an event listener for the registration form submission.
 * When the form is submitted, it prevents the default action, gathers the
 * form data, and sends the data to the registration API.
 * 
 * @function setRegisterFormListener
 * @returns {void}
 * 
 * @example
 * // Call this function to initialize the registration form listener.
 * setRegisterFormListener();
 */
export function setRegisterFormListener () {
    const form = document.querySelector("form[name='register']");


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const profile = Object.fromEntries(formData.entries());

    //send to API
    register(profile);
})
}

setRegisterFormListener();