import { readListing, placeBid } from "../api/listing.js";
import { createBidModal, showBidModal } from "../ui/modals.js";
import { isAuthenticated, requireAuthentication } from "../api/auth/authUtils.js";

/**
 * Fetch and display listing details on the listing details page.
 *
 * This function retrieves a specific listing based on its ID from the URL query parameters
 * and dynamically populates the page with the listing's data. It handles various aspects
 * such as displaying the primary image, seller information, bid history, and managing
 * the "Place Bid" button based on the user's authentication state or if the listing has ended.
 *
 * @async
 * @function fetchAndDisplayListing
 *
 * @example
 * // Automatically invoked on page load
 * fetchAndDisplayListing();
 *
 * Features:
 * - Fetches the listing using its ID from the URL.
 * - Disables the "Place Bid" button if the auction has ended.
 * - Updates the primary image and alt text for the listing.
 * - Displays the seller's name, description, and time left.
 * - Populates the bid history table with the list of bids.
 * - Enables or disables the "Place Bid" button based on the user's authentication status.
 *
 * @throws Logs an error and displays an error message in the DOM if fetching or displaying the listing fails.
 */
async function fetchAndDisplayListing() {
    const params = new URLSearchParams(window.location.search);
    const listingId = params.get("id");

    if (!listingId) {
        console.error("Listing ID not found in the URL.");
        document.body.innerHTML = "<p>Listing not found.</p>";
        return;
    }

    try {
        const response = await readListing(listingId); // Fetch the listing
        const listing = response.data;

        console.log("Fetched Listing:", listing);

        // Check if the auction has ended
        const now = new Date();
        const endsAt = new Date(listing.endsAt);
        const placeBidButton = document.querySelector(".btn-primary.ms-2");

        if (endsAt < now) {
            alert("This listing has already ended. You cannot place a bid.");
            if (placeBidButton) placeBidButton.disabled = true; // Disable "Place Bid" button
        }

        // Update the main image and thumbnails
        const media = listing.media || [];
        const mainImageElement = document.querySelector(".main-image");
        const thumbnailsContainer = document.querySelector(".thumbnails-container");

        // Populate main image
        if (media.length > 0) {
            mainImageElement.src = media[0].url;
            mainImageElement.alt = media[0].alt || "Listing image";
        } else {
            mainImageElement.src = "/images/default-image.jpg";
            mainImageElement.alt = "Default image";
        }

        // Populate thumbnails dynamically
        thumbnailsContainer.innerHTML = ""; // Clear existing thumbnails
        media.forEach((image, index) => {
            const thumbnail = document.createElement("img");
            thumbnail.src = image.url;
            thumbnail.alt = image.alt || `Thumbnail ${index + 1}`;
            thumbnail.className = "thumbnail";
            thumbnail.width = 90;

            // Highlight the first thumbnail by default
            if (index === 0) {
                thumbnail.classList.add("active-thumbnail");
            }

            // Add click event to update the main image
            thumbnail.addEventListener("click", () => {
                mainImageElement.src = image.url;
                mainImageElement.alt = image.alt || "Listing image";

                // Update active thumbnail
                document
                    .querySelectorAll(".thumbnail")
                    .forEach((thumb) => thumb.classList.remove("active-thumbnail"));
                thumbnail.classList.add("active-thumbnail");
            });

            thumbnailsContainer.appendChild(thumbnail);
        });

        // Replace seller's name dynamically
        const sellerNameElement = document.querySelector(".more-info .d-flex a p");
        sellerNameElement.textContent = listing.seller?.name || "Unknown Seller";

        // Populate other elements
        document.querySelector(".heading h1").textContent = listing.title;
        document.querySelector(".heading p").textContent = `Time left: ${
            listing.endsAt ? new Date(listing.endsAt).toLocaleString() : "No end date"
        }`;
        document.querySelector(".paragraph p").textContent =
            listing.description || "No description provided.";

        // Populate bid history
        const bidHistoryTable = document.querySelector(".big-history tbody");
        bidHistoryTable.innerHTML = ""; // Clear existing rows

        if (listing.bids && listing.bids.length > 0) {
            listing.bids.forEach((bid) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${bid.amount} USD</td>
                    <td>${bid.bidder?.name || "Anonymous"}</td>
                    <td>${new Date(bid.created).toLocaleString()}</td>
                `;
                bidHistoryTable.appendChild(row);
            });
        } else {
            bidHistoryTable.innerHTML =
                "<tr><td colspan='3'>No bids available.</td></tr>";
        }

        // Handle "Place Bid" button logic
        if (placeBidButton) {
            if (isAuthenticated()) {
                placeBidButton.addEventListener("click", () => {
                    const bidAmount = document.querySelector(".bid-amount").value;
                    showBidModal(bidAmount);
                });
            } else {
                placeBidButton.disabled = true;
                placeBidButton.addEventListener("click", () => {
                    alert("You must be logged in to place a bid.");
                    window.location.href = "/login.html"; // Redirect to login page
                });
            }
        }
    } catch (error) {
        console.error("Error fetching listing:", error);
        document.body.innerHTML = "<p>Failed to load listing details.</p>";
    }
}

// Handle bid submission from the modal
document.addEventListener("click", (event) => {
    if (event.target.id === "submitBid") {
        requireAuthentication(); // Ensure the user is logged in before submitting a bid

        const bidAmount = parseFloat(document.getElementById("bidInput").value);
        const listingId = new URLSearchParams(window.location.search).get("id");

        if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
            alert("Please enter a valid bid amount greater than 0.");
            return;
        }

        placeBid(listingId, bidAmount)
            .then(() => {
                alert(`Bid of ${bidAmount} USD placed successfully.`);
                document.getElementById("bidModal").style.display = "none";
                fetchAndDisplayListing(); // Refresh listing details (including bid history)
            })
            .catch((error) => {
                console.error("Error placing bid:", error);
                const errorMessage =
                    error?.message || "Failed to place bid. Please try again.";
                alert(errorMessage);
            });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    createBidModal();

    fetchAndDisplayListing();
});
