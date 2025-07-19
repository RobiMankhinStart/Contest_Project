// ====..........................=====
// DOM ELEMENT Selection
//..........................==========
const homeLink = document.getElementById("home-link");
const bookingLink = document.getElementById("booking-link");
const bookNowBtn = document.getElementById("book-now-btn");
const logo = document.getElementById("logo");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const bookingPage = document.getElementById("booking-page");
const heroSection = document.getElementById("hero");
const featuredHotels = document.getElementById("featured-hotels");
const bookingOptions = document.querySelectorAll(".booking-option");
const bookingContent = document.querySelector(
  ".booking-content .content-inner"
);
const bookingFormContainer = document.getElementById("booking-form-container");
const viewButtons = document.querySelectorAll(".view-btn");
const confirmBookingBtn = document.getElementById("confirm-booking");
const allSections = document.querySelectorAll("section");
const footer = document.getElementById("footer");

const allNavItems = document.querySelectorAll(".nav-links li");
const sectionLinks = document.querySelectorAll(
  '.nav-links a[href^="#"]:not(#home-link):not(#booking-link)'
);

// ======..........................===
// Fake Hotel Data
// ==..........................=======
const hotels = {
  dhaka: {
    name: "RoyalStay Dhaka",
    description: "Located in the heart of the capital city...",
    image: "./Images/Hotel/8.jpg",
    rating: "★★★★☆",
    rooms: [
      { type: "Standard Room", price: 8000 },
      { type: "Deluxe Room", price: 12000 },
      { type: "Executive Suite", price: 18000 },
      { type: "Presidential Suite", price: 25000 },
    ],
  },
  chittagong: {
    name: "RoyalStay Chittagong",
    description: "Overlooking the Bay of Bengal...",
    image: "./Images/Hotel/15.jpg",
    rating: "★★★★★",
    rooms: [
      { type: "Standard Room", price: 7500 },
      { type: "Ocean View Room", price: 11000 },
      { type: "Family Suite", price: 16000 },
      { type: "Penthouse", price: 22000 },
    ],
  },
  sylhet: {
    name: "RoyalStay Sylhet",
    description: "Nestled in the lush tea gardens...",
    image: "./Images/Hotel/5.jpg",
    rating: "★★★★☆",
    rooms: [
      { type: "Garden View Room", price: 7000 },
      { type: "Tea Garden Suite", price: 10000 },
      { type: "Luxury Villa", price: 15000 },
    ],
  },
  "cox's bazar": {
    name: "RoyalStay Cox's Bazar",
    description: "Steps away from the world's longest beach...",
    image: "./Images/Hotel/6.jpg",
    rating: "★★★★★",
    rooms: [
      { type: "Standard Room", price: 9000 },
      { type: "Beachfront Room", price: 13000 },
      { type: "Honeymoon Suite", price: 20000 },
    ],
  },
};

// =========..........................
// Initializing  SLIDER
// =====..........................====
function initializeSliders() {
  if (typeof $.fn.slick !== "function") {
    console.warn("Slick slider not loaded");
    return;
  }

  $(".leisure").slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    cssEase: "linear",
    adaptiveHeight: true,
  });

  $(".wellness").slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2400,
    pauseOnHover: false,
    cssEase: "linear",
    adaptiveHeight: true,
  });

  $(".culinary").slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2800,
    pauseOnHover: false,
    cssEase: "linear",
    adaptiveHeight: true,
  });

  $(".butler-services").slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3200,
    pauseOnHover: false,
    cssEase: "linear",
    adaptiveHeight: true,
  });

  $(".event-venues").slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3600,
    pauseOnHover: false,
    cssEase: "linear",
    adaptiveHeight: true,
  });
}

// =========..........................
// NAVIGATION FUNCTIONS
// ======..........................===
function hideAllSections() {
  allSections.forEach((section) => {
    if (section.id !== "booking-page") {
      section.style.display = "none";
    }
  });
}

function showAllSections() {
  allSections.forEach((section) => {
    section.style.display = "";
  });
  bookingPage.style.display = "none";
  heroSection.style.display = "flex";
  featuredHotels.style.display = "block";
}

function hideSectionNavLinks() {
  sectionLinks.forEach((link) => {
    link.parentElement.style.display = "none";
  });
}

function showSectionNavLinks() {
  sectionLinks.forEach((link) => {
    link.parentElement.style.display = "";
  });
}

function showBookingPage(selectedLocation = null) {
  hideAllSections();
  bookingPage.style.display = "block";
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  document.querySelectorAll(".nav-links li a").forEach((link) => {
    link.classList.remove("active");
  });
  bookingLink.classList.add("active");
  hideSectionNavLinks();

  initializeBookingPage(selectedLocation);
}

function showHomePage() {
  showAllSections();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  showSectionNavLinks();

  document.querySelectorAll(".nav-links li a").forEach((link) => {
    link.classList.remove("active");
  });
  homeLink.classList.add("active");
}

// .........................
// BOOKING PAGE FUNCTIONS
// ....................
function initializeBookingPage(selectedLocation = null) {
  const defaultLocation = selectedLocation || "dhaka";

  bookingOptions.forEach((option) => {
    option.classList.remove("active");
    if (option.dataset.location === defaultLocation) {
      option.classList.add("active");
    }
  });

  showLocationDetails(defaultLocation);
}

function showLocationDetails(location) {
  document.querySelectorAll(".hotel-details").forEach((detail) => {
    detail.classList.remove("active");
  });

  const selectedHotel = document.querySelector(
    `.hotel-details[data-location="${location}"]`
  );
  if (selectedHotel) {
    selectedHotel.classList.add("active");
  }

  bookingFormContainer.style.display = "none";
  document.querySelector(".default-content").style.display = selectedHotel
    ? "none"
    : "block";
}

function showBookingForm(location) {
  const hotel = hotels[location];
  const roomTypeSelect = document.getElementById("room-type");

  roomTypeSelect.style.minWidth = "100%";
  roomTypeSelect.style.width = "auto";

  roomTypeSelect.innerHTML = "";
  hotel.rooms.forEach((room) => {
    const option = document.createElement("option");
    option.value = `${room.type} - ৳${room.price.toLocaleString()}`;
    option.textContent = `${room.type} - ৳${room.price.toLocaleString()}/night`;
    option.dataset.price = room.price;
    roomTypeSelect.appendChild(option);
  });

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  document.getElementById("check-in").valueAsDate = today;
  document.getElementById("check-out").valueAsDate = tomorrow;

  bookingFormContainer.style.display = "block";

  ["room-type", "adults", "children", "check-in", "check-out"].forEach((id) => {
    document.getElementById(id).addEventListener("change", updatePriceSummary);
  });

  updatePriceSummary();
  bookingFormContainer.scrollIntoView({ behavior: "smooth" });
}

function calculateNights(checkIn, checkOut) {
  const oneDay = 24 * 60 * 60 * 1000;
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkOutDate <= checkInDate) {
    checkOutDate.setDate(checkInDate.getDate() + 1);
    document.getElementById("check-out").valueAsDate = checkOutDate;
    return 1;
  }

  return Math.round(Math.abs((checkOutDate - checkInDate) / oneDay)) || 1;
}

function calculateRooms(adults) {
  return Math.ceil(adults / 2);
}

function updatePriceSummary() {
  const roomTypeSelect = document.getElementById("room-type");
  const adults = parseInt(document.getElementById("adults").value) || 1;
  const children = parseInt(document.getElementById("children").value) || 0;
  const checkIn = document.getElementById("check-in").value;
  const checkOut = document.getElementById("check-out").value;

  if (!checkIn || !checkOut || !roomTypeSelect.value) return;

  const nights = calculateNights(checkIn, checkOut);
  const roomsNeeded = calculateRooms(adults);
  const selectedOption = roomTypeSelect.options[roomTypeSelect.selectedIndex];
  const roomPrice = parseInt(selectedOption.dataset.price) || 0;
  const totalCost = roomsNeeded * roomPrice * nights;

  document.getElementById(
    "room-rate"
  ).textContent = `৳${roomPrice.toLocaleString()}`;
  document.getElementById("nights-count").textContent = nights;
  document.getElementById("total-rooms").textContent = roomsNeeded;
  document.getElementById(
    "total-cost"
  ).textContent = `৳${totalCost.toLocaleString()}`;
}

// =========..........................
// FORM NOTIFICATION SYSTEM
// =========..........................
function initializeFormNotifications() {
  const form = document.querySelector(".cta-form");
  if (!form) return;

  // Create notification element
  const notification = document.createElement("div");
  notification.className = "form-notification hidden";
  document.body.appendChild(notification);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading state
    const submitButton = form.querySelector(".cta_button");
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // Use Netlify's native form handling
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        showNotification(
          "Thank you! Your message has been sent successfully.",
          "success"
        );
        form.reset();
      })
      .catch((error) => {
        showNotification(
          "Oops! Something went wrong. Please try again later.",
          "error"
        );
        console.error("Form submission error:", error);
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      });
  });

  function showNotification(message, type) {
    const notification = document.querySelector(".form-notification");
    notification.textContent = message;
    notification.className = `form-notification ${type} show`;

    // Hide after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show");
    }, 5000);
  }
}

// =========..........................
// EVENT LISTENERS
// =========..........................
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  const activeLocation = document.querySelector(".booking-option.active")
    ?.dataset.location;
  sessionStorage.setItem("lastSelectedLocation", activeLocation || "dhaka");
  showHomePage();
});

bookingLink.addEventListener("click", (e) => {
  e.preventDefault();
  const lastLocation =
    sessionStorage.getItem("lastSelectedLocation") || "dhaka";
  showBookingPage(lastLocation);
});

bookNowBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const lastLocation =
    sessionStorage.getItem("lastSelectedLocation") || "dhaka";
  showBookingPage(lastLocation);
});

logo.addEventListener("click", (e) => {
  e.preventDefault();
  showHomePage();
});

viewButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const location = this.closest(".hotel-card").dataset.location;
    showBookingPage(location);
  });
});

bookingOptions.forEach((option) => {
  option.addEventListener("click", function () {
    bookingOptions.forEach((opt) => opt.classList.remove("active"));
    this.classList.add("active");
    const location = this.dataset.location;
    showLocationDetails(location);
    sessionStorage.setItem("lastSelectedLocation", location);
  });
});

confirmBookingBtn.addEventListener("click", function () {
  const location = document.querySelector(
    ".booking-option.active h3"
  ).textContent;
  const checkIn = document.getElementById("check-in").value;
  const checkOut = document.getElementById("check-out").value;
  const roomType = document.getElementById("room-type").value.split(" - ")[0];
  const adults = document.getElementById("adults").value;
  const children = document.getElementById("children").value;
  const totalCost = document.getElementById("total-cost").textContent;
  const nights = document.getElementById("nights-count").textContent;
  const roomsNeeded = document.getElementById("total-rooms").textContent;
  const roomRate = document.getElementById("room-rate").textContent;

  alert(
    `Booking confirmed!\n\nLocation: ${location}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nRoom Type: ${roomType}\nAdults: ${adults}\nChildren: ${children}\n\nPrice Details:\n- Room Rate: ${roomRate}/night\n- Rooms Needed: ${roomsNeeded}\n- Nights: ${nights}\n\nTotal Cost: ${totalCost}`
  );
});

// Create hotel details elements
Object.keys(hotels).forEach((location) => {
  const hotel = hotels[location];
  const hotelElement = document.createElement("div");
  hotelElement.className = "hotel-details";
  hotelElement.dataset.location = location;
  hotelElement.innerHTML = `
    <img src="${hotel.image}" alt="${hotel.name}">
    <h3>${hotel.name}</h3>
    <div class="rating">${hotel.rating}</div>
    <p>${hotel.description}</p>
    <button class="btn view-rooms-btn">View Rooms & Book</button>
  `;
  bookingContent.appendChild(hotelElement);

  hotelElement
    .querySelector(".view-rooms-btn")
    .addEventListener("click", () => {
      showBookingForm(location);
    });
});

// =====================
// INITIALIZATION
// =====================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".year").textContent = new Date().getFullYear();

  // Initialize sliders after ensuring jQuery and Slick are loaded
  if (typeof jQuery !== "undefined" && typeof $.fn.slick !== "undefined") {
    initializeSliders();
  } else {
    console.warn("jQuery or Slick slider not loaded - sliders won't work");
  }

  // Initialize form notifications
  initializeFormNotifications();

  const lastLocation =
    sessionStorage.getItem("lastSelectedLocation") || "dhaka";
  if (
    window.location.hash === "#booking" ||
    bookingLink.classList.contains("active")
  ) {
    showBookingPage(lastLocation);
  } else {
    showHomePage();
  }
});
