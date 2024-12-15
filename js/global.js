import { initializeNavbarBehavior } from "./routers/nav.js";


// Initialize the dropdown and navbar-toggler functionalities
document.addEventListener("DOMContentLoaded", () => {
    initializeNavbarBehavior();
});

document.addEventListener("DOMContentLoaded", () => {
    const dropdownLink = document.querySelector(".nav-item.dropdown > .nav-link");
  
    dropdownLink.addEventListener("click", (event) => {
      if (event.target.getAttribute("aria-expanded") === "true") {
        // If the dropdown is already open, navigate to the profile
        window.location.href = "./pages/profile.html";
      } else {
        // Otherwise, toggle the dropdown
        event.preventDefault();
        const dropdownMenu = dropdownLink.nextElementSibling;
        dropdownMenu.classList.toggle("show");
        dropdownLink.setAttribute(
          "aria-expanded",
          dropdownMenu.classList.contains("show")
        );
      }
    });
})