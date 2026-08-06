import {
    getAllCountries,
    searchCountry,
    getRegion
} from "./api.js";

alert("main.js cargado");

const container = document.querySelector("#destinationsContainer");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const filterButtons = document.querySelectorAll(".filter-btn");
const menuButton = document.querySelector("#menuButton");
const navbar = document.querySelector(".navbar");
const backToTop = document.querySelector("#backToTop");

/* ===========================
   LOAD COUNTRIES
=========================== */

async function loadCountries() {
    try {
        const countries = await getAllCountries();

        alert("Countries loaded: " + countries.length);

        displayCountries(countries);

    } catch (error) {

        alert(error.message);
        console.log(error);

    }
}
/* ===========================
   DISPLAY COUNTRIES
=========================== */

function displayCountries(countries) {

    container.innerHTML = "";

    countries
        .sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
        )
        .forEach(country => {

            const card = document.createElement("article");

            card.className = "destination-card";

            card.innerHTML = `

                <img
                    src="${country.flags.svg}"
                    alt="${country.name.common} flag">

                <div class="card-content">

                    <h3>${country.name.common}</h3>

                    <p><strong>Capital:</strong>
                    ${country.capital ? country.capital[0] : "N/A"}</p>

                    <p><strong>Region:</strong>
                    ${country.region}</p>

                    <button
                        class="details-btn"
                        data-country="${country.name.common}">

                        View Details

                    </button>

                </div>

            `;

            container.appendChild(card);

        });

    addDetailsEvents();

}

/* ===========================
   DETAILS BUTTON
=========================== */

function addDetailsEvents() {

    const buttons = document.querySelectorAll(".details-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const country = button.dataset.country;

            window.location.href =
                `destination.html?country=${encodeURIComponent(country)}`;

        });

    });

}

/* ===========================
   SEARCH
=========================== */

searchButton.addEventListener("click", async () => {

    const value = searchInput.value.trim();

    if (!value) {

        loadCountries();

        return;

    }

    try {

        const countries = await searchCountry(value);

        displayCountries(countries);

    } catch {

        container.innerHTML =

        "<h2>Country not found.</h2>";

    }

});

/* ===========================
   FILTERS
=========================== */

filterButtons.forEach(button => {

    button.addEventListener("click", async () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const region = button.dataset.region;

        if (region === "all") {

            loadCountries();

            return;

        }

        const countries = await getRegion(region);

        displayCountries(countries);

    });

});

/* ===========================
   MOBILE MENU
=========================== */

if (menuButton) {

    menuButton.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

}

/* ===========================
   BACK TO TOP
=========================== */

if (backToTop) {

    backToTop.style.display = "none";

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            backToTop.style.display = "flex";

        } else {

            backToTop.style.display = "none";

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ===========================
   START
=========================== */

loadCountries();