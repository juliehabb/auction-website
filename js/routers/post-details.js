import { readListing, placeBid } from "../api/listing.js";
import { createBidModal, showBidModal } from "../ui/modals.js";

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
        if (endsAt < now) {
            alert("This listing has already ended. You cannot place a bid.");
            document.querySelector(".btn-primary.ms-2").disabled = true; // Disable "Place Bid" button
        }

        // Update the main image
        const primaryMedia = listing.media?.[0];
        const imgElement = document.querySelector(".img-listing");
        if (primaryMedia) {
            imgElement.src = primaryMedia.url;
            imgElement.alt = primaryMedia.alt || "Listing image";
        } else {
            imgElement.src = "/images/default-image.jpg";
            imgElement.alt = "Default image";
        }

        // Replace seller's name dynamically
        const sellerNameElement = document.querySelector(".more-info .d-flex a p");
        sellerNameElement.textContent = listing.seller?.name || "Unknown Seller";

        // Populate other elements
        document.querySelector(".heading h1").textContent = listing.title;
        document.querySelector(".heading p").textContent = `Time left: ${
            listing.endsAt ? new Date(listing.endsAt).toLocaleString() : "No end date"
        }`;
        document.querySelector(".paragraph p").textContent = listing.description || "No description provided.";

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
            bidHistoryTable.innerHTML = "<tr><td colspan='3'>No bids available.</td></tr>";
        }

        // Attach event listener to the "Place Bid" button
        document.querySelector(".btn-primary.ms-2").addEventListener("click", () => {
            const bidAmount = document.querySelector(".bid-amount").value;
            showBidModal(bidAmount);
        });
    } catch (error) {
        console.error("Error fetching listing:", error);
        document.body.innerHTML = "<p>Failed to load listing details.</p>";
    }
}

// Handle bid submission from the modal
document.addEventListener("click", (event) => {
    if (event.target.id === "submitBid") {
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

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
    // Ensure the modal is created in the DOM
    createBidModal();

    // Fetch and display listing details
    fetchAndDisplayListing();
});

