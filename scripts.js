"use strict";
/*===============================
  random movie suggestion
===============================*/
// pick a random movie and display it
function randomMovie() {
    var movies = [
        "The Shining",
        "Insidious",
        "Nosferatu The Vampyre 1992",
        "The Nun",
        "The Conjuring",
        "The Others"
    ];
    var randomMovie = movies[Math.floor(Math.random() * movies.length)];
    var movieSuggestion = document.getElementById("movieSuggestion");
    if (movieSuggestion) {
        movieSuggestion.innerText = "You should watch:\n".concat(randomMovie);
    }
}
/*===============================
  image carousel
===============================*/
// all the images for the carousel
var imagePaths = [
    "Media/theothers.jpg",
    "Media/girlincastle.jpg",
    "Media/snowsemetary.jpg",
    "Media/foggy.jpg",
    "Media/cof.jpg",
    "Media/silenthill.jpg",
    "Media/videogame.jpg"
];
// change images when page is loaded
document.addEventListener("DOMContentLoaded", function () {
    var imageElements = document.querySelectorAll("img");
    // move left when left button clicked
    document.querySelector("#left_button").addEventListener("click", function (evt) {
        var firstLink = imagePaths.shift(); // take first image
        imagePaths.push(firstLink); // move it to end
        // show first 3 images
        for (var i = 0; i < imageElements.length; i++) {
            imageElements[i].src = imagePaths[i];
        }
    });
    // move right when right button clicked
    document.querySelector("#right_button").addEventListener("click", function (evt) {
        var lastLink = imagePaths.pop(); // take last image
        imagePaths.unshift(lastLink); // move it to start
        // show first 3 images
        for (var i = 0; i < imageElements.length; i++) {
            imageElements[i].src = imagePaths[i];
        }
    });
});
/*===============================
   contact form validation
===============================*/
// get element shortcut
var getElement = function (selector) { return document.querySelector(selector); };
// validate form inputs
function processEntries() {
    var name = getElement("#name");
    var email = getElement("#email_address");
    var phone = getElement("#phone");
    var message = getElement("#message");
    var isValid = true;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phonePattern = /^[0-9\-\+\s\(\)]{7,15}$/;
    // name check
    if (name && name.value.trim() === "") {
        name.nextElementSibling.textContent = "This field is required.";
        isValid = false;
    }
    else if (name) {
        name.nextElementSibling.textContent = "";
    }
    // email check
    if (email && !emailPattern.test(email.value.trim())) {
        email.nextElementSibling.textContent = "Enter a valid email.";
        isValid = false;
    }
    else if (email) {
        email.nextElementSibling.textContent = "";
    }
    // phone check
    if (phone && !phonePattern.test(phone.value.trim())) {
        phone.nextElementSibling.textContent = "Enter a valid phone number.";
        isValid = false;
    }
    else if (phone) {
        phone.nextElementSibling.textContent = "";
    }
    // message check
    if (message && message.value.trim() === "") {
        message.nextElementSibling.textContent = "This field is required.";
        isValid = false;
    }
    else if (message) {
        message.nextElementSibling.textContent = "";
    }
    // if all good, show alert and reset
    if (isValid) {
        alert("Form submitted successfully!");
        var form = document.getElementById("contactForm");
        if (form)
            form.reset();
    }
}
/*===============================
   comment section with jQuery
===============================*/
$(document).ready(function () {
    // load old comments
    var savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    savedComments.forEach(function (comment) {
        $('#commentsSection').append(comment);
    });
    // when user clicks post
    $('#submitComment').click(function () {
        var name = $('#username').val().trim() || "Anonymous"; // if no name, show as anonymous
        var comment = $('#usercomment').val().trim();
        // if empty, show alert
        if (comment === "") {
            alert("Please write a comment before posting.");
            return;
        }
        // create new comment block
        var newComment = "\n            <div class=\"comment\">\n                <strong>".concat(name, " says:</strong>\n                <p>").concat(comment, "</p>\n            </div>\n        ");
        // add comment to page
        $('#commentsSection').append(newComment);
        // save to localStorage
        savedComments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(savedComments));
        // clear form
        $('#username').val('');
        $('#usercomment').val('');
    });
});
