

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


export function showBidModal(initialBid) {
    const modalElement = document.getElementById("bidModal") || createBidModal();
    const bidInput = document.getElementById("bidInput");
    bidInput.value = initialBid || "";
    modalElement.style.display = "block";
}
