console.log("hai");

// Navbar Fixed
window.onscroll = function () {
    const header = document.querySelector("header");
    const fixedNav = header.offsetTop;
    const toTop = document.querySelector("#to-top");

    if (window.scrollY > fixedNav) {
        header.classList.add("navbar-fixed");
        toTop.classList.add("flex");
        toTop.classList.remove("hidden");
    } else {
        header.classList.remove("navbar-fixed");
        toTop.classList.remove("flex");
        toTop.classList.add("hidden");
    }
};

//Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("hamburger-active");
    navMenu.classList.toggle("hidden");
});

window.addEventListener("click", function (e) {
    if (e.target != navMenu && e.target != hamburger) {
        navMenu.classList.add("hidden");
        hamburger.classList.remove("hamburger-active");
    }
});

// Dark  Mode

const darkToggle = document.querySelector("#dark-toggle");
const html = document.querySelector("html");

darkToggle.addEventListener("click", function () {
    if (darkToggle.checked) {
        html.classList.add("dark");
        localStorage.theme = "dark";
    } else {
        html.classList.remove("dark");
        localStorage.theme = "light";
    }
});

// Pinahkan toggle circle sesuai Mode ketika di riset
if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
    darkToggle.checked = true;
} else {
    darkToggle.checked = false;
}

// Validation input contact
function validateInputContact() {
    const name = document.querySelector("#name");
    const e_mail = document.querySelector("#email");
    const message = document.querySelector("#message");

    if (!name.value || name.value.trim() === "") {
        alert("input nama");
        return false;
    } else if (!e_mail.value || e_mail.value.trim() === "") {
        alert("input email");
        return false;
    } else if (!message.value || message.value.trim() === "") {
        alert("input pesan");
        return false;
    }

    return true;
}

// Contact form to spreadsheet

const scriptURL =
    "https://script.google.com/macros/s/AKfycbxhQlfT3aOtx19Blw8iq5xbdx_ALfqTZpsIX2CUxIdSpgyErYkFbBGitefN2TMayNqzdA/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", (e) => {
    const btnKirim = document.querySelector(".btn-kirim");
    const btnLoading = document.querySelector(".btn-loading");
    e.preventDefault();

    btnKirim.classList.toggle("hidden");
    btnLoading.classList.toggle("hidden");

    if (validateInputContact()) {
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
            .then((response) => {
                console.log("Success!", response);
                btnKirim.classList.toggle("hidden");
                btnLoading.classList.toggle("hidden");
                alert("submit sukses");
                form.reset();
            })
            .catch((error) => console.error("Error!", error.message));
    }
});
