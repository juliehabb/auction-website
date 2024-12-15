
/**
 * Creates the HTML structure for a "Place Bid" modal and appends it to the document body.
 * Ensures the modal is added only once.
 */

export function createBidModal() {
    const modalHtml = `
        <div class="modal" id="bidModal" tabindex="-1" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Place Bid</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <input id="bidInput" type="number" class="form-control" placeholder="Enter your bid">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="submitBid" type="button" class="btn btn-primary">Submit Bid</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
}

/**
 * Displays the "Place Bid" modal, initializing it if not already present.
 *
 * @param {number} [initialBid=0] - The initial bid amount to display in the input field.
 */

export function showBidModal(initialBid) {
    const modalElement = document.getElementById("bidModal") || createBidModal();
    const bidInput = document.getElementById("bidInput");
    bidInput.value = initialBid || "";
    modalElement.style.display = "block";
}

/**
 * Creates the HTML structure for an "Update Avatar" modal and appends it to the document body.
 * Ensures the modal is added only once.
 */
export function createAvatarUpdateModal() {
    if (document.getElementById("avatarModal")) return;

    const modalHtml = `
        <div class="modal fade" id="avatarModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Update Profile Photo</h4>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form id="avatarUpdateForm" class="d-flex flex-column">
                            <label for="avatarUrl" class="form-label">New Avatar URL</label>
                            <input
                                type="url"
                                id="avatarUrl"
                                name="avatarUrl"
                                class="form-control"
                                placeholder="Enter image URL"
                                required
                            />
                            <button type="submit" class="btn btn-primary mt-3">
                                Update Avatar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);
}

/**
 * Creates the HTML structure for a "New Listing" modal and appends it to the document body.
 * Ensures the modal is added only once. Includes a dark overlay for better focus.
 */
export function createNewListingModal() {
    if (document.getElementById("newListingModal")) return; // Avoid duplicate modals

    const modalHtml = `
    <div id="modalOverlay" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        z-index: 1040;">
    </div>
    <div class="modal" id="newListingModal" tabindex="-1" style="display: none; z-index: 1050;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">New Listing</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex container-fluid">
                    <div class="row">
                        <div class="col-6">
                            <form id="new-listing-form">
                                <label for="title" id="title-label">Title</label>
                                <input id="title" class="form-control" type="input" name="title" />
                                <label for="description" id="description-label">Description</label>
                                <textarea name="description" class="form-control" id="description" rows="4" placeholder="Enter a description..."></textarea>
                                <label for="price" id="price-label">Start price</label>
                                <input id="price" class="form-control" type="number" name="price" />
                                <label for="endDate">End Date</label>
                                <input id="endDate" class="form-control" type="date" />
                                <label for="endTime">End Time</label>
                                <input id="endTime" class="form-control" type="time" />
                                <label for="tag" id="tag-label">Tag</label>
                                <input id="tag" class="form-control" type="input" name="tags" />
                                <label for="mediaField">Add photo</label>
                                <input type="url" name="media" class="form-control" id="mediaField" required>
                                <button type="submit" class="btn btn-primary mt-3">Create Listing</button>
                            </form>
                        </div>
                        <div class="col-6">
                            <div>
                                <button>
                                    <img class="img-fluid" src="/images/pexels-mertal-22487122_optimized.jpg" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer"></div>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
}

/**
 * Displays the "New Listing" modal along with a dark overlay to focus attention.
 * Disables scrolling on the background while the modal is visible.
 */
export function showNewListingModal() {
    const modalElement = document.getElementById("newListingModal");
    const overlay = document.getElementById("modalOverlay");

    // Show overlay and modal
    if (overlay) overlay.style.display = "block";
    if (modalElement) {
        modalElement.style.display = "block";
        modalElement.classList.add("show");
    }

    // Prevent scrolling in the background
    document.body.style.overflow = "hidden";
}

/**
 * Hides the "New Listing" modal and removes the dark overlay.
 * Re-enables scrolling on the background.
 */
export function hideNewListingModal() {
    const modalElement = document.getElementById("newListingModal");
    const overlay = document.getElementById("modalOverlay");

    // Hide overlay and modal
    if (overlay) overlay.style.display = "none";
    if (modalElement) {
        modalElement.style.display = "none";
        modalElement.classList.remove("show");
    }

    // Re-enable scrolling in the background
    document.body.style.overflow = "";
}

/**
 * Attaches event listeners to handle "New Listing" modal functionality:
 * - Opens the modal when an element with the "new-listing" class is clicked.
 * - Closes the modal when a "btn-close" element inside the modal is clicked.
 *
 * Ensures the modal is created before attaching event listeners.
 */

function attachNewListingModalHandler() {
    
    createNewListingModal();

    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("new-listing")) {
            showNewListingModal();
        }
    });

    
    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-close")) {
            hideNewListingModal();
        }
    });
}


document.addEventListener("DOMContentLoaded", attachNewListingModalHandler);
