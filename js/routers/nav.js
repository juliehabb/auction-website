/**
 * Toggles a dropdown menu programmatically.
 * @param {string} dropdownSelector - The CSS selector for the dropdown toggle link.
 */
export function setupDropdownBehavior(dropdownSelector) {
    const dropdownLink = document.querySelector(dropdownSelector);

    if (!dropdownLink) {
        console.error("Dropdown link not found.");
        return;
    }

    dropdownLink.addEventListener("click", (event) => {
        const dropdownMenu = dropdownLink.nextElementSibling;

        if (!dropdownMenu || !dropdownMenu.classList.contains("dropdown-menu")) {
            console.error("Dropdown menu not found.");
            return;
        }

        const isExpanded = dropdownLink.getAttribute("aria-expanded") === "true";

        if (isExpanded) {
            // Navigate to profile if dropdown is already open
            window.location.href = "./pages/profile.html";
        } else {
            // Toggle dropdown menu
            event.preventDefault();
            dropdownMenu.classList.toggle("show");
            dropdownLink.setAttribute(
                "aria-expanded",
                dropdownMenu.classList.contains("show")
            );
        }
    });
}

/**
 * Toggles a responsive navbar menu programmatically.
 * @param {string} togglerSelector - The CSS selector for the navbar-toggler button.
 * @param {string} menuSelector - The CSS selector for the navbar menu.
 */
export function setupNavbarBehavior(togglerSelector, menuSelector) {
    const navbarToggler = document.querySelector(togglerSelector);
    const navbarMenu = document.querySelector(menuSelector);

    if (!navbarToggler || !navbarMenu) {
        console.error("Navbar toggler or menu not found.");
        return;
    }

    // Create an overlay for mobile menu
    let menuOverlay = document.getElementById("menuOverlay");
    if (!menuOverlay) {
        menuOverlay = document.createElement("div");
        menuOverlay.id = "menuOverlay";
        menuOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1040;
            display: none;
        `;
        document.body.appendChild(menuOverlay);
    }

    navbarToggler.addEventListener("click", () => {
        const isExpanded = navbarToggler.getAttribute("aria-expanded") === "true";

        if (isExpanded) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close the mobile menu when overlay is clicked
    menuOverlay.addEventListener("click", closeMobileMenu);

    // Function to open the mobile menu
    function openMobileMenu() {
        navbarMenu.classList.add("show");
        navbarToggler.setAttribute("aria-expanded", "true");
        menuOverlay.style.display = "block";
        document.body.classList.add("modal-open"); // Prevent scrolling in the background
    }

    // Function to close the mobile menu
    function closeMobileMenu() {
        navbarMenu.classList.remove("show");
        navbarToggler.setAttribute("aria-expanded", "false");
        menuOverlay.style.display = "none";
        document.body.classList.remove("modal-open"); // Restore background scrolling
    }
}

/**
 * Initializes the navbar and dropdown functionalities.
 */
export function initializeNavbar() {
    setupDropdownBehavior(".nav-item.dropdown > .nav-link");
    setupNavbarBehavior(".navbar-toggler", ".navbar-collapse");
}

