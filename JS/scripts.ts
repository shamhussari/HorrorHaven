"use strict";

/*===============================
   random movie suggestion
===============================*/
// pick random movie and show it
function randomMovie() {
    const movies = [
        "The Shining",
        "Insidious",
        "Nosferatu The Vampyre 1992",
        "The Nun",
        "The Conjuring",
        "The Others"
    ];
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    const movieSuggestion = document.getElementById("movieSuggestion");
    if (movieSuggestion) {
        movieSuggestion.innerText = `You should watch:\n${randomMovie}`;
    }
}

/*===============================
  image carousel
===============================*/
// all images for carousel
const imagePaths: string[] = [
    "Media/theothers.jpg",
    "Media/girlincastle.jpg",
    "Media/snowsemetary.jpg",
    "Media/foggy.jpg",
    "Media/cof.jpg",
    "Media/silenthill.jpg",
    "Media/videogame.jpg"
];

// run when page loads
document.addEventListener("DOMContentLoaded", () => {
    const imageElements = document.querySelectorAll("img");

    // left button click
    document.querySelector("#left_button")?.addEventListener("click", evt => {
        let firstLink = imagePaths.shift(); // take first
        if (firstLink) imagePaths.push(firstLink); // move to end

        // show 3 images
        for (let i = 0; i < imageElements.length; i++) {
            imageElements[i].setAttribute('src', imagePaths[i]);
        }
    });

    // right button click
    document.querySelector("#right_button")?.addEventListener("click", evt => {
        let lastLink = imagePaths.pop(); // take last
        if (lastLink) imagePaths.unshift(lastLink); // move to start

        // show 3 images
        for (let i = 0; i < imageElements.length; i++) {
            imageElements[i].setAttribute('src', imagePaths[i]);
        }
    });
});

/*===============================
   contact form validation
===============================*/
// get element shortcut
const getElement = (selector: string): HTMLElement | null => document.querySelector(selector);

// validate form inputs
function processEntries() {
    const name = getElement("#name") as HTMLInputElement;
    const email = getElement("#email_address") as HTMLInputElement;
    const phone = getElement("#phone") as HTMLInputElement;
    const message = getElement("#message") as HTMLTextAreaElement;
    let isValid = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9\-\+\s\(\)]{7,15}$/;

    // name check
    if (name && name.value.trim() === "") {
        name.nextElementSibling!.textContent = "This field is required.";
        isValid = false;
    } else if (name) {
        name.nextElementSibling!.textContent = "";
    }

    // email check
    if (email && !emailPattern.test(email.value.trim())) {
        email.nextElementSibling!.textContent = "Enter a valid email.";
        isValid = false;
    } else if (email) {
        email.nextElementSibling!.textContent = "";
    }

    // phone check
    if (phone && !phonePattern.test(phone.value.trim())) {
        phone.nextElementSibling!.textContent = "Enter a valid phone number.";
        isValid = false;
    } else if (phone) {
        phone.nextElementSibling!.textContent = "";
    }

    // message check
    if (message && message.value.trim() === "") {
        message.nextElementSibling!.textContent = "This field is required.";
        isValid = false;
    } else if (message) {
        message.nextElementSibling!.textContent = "";
    }

    // if all valid, reset form
    if (isValid) {
        alert("Form submitted successfully!");
        const form = document.getElementById("contactForm");
        if (form) (form as HTMLFormElement).reset(); // form reset fix
    }
}

/*===============================
  comment section with jQuery
===============================*/
$(document).ready(function () {
    // load old comments
    const savedComments: string[] = JSON.parse(localStorage.getItem('comments') || '[]');
    savedComments.forEach((comment: string) => {
        $('#commentsSection').append(comment);
    });

    // when user clicks post
    $('#submitComment').click(function () {
        const name = ($('#username').val() as string).trim() || "Anonymous"; // trim fix
        const comment = ($('#usercomment').val() as string).trim(); // trim fix

        // if empty comment
        if (comment === "") {
            alert("Please write a comment before posting.");
            return;
        }

        // create comment block
        const newComment = `
            <div class="comment">
                <strong>${name} says:</strong>
                <p>${comment}</p>
            </div>
        `;

        // add to page
        $('#commentsSection').append(newComment);

        // save to localStorage
        savedComments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(savedComments));

        // clear inputs
        $('#username').val('');
        $('#usercomment').val('');
    });
});