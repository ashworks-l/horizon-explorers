import {
    getWishlist,
    removeWishlist
} from "./storage.js";

import {
    getFlag,
    getCapital
} from "./api.js";

/* ===============================
   ELEMENTS
=============================== */

const wishlistContainer =
    document.querySelector("#wishlistContainer");

const emptyWishlist =
    document.querySelector("#emptyWishlist");

let wishlist = [];

/* ===============================
   INITIALIZE
=============================== */

function initialize() {

    wishlist = getWishlist();

    renderWishlist();

}

initialize();

/* ===============================
   RENDER WISHLIST
=============================== */

function renderWishlist() {

    if (!wishlistContainer || !emptyWishlist) return;

    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistContainer.classList.add("hidden");
        emptyWishlist.classList.remove("hidden");

        return;

    }

    wishlistContainer.classList.remove("hidden");
    emptyWishlist.classList.add("hidden");

    wishlist.forEach(country => {

        wishlistContainer.appendChild(
            createCard(country)
        );

    });

}

/* ===============================
   CREATE CARD
=============================== */

function createCard(country) {

    const card =
        document.createElement("article");

    card.className =
        "destination-card";

    card.innerHTML = `

        <img
            src="${getFlag(country)}"
            alt="${country.name.common}">

        <div class="card-content">

            <h3>

                ${country.name.common}

            </h3>

            <p>

                <strong>Capital:</strong>

                ${getCapital(country)}

            </p>

            <p>

                <strong>Region:</strong>

                ${country.region}

            </p>

            <div class="card-buttons">

                <button
                    class="details-btn"
                    data-country="${country.name.common}">

                    View Details

                </button>

                <button
                    class="favorite-btn"
                    data-country="${country.name.common}">

                    🗑️

                </button>

            </div>

        </div>

    `;

    return card;

}

/* ===============================
   EVENTS
=============================== */

if (wishlistContainer) {

    wishlistContainer.addEventListener("click", (event) => {

        const detailsButton =
            event.target.closest(".details-btn");

        const deleteButton =
            event.target.closest(".favorite-btn");

        if (detailsButton) {

            const country =
                detailsButton.dataset.country;

            window.location.href =
                `destination.html?country=${encodeURIComponent(country)}`;

        }

        if (deleteButton) {

            const country =
                deleteButton.dataset.country;

            removeWishlist(country);

            wishlist = getWishlist();

            renderWishlist();

        }

    });

}

/* ===============================
   MOBILE MENU
=============================== */

const menuButton =
    document.querySelector("#menuButton");

const navbar =
    document.querySelector(".navbar");

if (menuButton && navbar) {

    menuButton.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

}

/* ===============================
   BACK TO TOP
=============================== */

const backToTop =
    document.querySelector("#backToTop");

if (backToTop) {

    backToTop.style.display = "none";

    window.addEventListener("scroll", () => {

        backToTop.style.display =
            window.scrollY > 300
                ? "flex"
                : "none";

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

        window.location.href =
            "index.html";

    }

});

/* ===============================
   PAGE TITLE
=============================== */

document.title =
    "Travel Wishlist | Horizon Explorers";