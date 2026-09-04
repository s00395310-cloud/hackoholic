// ======================================
// HACKOHOLIC OFFICIAL WEBSITE
// Version 1.0
// ======================================


// Mobile menu

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("show");

});


// Close mobile menu after clicking link

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

    });

});


// Product popup

const popup =
    document.getElementById("popup");


function showProduct() {

    popup.classList.add("show");

}


function closeProduct() {

    popup.classList.remove("show");

}


// Close popup by clicking outside

popup.addEventListener("click", event => {

    if (event.target === popup) {

        closeProduct();

    }

});


// Developer Journal

function journalComingSoon() {

    alert(
        "HACKOHOLIC Developer Journal is coming soon! 🚀"
    );

}


// YouTube button

function openYouTube() {

    // Replace this with your real
    // HACKOHOLIC YouTube channel URL.

    const youtubeURL =
        "https://www.youtube.com/";

    window.open(
        youtubeURL,
        "_blank"
    );

}


// Current year

document.getElementById("year")
    .textContent =
    new Date().getFullYear();


// Keyboard support for popup

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeProduct();

    }

});