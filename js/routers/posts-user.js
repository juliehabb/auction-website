import { readListingsByUser } from "../api/listing/read.js";
import { fetchUserCredits } from "../api/profile/credits.js";
import { updateAvatar } from "../api/profile/avatar.js";
import { createAvatarUpdateModal } from "../ui/modals.js";
import { isAuthenticated } from "../api/auth/authUtils.js";

/**
 * Populate the table with the user's listings.
 *
 * This function fetches the listings of the authenticated user from the API and dynamically
 * populates the table in the DOM. Each listing includes columns for the image, title,
 * end date, highest bid, and action buttons for editing and deleting the listing.
 *
 * @async
 * @function populateListingsTable
 * @throws {Error} Throws an error if the API call or DOM manipulation fails.
 *
 * @example
 * try {
 *     await populateListingsTable();
 * } catch (error) {
 *     console.error("Failed to populate listings:", error);
 * }
 */
export async function populateListingsTable() {
    try {
        const listings = await readListingsByUser();
        const tableBody = document.querySelector(".table tbody");
        console.log(listings);

        if (!tableBody) {
            throw new Error ("Cannot find the table body element");
        }

        //Clear existing rows
        tableBody.innerHTML = "";

        listings.forEach((listing) => {
            const row = document.createElement("tr");

            //image cell
            const imageCell = document.createElement("td");
            const image = document.createElement("img");
            image.src = listing.media?.[0] || "/images/default-image.jpg"; //Use the first image or a default one
            image.width = 40;
            image.height = 40;
            image.alt = "Listing image";
            imageCell.appendChild(image);
            row.appendChild(imageCell);

            // Title cell
            const titleCell = document.createElement("td");
            titleCell.textContent = listing.title;
            row.appendChild(titleCell);

            // End date cell

            const endDateCell = document.createElement("td");
            endDateCell.textContent = new Date(listing.endsAt).toLocaleDateString();
            row.appendChild(endDateCell);

            // Highest bid cell
            const highestBidCell = document.createElement("td");
            highestBidCell.textContent = listing.highestBid
              ? `${listing.highestBid} USD`
              : "No bids yet";
            row.appendChild(highestBidCell);


            //Edit action cell
            const editCell = document.createElement("td");
            const editIcon = document.createElement("i");
            editIcon.classList.add("fa-regular", "fa-pen-to-square", "table-icon");
            editIcon.addEventListener("click", (event)  => {
                event.stopPropagation();
                window.location.href = `edit-listening.html?id${listing.id}`;

            });
            editCell.appendChild(editIcon);
            row.appendChild(editCell);

            // Delete action cell 
            const deleteCell = document.createElement("td");
            const deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fa-solid", "fa-xmark", "table-icon");
            deleteIcon.addEventListener("click", async (event) => {
                event.stopPropagation();
                try {
                    const confirmed = confirm(
                        `Are you sure you want to delete the listing "${listing.title}"?`
                    );
                    if (confirmed) {
                        await deleteListing(listing.id); //add delete function
                        row.remove();
                        alert(`Listing "${listing.title}" has been deleted.`);
                    }
                } catch (error) {
                    console.error("Failed to delete listing:", error);
                }
            });
            deleteCell.appendChild(deleteIcon);
            row.appendChild(deleteCell);

            //append row to table body
            tableBody.appendChild(row);
        });

    }catch (error) {
        console.error("Failed to populate listings table", error);
    }
}

/**
 * Display the user's available credits on the profile page.
 *
 * This function retrieves the user's profile from local storage, fetches their credit balance
 * from the API, and updates the relevant DOM element with the credits.
 *
 * @async
 * @function displayUserCredits
 * @throws {Error} Throws an error if the username is not found in local storage, if the API
 * response is invalid, or if the DOM element for displaying credits is missing.
 *
 * @example
 * try {
 *     await displayUserCredits();
 * } catch (error) {
 *     console.error("Error displaying user credits:", error);
 * }
 */

async function displayUserCredits() {
    try {
        // Retrieve the username from local storage
        const profile = JSON.parse(localStorage.getItem("profile"));
        const username = profile?.data?.name;

        if (!username) {
            throw new Error("Username not found in local storage.");
        }

        // Fetch user credits
        const creditsData = await fetchUserCredits(username);

        // Extract credits from the API response
        const credits = creditsData?.data?.credits;

        if (credits === undefined) {
            throw new Error("Credits not found in the API response.");
        }

        // Update the credit display in the DOM
        const creditElement = document.querySelector(".d-flex.align-items-center .text-decoration-underline");
        if (creditElement) {
            creditElement.textContent = `${credits}p`;
        } else {
            throw new Error("Credits element not found in the DOM.");
        }
    } catch (error) {
        console.error("Error displaying user credits:", error);
    }
}

/**
 * Initialize the avatar update feature.
 *
 * This function creates the avatar update modal, attaches event listeners to the avatar image,
 * and handles the avatar update form submission. It updates the avatar both on the server
 * and on the profile page upon successful submission.
 *
 * @function initializeAvatarUpdateFeature
 *
 * @example
 * initializeAvatarUpdateFeature();
 */

function initializeAvatarUpdateFeature() {
    createAvatarUpdateModal();

    const avatarImg = document.querySelector("#avatarImage");
    if (avatarImg) {
        avatarImg.addEventListener("click", () => {
            const avatarModal = new bootstrap.Modal(document.getElementById("avatarModal"));
            avatarModal.show();
        });
    }

    const avatarForm = document.getElementById("avatarUpdateForm");
    if (avatarForm) {
        avatarForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const avatarUrl = document.getElementById("avatarUrl").value.trim();

            if (!avatarUrl) {
                alert("Please enter a valid URL.");
                return;
            }

            try {
                const updatedProfile = await updateAvatar(avatarUrl);
                alert("Avatar updated successfully!");

                // Update the avatar image on the page
                if (avatarImg) avatarImg.src = updatedProfile.data.avatar.url;

                // Close the modal
                const avatarModal = bootstrap.Modal.getInstance(document.getElementById("avatarModal"));
                avatarModal.hide();
            } catch (error) {
                console.error("Error updating avatar:", error);
                alert("Failed to update avatar. Please try again.");
            }
        });
    }
}

/**
 * Update the profile page dynamically based on the user's authentication status.
 *
 * If the user is authenticated, the page will display the avatar update feature, user credits,
 * and their listings. If the user is not authenticated, a message is displayed prompting
 * the user to log in.
 *
 * @function updateProfilePage
 *
 * @example
 * updateProfilePage();
 */

export function updateProfilePage() {
    const mainElement = document.querySelector("main");

    if (!mainElement) {
        console.error("Main element not found.");
        return;
    }

    if (!isAuthenticated()) {
        mainElement.innerHTML = `
            <section class="container-md light-black-2 mb-5 mt-5 text-center">
                <p class="fs-4">You don't have a user yet. Please <a href="/login.html">log in</a> to view your profile.</p>
            </section>
        `;
    } else {
        initializeAvatarUpdateFeature();
        displayUserCredits();
        populateListingsTable();
    }
}

updateProfilePage();