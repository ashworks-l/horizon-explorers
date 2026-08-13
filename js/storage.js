const FAVORITES_KEY = "horizonFavorites";
const WISHLIST_KEY = "horizonWishlist";
const TRIPS_KEY = "horizonTrips";


/* ===========================================
   FAVORITES
=========================================== */

export function getFavorites() {

    return JSON.parse(
        localStorage.getItem(FAVORITES_KEY)
    ) || [];

}


export function saveFavorite(country) {

    const favorites = getFavorites();

    const exists = favorites.some(
        item => item.country === country.country
    );

    if (!exists) {

        favorites.push(country);

        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(favorites)
        );

    }

    return favorites;

}


export function removeFavorite(countryName) {

    const favorites = getFavorites()
        .filter(
            item => item.country !== countryName
        );

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );

}


/* ===========================================
   WISHLIST
=========================================== */

export function getWishlist() {

    return JSON.parse(
        localStorage.getItem(WISHLIST_KEY)
    ) || [];

}


export function addToWishlist(country) {

    const wishlist = getWishlist();

    const exists = wishlist.some(
        item => item.country === country.country
    );

    if (!exists) {

        wishlist.push(country);

        localStorage.setItem(
            WISHLIST_KEY,
            JSON.stringify(wishlist)
        );

    }

    return wishlist;

}


export function removeFromWishlist(countryName) {

    const wishlist = getWishlist()
        .filter(
            item => item.country !== countryName
        );

    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist)
    );

}


/* ===========================================
   TRIP PLANNER
=========================================== */

export function getTrips() {

    return JSON.parse(
        localStorage.getItem(TRIPS_KEY)
    ) || [];

}


export function addTrip(trip) {

    const trips = getTrips();

    trips.push(trip);

    localStorage.setItem(
        TRIPS_KEY,
        JSON.stringify(trips)
    );

    return trips;

}


export function removeTrip(index) {

    const trips = getTrips();

    trips.splice(index, 1);

    localStorage.setItem(
        TRIPS_KEY,
        JSON.stringify(trips)
    );

}


/* ===========================================
   CLEAR DATA
=========================================== */

export function clearFavorites() {

    localStorage.removeItem(FAVORITES_KEY);

}


export function clearWishlist() {

    localStorage.removeItem(WISHLIST_KEY);

}


export function clearTrips() {

    localStorage.removeItem(TRIPS_KEY);

}