
function loadPage(pageName) {
    // ① Hide all pages
    document.querySelectorAll(".page").forEach(function (p) {
        p.classList.remove("active");
    });

    // ② Show the target page
    var target = document.getElementById("page-" + pageName);
    if (target) {
        target.classList.add("active");
    }

    // ③ Update active nav link highlight
    document.querySelectorAll(".nav-link").forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("data-page") === pageName) {
            link.classList.add("active");
        }
    });

    // ④ Scroll content area to top on page switch
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Logo click → go home */
document.querySelector(".logo-container").addEventListener("click", function () {
    loadPage("home");
});

/* ──────────────────────────────────────────
   NAVBAR SCROLL EFFECT
────────────────────────────────────────── */
window.addEventListener("scroll", function () {
    var navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

/* ──────────────────────────────────────────
   SEARCH FUNCTION
────────────────────────────────────────── */
function searchDestination() {
    var input = document.getElementById("searchInput").value.toLowerCase().trim();
    var cards = document.querySelectorAll(".card");

    // Filter home page cards
    cards.forEach(function (card) {
        var title = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = (input === "" || title.includes(input)) ? "" : "none";
    });

    // PHP server-side search
    if (input !== "") {
        fetch("../php/search.php?q=" + encodeURIComponent(input))
            .then(function (res) { return res.text(); })
            .then(function (data) {
                document.getElementById("php-result-content").innerHTML = data;
                document.getElementById("php-results").style.display = "block";
            })
            .catch(function () {
                document.getElementById("php-results").style.display = "none";
            });
    } else {
        document.getElementById("php-results").style.display = "none";
    }
}

// Enter key triggers search
document.getElementById("searchInput").addEventListener("keyup", function () {
    searchDestination();
});

/* ──────────────────────────────────────────
   STAR RATING
────────────────────────────────────────── */
document.querySelectorAll(".stars").forEach(function (starBox) {
    var stars = starBox.querySelectorAll("i");
    var scoreEl = starBox.nextElementSibling
        ? starBox.nextElementSibling.querySelector(".score")
        : null;

    stars.forEach(function (star, index) {
        // Hover preview
        star.addEventListener("mouseover", function () {
            stars.forEach(function (s, i) {
                s.classList.toggle("active", i <= index);
            });
        });

        // Reset on mouseout (back to saved state)
        star.addEventListener("mouseout", function () {
            var saved = parseInt(starBox.getAttribute("data-rating") || "0");
            stars.forEach(function (s, i) {
                s.classList.toggle("active", i < saved);
            });
        });

        // Click to save rating
        star.addEventListener("click", function () {
            var rating = index + 1;
            starBox.setAttribute("data-rating", rating);

            stars.forEach(function (s, i) {
                s.classList.toggle("active", i < rating);
            });

            if (scoreEl) { scoreEl.textContent = rating; }

            // Send to server
            var placeName = starBox.closest(".place").querySelector("h3").textContent;
            fetch("save_rating.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: "place=" + encodeURIComponent(placeName) + "&rating=" + rating
            });
        });
    });
});

/* ──────────────────────────────────────────
   COMMENT SYSTEM
────────────────────────────────────────── */
function addComment(btn) {
    var box = btn.parentElement;
    var input = box.querySelector("input");
    var text = input.value.trim();
    if (text === "") return;

    // Send to server
    var placeName = box.closest(".place").querySelector("h3").textContent;
    fetch("save_comment.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "place=" + encodeURIComponent(placeName) + "&comment=" + encodeURIComponent(text)
    });

    // Show on page
    var commentArea = box.nextElementSibling;
    var p = document.createElement("p");
    p.textContent = "💬 " + text;
    p.style.borderBottom = "1px solid #eee";
    p.style.padding = "5px 0";
    commentArea.appendChild(p);
    input.value = "";
}

/* ──────────────────────────────────────────
   CONTACT FORM
────────────────────────────────────────── */
function submitContact(e) {
    e.preventDefault();
    var btn = e.target.querySelector("button[type=submit]");
    btn.textContent = "✅ Message Sent!";
    btn.style.background = "#01951a";
    setTimeout(function () {
        btn.textContent = "Send Message";
        btn.style.background = "";
        e.target.reset();
    }, 3000);
}