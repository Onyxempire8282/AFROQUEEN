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
    `¡Hola! I'd like to book an appointment for ${styleName}. Could you provide availability and pricing? Thank you!`
  );
  window.open(`https://wa.me/50767223181?text=${message}`, "_blank");
  showToast("Thank you, Queen! Your booking request is being sent to WhatsApp.");
}

// Newsletter Signup Handler
function handleNewsletterSignup(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  
  // Here you would normally send to your email service
  console.log("Newsletter signup:", email);
  
  // Show success message
  showToast(
    "🎁 Thank you! Check your email for your FREE Crown Care Ritual Guide!"
  );
  
  // Reset form
  event.target.reset();
}

// Toast Notification System
function showToast(message, duration = 4000) {
  // Remove existing toast if any
  const existingToast = document.querySelector(".toast-notification");
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 100);

  // Remove after duration
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Ritual Kit Data
const ritualKits = {
  "wash-day": {
    name: "Wash Day Reset Kit",
    price: "$48.00",
    image: "images/category2.png",
    description: "Complete cleanse & hydration ritual for a healthy scalp foundation",
    includes: [
      "Caribbean Botanical Shampoo (8oz) - Gentle cleanse with hibiscus & coconut water",
      "Deep Conditioning Treatment Mask (6oz) - Intensive moisture with shea butter & argan oil",
      "Hydrating Leave-In Conditioner (4oz) - Daily protection with aloe vera & jojoba",
      "Microfiber Hair Towel - Reduces breakage & frizz during drying"
    ],
    howToUse: [
      "Step 1: Wet hair thoroughly with warm water to open cuticles",
      "Step 2: Apply shampoo, massage scalp gently for 2-3 minutes, rinse completely",
      "Step 3: Apply deep conditioning mask from roots to ends, cover with cap, wait 15-20 minutes",
      "Step 4: Rinse with cool water, gently squeeze excess with microfiber towel",
      "Step 5: Apply leave-in conditioner to damp hair, style as desired"
    ],
    benefits: "Restores moisture balance, promotes scalp health, reduces breakage, enhances natural texture"
  },
  "protective": {
    name: "Protective Style Survival Kit",
    price: "$55.00",
    image: "images/category1.png",
    description: "Everything needed to maintain braids, twists & locs with grace",
    includes: [
      "Nourishing Scalp Oil (2oz) - Peppermint & tea tree for itch relief & scalp health",
      "Braid Refresher Spray (8oz) - Witch hazel & rose water to refresh styles",
      "Silk Bonnet - Premium grade silk to protect styles while sleeping",
      "Edge Control (2oz) - Natural hold with castor oil & beeswax"
    ],
    howToUse: [
      "Step 1: Apply scalp oil directly to scalp 2-3x weekly, massage gently",
      "Step 2: Spray braid refresher on styles in the morning to revive shine",
      "Step 3: Wear silk bonnet every night to prevent frizz & maintain tension",
      "Step 4: Apply edge control to baby hairs and edges for sleek finish"
    ],
    benefits: "Extends protective style life, prevents itching, maintains moisture, preserves edges"
  },
  "growth": {
    name: "Growth & Edges Recovery Kit",
    price: "$62.00",
    image: "images/category3.png",
    description: "Stimulate growth & restore temple health with botanical care",
    includes: [
      "Hair Growth Serum (1oz) - Rosemary, biotin & caffeine to stimulate follicles",
      "Edge Butter (2oz) - Rich blend of castor oil, coconut & vitamin E",
      "Scalp Massager Tool - Silicone bristles increase circulation",
      "Application Brush - Precision applicator for temples & hairline"
    ],
    howToUse: [
      "Step 1: Part hair in sections, apply growth serum directly to scalp nightly",
      "Step 2: Use scalp massager in circular motions for 5 minutes to boost circulation",
      "Step 3: Apply edge butter to temples and hairline morning & night",
      "Step 4: Use application brush for precise coverage on thinning areas",
      "Consistency is key - use for 90 days minimum for visible results"
    ],
    benefits: "Stimulates dormant follicles, thickens edges, improves scalp circulation, reduces breakage"
  }
};

// Open Kit Modal
function openKitModal(kitId) {
  const kit = ritualKits[kitId];
  if (!kit) return;
  
  const modal = document.getElementById("kit-modal");
  const modalBody = document.getElementById("modal-body");
  
  modalBody.innerHTML = `
    <div class="kit-modal-content">
      <img src="${kit.image}" alt="${kit.name}" class="kit-modal-image">
      <h2>${kit.name}</h2>
      <p class="kit-modal-price">${kit.price}</p>
      <p class="kit-modal-description">${kit.description}</p>
      
      <div class="kit-section">
        <h3>What's Included:</h3>
        <ul class="kit-includes">
          ${kit.includes.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
      <div class="kit-section">
        <h3>How to Use:</h3>
        <ol class="kit-steps">
          ${kit.howToUse.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>
      
      <div class="kit-section">
        <h3>Benefits:</h3>
        <p>${kit.benefits}</p>
      </div>
      
      <div class="kit-actions">
        <button class="btn btn-primary btn-large" onclick="addToRoutine('${kitId}')">
          Add to Routine - ${kit.price}
        </button>
        <a href="https://wa.me/50767223181?text=Hola!%20I'm%20interested%20in%20the%20${encodeURIComponent(kit.name)}.%20Could%20you%20provide%20more%20information?" 
           class="btn btn-secondary btn-large" target="_blank">
          Ask About This Kit
        </a>
      </div>
    </div>
  `;
  
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// Close Kit Modal
function closeKitModal(event) {
  if (!event || event.target.id === "kit-modal" || event.target.className === "modal-close") {
    const modal = document.getElementById("kit-modal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Add to Routine (demo function)
function addToRoutine(kitId) {
  const kit = ritualKits[kitId];
  showToast(`✨ ${kit.name} added to your routine! (Demo mode - no payment processed)`);
  setTimeout(() => closeKitModal(), 1500);
}

// Filter Styles (for hairstyles page)
function filterStyles() {
  const lengthFilter = document.getElementById("filter-length")?.value || "all";
  const timeFilter = document.getElementById("filter-time")?.value || "all";
  const careFilter = document.getElementById("filter-care")?.value || "all";
  
  const cards = document.querySelectorAll(".hairstyle-card");
  
  cards.forEach(card => {
    const length = card.dataset.length || "medium";
    const time = card.dataset.time || "standard";
    const care = card.dataset.care || "low";
    
    const lengthMatch = lengthFilter === "all" || length === lengthFilter;
    const timeMatch = timeFilter === "all" || time === timeFilter;
    const careMatch = careFilter === "all" || care === careFilter;
    
    if (lengthMatch && timeMatch && careMatch) {
      card.style.display = "flex";
      card.style.animation = "fadeInUp 0.5s ease";
    } else {
      card.style.display = "none";
    }
  });
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
