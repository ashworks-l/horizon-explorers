import {
    getTrips,
    addTrip,
    deleteTrip
} from "./storage.js";

/* ===============================
   ELEMENTS
=============================== */

const tripForm = document.querySelector("#tripForm");
const plannerContainer = document.querySelector("#plannerContainer");
const plannerEmpty = document.querySelector("#plannerEmpty");

const countryInput = document.querySelector("#country");
const tripDateInput = document.querySelector("#tripDate");
const tripStatusInput = document.querySelector("#tripStatus");

let trips = [];

/* ===============================
   INITIALIZE
=============================== */

function initialize() {

    trips = getTrips();

    renderTrips();

}

initialize();

/* ===============================
   RENDER TRIPS
=============================== */

function renderTrips() {

    if (!plannerContainer || !plannerEmpty) return;

    plannerContainer.innerHTML = "";

    if (trips.length === 0) {

        plannerContainer.classList.add("hidden");
        plannerEmpty.classList.remove("hidden");

        return;

    }

    plannerContainer.classList.remove("hidden");
    plannerEmpty.classList.add("hidden");

    trips.forEach(trip => {

        plannerContainer.appendChild(
            createTripCard(trip)
        );

    });

}

/* ===============================
   CREATE CARD
=============================== */

function createTripCard(trip) {

    const article = document.createElement("article");

    article.className = "destination-card";

    article.innerHTML = `

        <div class="card-content">

            <h3>${trip.country}</h3>

            <p>

                <strong>Date:</strong>

                ${trip.date || "Not selected"}

            </p>

            <p>

                <strong>Status:</strong>

                ${trip.status}

            </p>

            <div class="card-buttons">

                <button
                    class="details-btn edit-trip"
                    data-id="${trip.id}">

                    Edit

                </button>

                <button
                    class="favorite-btn delete-trip"
                    data-id="${trip.id}">

                    🗑️

                </button>

            </div>

        </div>

    `;

    return article;

}

/* ===============================
   ADD TRIP
=============================== */

if (tripForm) {

    tripForm.addEventListener("submit", (event) => {

        event.preventDefault();

        if (countryInput.value.trim() === "") {

            alert("Please enter a country.");

            return;

        }

        const trip = {

            id: Date.now(),

            country: countryInput.value.trim(),

            date: tripDateInput.value,

            status: tripStatusInput.value

        };

        addTrip(trip);

        trips = getTrips();

        renderTrips();

        tripForm.reset();

    });

}

/* ===============================
   EDIT / DELETE
=============================== */

if (plannerContainer) {

    plannerContainer.addEventListener("click", (event) => {

        const editButton =
            event.target.closest(".edit-trip");

        const deleteButton =
            event.target.closest(".delete-trip");

        if (editButton) {

            const id =
                Number(editButton.dataset.id);

            const trip =
                trips.find(item => item.id === id);

            if (!trip) return;

            countryInput.value = trip.country;
            tripDateInput.value = trip.date;
            tripStatusInput.value = trip.status;

            deleteTrip(id);

            trips = getTrips();

            renderTrips();

        }

        if (deleteButton) {

            const id =
                Number(deleteButton.dataset.id);

            if (!confirm("Delete this trip?")) return;

            deleteTrip(id);

            trips = getTrips();

            renderTrips();

        }

    });

}

/* ===============================
   MOBILE MENU
=============================== */

const menuButton = document.querySelector("#menuButton");
const navbar = document.querySelector(".navbar");

if (menuButton && navbar) {

    menuButton.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

}

/* ===============================
   BACK TO TOP
=============================== */

const backToTop = document.querySelector("#backToTop");

if (backToTop) {

    backToTop.style.display = "none";

    window.addEventListener("scroll", () => {

        backToTop.style.display =
            window.scrollY > 300 ? "flex" : "none";

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ===============================
   ESC KEY
=============================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        window.location.href = "index.html";

    }

});

/* ===============================
   PAGE TITLE
=============================== */

document.title = "Trip Planner | Horizon Explorers";