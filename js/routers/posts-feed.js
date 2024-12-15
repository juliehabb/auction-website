import { readListings, searchListings } from "../api/listing/read.js";


export async function populateListings(query = "") {
    try {
        const listings = query
            ? (await searchListings(query)).data // Perform search if query exists
            : await readListings(); // Otherwise, fetch all listings
  
        console.log("Fetched Listings:", listings);
  
        const container = document.getElementById("listings-container");
  
        if (!container) {
            throw new Error("Listings container not found.");
        }
  
        // Clear existing content
        container.innerHTML = "";
  
        // Display "No listings available" if the result is empty
        if (!Array.isArray(listings) || listings.length === 0) {
            container.innerHTML = "<p>No listings available.</p>";
            return;
        }
  
        // Get the current date and time
        const currentDate = new Date();
  
        // Filter out expired listings
        const validListings = listings.filter((listing) => {
            const endsAtDate = new Date(listing.endsAt);
            return endsAtDate > currentDate; // Only include listings whose end date is in the future
        });
  
        // Check if there are valid listings
        if (validListings.length === 0) {
            container.innerHTML = "<p>No valid listings available.</p>";
            return;
        }
  
        // Populate valid listings
        validListings.forEach((listing) => {
            // Check if the listing has a valid image URL
            const hasValidImage =
                listing.media &&
                listing.media.length > 0 &&
                listing.media[0].url &&
                listing.media[0].url.trim() !== "";
  
            if (!hasValidImage) {
                return; // Skip this listing if it doesn't have a valid image
            }
  
            const card = document.createElement("div");
            card.classList.add("col");
  
            card.innerHTML = `
                <div class="card col shadow-sm">
                    <img
                        src="${listing.media[0].url}"
                        alt="${listing.media[0].alt || 'Listing image'}"
                        class="card-img-top"
                    />
                    <div class="card-body">
                        <h3 class="card-title pb-2">${listing.title}</h3>
                        <div class="d-flex justify-content-between">
                            <div>
                                <p class="fw-bold highlight-yellow mb-0">
                                    ${new Date(listing.endsAt).toLocaleDateString()}
                                </p>
                                <p class="mb-0 mt-0">Ends</p>
                            </div>
                            <div>
                                <p class="fw-bold highlight-yellow mb-0">${
                                    listing.highestBid || "No bids yet"
                                }</p>
                                <p class="mb-0 mt-0">Highest bid</p>
                            </div>
                        </div>
                        <hr />
                        <div class="d-flex justify-content-between mb-2">
                            <p>Seller: ${listing.seller?.name || "Unknown"}</p>
                            <button class="btn btn-primary place-bid-btn" data-id="${listing.id}">
                                Place bid
                            </button>
                        </div>
                    </div>
                </div>
            `;
  
            card.addEventListener("click", (event) => {
                if (!event.target.classList.contains("place-bid-btn")) {
                    window.location.href = `/pages/listing.html?id=${listing.id}`;
                }
            });
  
            // Append card to container
            container.appendChild(card);
        });
  
        // Attach Place Bid event listeners to buttons
        document.querySelectorAll(".place-bid-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.stopPropagation(); // Prevent navigation when clicking "Place bid"
                const listingId = button.getAttribute("data-id");
                placeBid(listingId);
            });
        });
    } catch (error) {
        console.error("Error populating listings:", error);
        document.getElementById("listings-container").innerHTML =
            "<p>Failed to load listings.</p>";
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    populateListings(); // Load all listings initially
  
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
  
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        populateListings(query); // Call populateListings with or without a query
    });
  
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            const query = searchInput.value.trim();
            populateListings(query); // Filter listings dynamically
        }
    });
  });
  