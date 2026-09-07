/**
 * ==============================================================
 * SINTIRI NIGERIA
 * Booking Application
 * ==============================================================
 */

"use strict";

const SintiriApp = {
    state: {
        trip: null,
        passengerCount: 1,
        selectedSeats: []
    },

    init() {
        this.bindEvents();
    },

    bindEvents() {
        document.addEventListener("DOMContentLoaded", () => {
            document.documentElement.classList.add("app-ready");
        });
    },

    selectTrip(route, time, price) {
        const passengerInput = document.getElementById("passengers");

        this.state.trip = {
            route,
            time,
            price
        };

        this.state.passengerCount = passengerInput
            ? Number(passengerInput.value)
            : 1;

        this.state.selectedSeats = [];

        this.renderSeatSelection();
    },

    renderSeatSelection() {
        const tripsSection = document.getElementById("trips");

        if (!tripsSection) {
            return;
        }

        const { route, time, price } = this.state.trip;
        const passengerCount = this.state.passengerCount;

        tripsSection.innerHTML = `
            <div class="seat-selection">
                <button type="button"
                        class="back-to-trips"
                        onclick="SintiriApp.backToTrips()">
                    ← Back to Trips
                </button>

                <div class="seat-header">
                    <span class="section-label">STEP 2 OF 5</span>
                    <h2>Select Your Seats</h2>
                    <p>
                        Choose ${passengerCount}
                        ${passengerCount === 1 ? "seat" : "seats"}
                        for your journey.
                    </p>
                </div>

                <div class="booking-summary">
                    <div>
                        <strong>${route}</strong>
                        <span>${time}</span>
                    </div>

                    <div>
                        <strong>${price}</strong>
                        <span>${passengerCount} passenger${passengerCount > 1 ? "s" : ""}</span>
                    </div>
                </div>

                <div class="seat-layout">
                    <div class="driver-area">
                        <span>DRIVER</span>
                    </div>

                    <div class="seat-grid" id="seatGrid"></div>

                    <div class="seat-legend">
                        <span>
                            <i class="legend-seat available"></i>
                            Available
                        </span>

                        <span>
                            <i class="legend-seat selected"></i>
                            Selected
                        </span>

                        <span>
                            <i class="legend-seat occupied"></i>
                            Occupied
                        </span>
                    </div>
                </div>

                <div class="seat-footer">
                    <div class="selected-info">
                        <span>Selected Seats</span>
                        <strong id="selectedSeatsText">None</strong>
                    </div>

                    <button type="button"
                            id="continueBooking"
                            class="continue-booking"
                            disabled>
                        Continue
                    </button>
                </div>
            </div>
        `;

        this.renderSeats();

        tripsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    },

    renderSeats() {
        const seatGrid = document.getElementById("seatGrid");

        if (!seatGrid) {
            return;
        }

        const seats = [];

        for (let row = 1; row <= 5; row++) {
            seats.push(
                `${row}A`,
                `${row}B`,
                `${row}C`,
                `${row}D`
            );
        }

        seatGrid.innerHTML = seats.map((seat) => `
            <button
                type="button"
                class="seat"
                data-seat="${seat}"
                aria-label="Seat ${seat}">
                ${seat}
            </button>
        `).join("");

        seatGrid.addEventListener("click", (event) => {
            const seat = event.target.closest(".seat");

            if (!seat) {
                return;
            }

            this.toggleSeat(seat.dataset.seat);
        });
    },

    toggleSeat(seatNumber) {
        const index = this.state.selectedSeats.indexOf(seatNumber);

        if (index !== -1) {
            this.state.selectedSeats.splice(index, 1);
        } else {
            if (
                this.state.selectedSeats.length >=
                this.state.passengerCount
            ) {
                return;
            }

            this.state.selectedSeats.push(seatNumber);
        }

        this.updateSeatDisplay();
    },

    updateSeatDisplay() {
        document.querySelectorAll(".seat").forEach((seat) => {
            seat.classList.toggle(
                "selected",
                this.state.selectedSeats.includes(seat.dataset.seat)
            );
        });

        const selectedText =
            document.getElementById("selectedSeatsText");

        const continueButton =
            document.getElementById("continueBooking");

        if (selectedText) {
            selectedText.textContent =
                this.state.selectedSeats.length
                    ? this.state.selectedSeats.join(", ")
                    : "None";
        }

        if (continueButton) {
            continueButton.disabled =
                this.state.selectedSeats.length !==
                this.state.passengerCount;

            continueButton.onclick = () => {
                this.continueBooking();
            };
        }
    },

    continueBooking() {
        if (
            this.state.selectedSeats.length !==
            this.state.passengerCount
        ) {
            return;
        }

    const tripsSection = document.getElementById("trips");

if (!tripsSection) {
    return;
}

tripsSection.innerHTML = `
    <div class="seat-selection">
        <button type="button"
                class="back-to-trips"
                onclick="SintiriApp.renderSeatSelection()">
            ← Back to Seats
        </button>

        <div class="seat-header">
            <span class="section-label">STEP 3 OF 5</span>
            <h2>Passenger Details</h2>
            <p>Enter the details of the lead passenger.</p>
        </div>

        <form id="passengerDetailsForm" class="passenger-form">

            <label for="passengerName">Full Name</label>
            <input
                type="text"
                id="passengerName"
                name="passengerName"
                placeholder="Enter full name"
                required
            >

            <label for="passengerPhone">Phone Number</label>
            <input
    type="tel"
    id="passengerPhone"
    name="passengerPhone"
    placeholder="08012345678"
    maxlength="11"
    minlength="11"
    pattern="[0-9]{11}"
    inputmode="numeric"
    required
>
                
                
                
            
            

            <label for="passengerEmail">Email Address</label>
            <input
                type="email"
                id="passengerEmail"
                name="passengerEmail"
                placeholder="Enter email address"
                required
            >

            <button type="submit" class="continue-booking">
                Continue
            </button>

        </form>
    </div>
`;

const passengerForm =
    document.getElementById("passengerDetailsForm");

if (passengerForm) {
    passengerForm.addEventListener("submit", (event) => {
        event.preventDefault();
const name = document.getElementById("passengerName").value;
const phone = document.getElementById("passengerPhone").value;
const email = document.getElementById("passengerEmail").value;

this.state.passenger = {
    name,
    phone,
    email
};

tripsSection.innerHTML = `
    <div class="seat-selection">

        <button type="button"
                class="back-to-trips"
                onclick="SintiriApp.renderSeatSelection()">
            ← Back to Seats
        </button>

        <div class="seat-header">
            <span class="section-label">STEP 4 OF 5</span>
            <h2>Booking Summary</h2>
            <p>Please review your booking details before payment.</p>
        </div>

        <div class="booking-summary">

            <div>
                <strong>Journey</strong>
                <span>${this.state.trip.route}</span>
            </div>

            <div>
                <strong>Departure</strong>
                <span>${this.state.trip.time}</span>
            </div>

            <div>
                <strong>Passengers</strong>
                <span>${this.state.passengerCount}</span>
            </div>

            <div>
                <strong>Seats</strong>
                <span>${this.state.selectedSeats.join(", ")}</span>
            </div>

            <div>
                <strong>Passenger</strong>
                <span>${name}</span>
            </div>

            <div>
                <strong>Phone</strong>
                <span>${phone}</span>
            </div>

            <div>
                <strong>Email</strong>
                <span>${email}</span>
            </div>

            <div>
                <strong>Total</strong>
                <span>${this.state.trip.price}</span>
            </div>

        </div>

        <button type="button"
                class="continue-booking"
                id="proceedToPayment">
            Proceed to Payment
        </button>

    </div>
`;

const paymentButton =
    document.getElementById("proceedToPayment");

if (paymentButton) {
    paymentButton.addEventListener("click", () => {
        tripsSection.innerHTML = `
    <div class="seat-selection">

        <button type="button"
                class="back-to-trips"
                onclick="SintiriApp.renderSeatSelection()">
            ← Back to Seats
        </button>

        <div class="seat-header">
            <span class="section-label">STEP 5 OF 5</span>
            <h2>Payment</h2>
            <p>Choose your preferred payment method.</p>
        </div>

        <div class="booking-summary">

            <div>
                <strong>Journey</strong>
                <span>${this.state.trip.route}</span>
            </div>

            <div>
                <strong>Seats</strong>
                <span>${this.state.selectedSeats.join(", ")}</span>
            </div>

            <div>
                <strong>Passenger</strong>
                <span>${this.state.passenger.name}</span>
            </div>

            <div>
                <strong>Total Amount</strong>
                <span>${this.state.trip.price}</span>
            </div>

        </div>

        <div class="payment-methods">

            <h3>Payment Method</h3>

            <button type="button"
                    class="payment-option"
                    id="payCard">
                💳 Pay with Card
            </button>

            <button type="button"
                    class="payment-option"
                    id="payTransfer">
                🏦 Bank Transfer
            </button>

        </div>

        <div class="payment-note">
            <strong>Secure Payment</strong>
            <p>
                Your payment will be processed securely.
                You will receive your booking confirmation after payment.
            </p>
        </div>

    </div>
`;

document.getElementById("payCard").addEventListener("click", () => {
    alert("Card payment will be connected next.");
});

document.getElementById("payTransfer").addEventListener("click", () => {
    alert("Bank transfer payment will be connected next.");
});
    });
}

tripsSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
});
        
    });
}

tripsSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
});
            
    },

    backToTrips() {
        window.location.reload();
    }
};

function selectTrip(route, time, price) {
    SintiriApp.selectTrip(route, time, price);
}

SintiriApp.init();
.payment-methods {
    margin-top: 28px;
}

.payment-methods h3 {
    margin-bottom: 16px;
    color: var(--text);
}

.payment-option {
    display: block;
    width: 100%;
    margin-bottom: 12px;
    padding: 15px 18px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--surface);
    color: var(--text);
    font-size: 16px;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
}

.payment-option:hover {
    border-color: var(--primary);
    background: var(--primary-light);
}

.payment-note {
    margin-top: 24px;
    padding: 18px;
    border-radius: 12px;
    background: var(--primary-light);
}

.payment-note strong {
    color: var(--primary-dark);
}

.payment-note p {
    margin: 8px 0 0;
    color: var(--muted);
    line-height: 1.6;
}
