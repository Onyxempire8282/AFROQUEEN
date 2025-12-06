// AfroQueen Interactive Features
// Business Address for Navigation
const businessAddress =
  "PH Bayview, planta baja a la parte de atrás, C. República de Haití, Panama City, Panamá Province";
const businessCoords = "8.9936034,-79.5195617"; // Update with actual coordinates

// Open Directions in Google Maps or Waze
function openDirections(event, app) {
  event.preventDefault();

  const encodedAddress = encodeURIComponent(businessAddress);

  if (app === "google") {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank"
    );
  } else if (app === "waze") {
    window.open(`https://waze.com/ul?q=${encodedAddress}`, "_blank");
  }
}

// Reviews Carousel
let currentReview = 0;
const totalReviews = 5;

function showReview(index) {
  const slides = document.querySelectorAll(".review-slide");
  const dots = document.querySelectorAll(".carousel-dots .dot");

  if (!slides.length) return;

  // Hide all slides
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Show selected slide
  currentReview = index;
  slides[currentReview].classList.add("active");
  dots[currentReview].classList.add("active");
}

// Auto-rotate reviews every 5 seconds
function autoRotateReviews() {
  currentReview = (currentReview + 1) % totalReviews;
  showReview(currentReview);
}

// Start auto-rotation
let reviewInterval = setInterval(autoRotateReviews, 5000);

// Pause on hover
const carousel = document.querySelector(".reviews-carousel");
if (carousel) {
  carousel.addEventListener("mouseenter", () => {
    clearInterval(reviewInterval);
  });

  carousel.addEventListener("mouseleave", () => {
    reviewInterval = setInterval(autoRotateReviews, 5000);
  });
}

// Open Booksy Modal
function openBooksy() {
  const container = document.getElementById("booksy-container");
  const iframe = document.getElementById("booksy-iframe");

  // Replace with actual Booksy embed URL when available
  const booksyUrl = "https://booksy.com/en-us/widget/booking"; // UPDATE WITH ACTUAL BOOKSY LINK

  if (container && iframe) {
    iframe.src = booksyUrl;
    container.style.display = "block";
    container.scrollIntoView({ behavior: "smooth" });
  } else {
    // Fallback to WhatsApp if Booksy not configured
    window.open(
      "https://wa.me/50767223181?text=Hi!%20I%27d%20like%20to%20book%20an%20appointment.",
      "_blank"
    );
  }
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// WhatsApp Float Button Animation
window.addEventListener("scroll", () => {
  const whatsappButton = document.querySelector(".whatsapp-float");
  if (window.scrollY > 300) {
    whatsappButton.classList.add("visible");
  } else {
    whatsappButton.classList.remove("visible");
  }
});

// Book This Style buttons (for hairstyles page)
function bookThisStyle(styleName) {
  const message = encodeURIComponent(
    `Hi! I'd like to book an appointment for ${styleName}.`
  );
  window.open(`https://wa.me/50767223181?text=${message}`, "_blank");
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("AfroQueen interactive features loaded");

  // Show first review
  showReview(0);

  // Add WhatsApp button visibility class after delay
  setTimeout(() => {
    const whatsappButton = document.querySelector(".whatsapp-float");
    if (whatsappButton) {
      whatsappButton.classList.add("loaded");
    }
  }, 1000);
});
