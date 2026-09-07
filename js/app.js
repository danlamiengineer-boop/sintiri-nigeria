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

        alert("Passenger details saved successfully!");
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
