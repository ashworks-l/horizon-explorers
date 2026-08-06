/* ===========================================
   FAVORITES
=========================================== */

export function getFavorites() {

    return JSON.parse(
        localStorage.getItem("favorites")
    ) || [];

}

export function saveFavorites(list) {

    localStorage.setItem(
        "favorites",
        JSON.stringify(list)
    );

}

export function isFavorite(name) {

    return getFavorites().some(
        country => country.name.common === name
    );

}

export function addFavorite(country) {

    const favorites = getFavorites();

    if (!isFavorite(country.name.common)) {

        favorites.push(country);

        saveFavorites(favorites);

    }

}

export function removeFavorite(name) {

    const favorites = getFavorites().filter(
        country => country.name.common !== name
    );

    saveFavorites(favorites);

}


/* ===========================================
   WISHLIST
=========================================== */

export function getWishlist() {

    return JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

}

export function saveWishlist(list) {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(list)
    );

}

export function addWishlist(country) {

    const wishlist = getWishlist();

    const exists = wishlist.some(
        item => item.name.common === country.name.common
    );

    if (!exists) {

        wishlist.push(country);

        saveWishlist(wishlist);

    }

}

export function removeWishlist(name) {

    const wishlist = getWishlist().filter(
        country => country.name.common !== name
    );

    saveWishlist(wishlist);

}


/* ===========================================
   TRIP PLANNER
=========================================== */

export function getTrips() {

    return JSON.parse(
        localStorage.getItem("trips")
    ) || [];

}

export function saveTrips(trips) {

    localStorage.setItem(
        "trips",
        JSON.stringify(trips)
    );

}

export function addTrip(trip) {

    const trips = getTrips();

    trips.push(trip);

    saveTrips(trips);

}

export function deleteTrip(id) {

    const trips = getTrips().filter(
        trip => trip.id !== id
    );

    saveTrips(trips);

}

export function updateTrip(updatedTrip) {

    const trips = getTrips().map(trip =>

        trip.id === updatedTrip.id
            ? updatedTrip
            : trip
    );

    saveTrips(trips);

}