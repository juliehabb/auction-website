import { readListingsByUser } from "../api/listing/read.js";
import { fetchUserCredits } from "../api/profile/credits.js";



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

// Ensure the DOM is fully loaded before calling functions
document.addEventListener("DOMContentLoaded", () => {
    displayUserCredits(); // Call displayUserCredits when the DOM is ready
    populateListingsTable(); // Call populateListingsTable when the DOM is ready
});


