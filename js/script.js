// DOM Elements
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

// Temporary Hotel Data Gonna fix later
const hotels = {
  dhaka: {
    name: "RoyalStay Dhaka",
    description:
      "Located in the heart of the capital city, our Dhaka property offers luxury accommodations with stunning city views. Enjoy our world-class amenities including a rooftop pool, spa, and multiple dining options.",
    image: "https://source.unsplash.com/random/800x600/?hotel,dhaka",
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
    description:
      "Overlooking the Bay of Bengal, our Chittagong hotel combines coastal charm with modern luxury. Relax in our beachfront rooms and enjoy fresh seafood at our signature restaurant.",
    image: "https://source.unsplash.com/random/800x600/?hotel,chittagong",
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
    description:
      "Nestled in the lush tea gardens of Sylhet, our resort offers a tranquil escape. Experience the beauty of nature while enjoying our premium services and authentic local cuisine.",
    image: "https://source.unsplash.com/random/800x600/?hotel,sylhet",
    rating: "★★★★☆",
    rooms: [
      { type: "Garden View Room", price: 7000 },
      { type: "Tea Garden Suite", price: 10000 },
      { type: "Luxury Villa", price: 15000 },
    ],
  },
  "cox's bazar": {
    name: "RoyalStay Cox's Bazar",
    description:
      "Steps away from the world's longest beach, our Cox's Bazar property offers breathtaking ocean views. Enjoy water sports, spa treatments, and romantic beachside dining.",
    image: "https://source.unsplash.com/random/800x600/?hotel,cox's-bazar",
    rating: "★★★★★",
    rooms: [
      { type: "Standard Room", price: 9000 },
      { type: "Beachfront Room", price: 13000 },
      { type: "Honeymoon Suite", price: 20000 },
    ],
  },
};

// Mobile menu toggle
hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// To show booking page with selected location
function showBookingPage(selectedLocation = null) {
  heroSection.style.display = "none";
  featuredHotels.style.display = "none";
  bookingPage.style.display = "block";
  window.scrollTo(0, 0);

  // Updating active nav link
  document.querySelectorAll(".nav-links li a").forEach((link) => {
    link.classList.remove("active");
  });
  bookingLink.classList.add("active");

  // Initializing booking page with selection
  initializeBookingPage(selectedLocation);
}

// To show home page
function showHomePage() {
  heroSection.style.display = "flex";
  featuredHotels.style.display = "block";
  bookingPage.style.display = "none";
  window.scrollTo(0, 0);

  // Updating active nav link
  document.querySelectorAll(".nav-links li a").forEach((link) => {
    link.classList.remove("active");
  });
  homeLink.classList.add("active");
}

// Navigation event listeners
homeLink.addEventListener("click", function () {
  // Storing current selection before leaving
  const activeLocation = document.querySelector(".booking-option.active")
    ?.dataset.location;
  sessionStorage.setItem("lastSelectedLocation", activeLocation);
  showHomePage();
  return false;
});

bookingLink.addEventListener("click", function () {
  const lastLocation = sessionStorage.getItem("lastSelectedLocation");
  showBookingPage(lastLocation);
  return false;
});

bookNowBtn.addEventListener("click", function () {
  const lastLocation = sessionStorage.getItem("lastSelectedLocation");
  showBookingPage(lastLocation);
  return false;
});

logo.addEventListener("click", function () {
  showHomePage();
  return false;
});

// View buttons on hotel cards
viewButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const location = this.closest(".hotel-card").dataset.location;
    showBookingPage(location);
  });
});

// Creating hotel details elements for each location
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

  // Adding click handler for view rooms button
  hotelElement
    .querySelector(".view-rooms-btn")
    .addEventListener("click", function () {
      showBookingForm(location);
    });
});

// Initializing booking page with selection
function initializeBookingPage(selectedLocation = null) {
  const defaultLocation = selectedLocation || "dhaka";

  // Removing active class from all options
  document.querySelectorAll(".booking-option").forEach((option) => {
    option.classList.remove("active");
  });

  // Setting active class on selected/default option
  document
    .querySelector(`.booking-option[data-location="${defaultLocation}"]`)
    .classList.add("active");
  showLocationDetails(defaultLocation);
}

// Booking option click handler
bookingOptions.forEach((option) => {
  option.addEventListener("click", function () {
    // Removing active class from all options
    bookingOptions.forEach((opt) => opt.classList.remove("active"));

    // Adding active class to clicked option
    this.classList.add("active");

    const location = this.dataset.location;
    showLocationDetails(location);

    // Storing selection
    sessionStorage.setItem("lastSelectedLocation", location);
  });
});

// To show location details
function showLocationDetails(location) {
  // Hiding all hotel details
  document.querySelectorAll(".hotel-details").forEach((detail) => {
    detail.classList.remove("active");
  });

  // Showing selected hotel details
  const selectedHotel = document.querySelector(
    `.hotel-details[data-location="${location}"]`
  );
  if (selectedHotel) {
    selectedHotel.classList.add("active");
  }

  // Hiding booking form by default
  bookingFormContainer.style.display = "none";

  // Showing default content if no hotel selected
  document.querySelector(".default-content").style.display = selectedHotel
    ? "none"
    : "block";
}

// To show booking form with calculations
function showBookingForm(location) {
  const hotel = hotels[location];
  const roomTypeSelect = document.getElementById("room-type");

  // Clearing previous options
  roomTypeSelect.innerHTML = "";

  // Adding new options
  hotel.rooms.forEach((room) => {
    const option = document.createElement("option");
    option.value = `${room.type} - ৳${room.price.toLocaleString()}`;
    option.textContent = `${room.type} - ৳${room.price.toLocaleString()}/night`;
    option.dataset.price = room.price;
    roomTypeSelect.appendChild(option);
  });

  // Setting default dates (today and tomorrow)
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  document.getElementById("check-in").valueAsDate = today;
  document.getElementById("check-out").valueAsDate = tomorrow;

  // Showing the form
  bookingFormContainer.style.display = "block";

  // Adding event listeners for dynamic calculation
  document
    .getElementById("room-type")
    .addEventListener("change", updatePriceSummary);
  document
    .getElementById("adults")
    .addEventListener("change", updatePriceSummary);
  document
    .getElementById("children")
    .addEventListener("change", updatePriceSummary);
  document
    .getElementById("check-in")
    .addEventListener("change", updatePriceSummary);
  document
    .getElementById("check-out")
    .addEventListener("change", updatePriceSummary);

  // Initial calculation
  updatePriceSummary();

  // Scrolling to form
  bookingFormContainer.scrollIntoView({ behavior: "smooth" });
}

// Calculating nights between dates
function calculateNights(checkIn, checkOut) {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(checkIn);
  const secondDate = new Date(checkOut);
  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

// Calculating rooms needed based on adults
function calculateRooms(adults) {
  return Math.ceil(adults / 2);
}

// Updating price summary display
function updatePriceSummary() {
  const roomTypeSelect = document.getElementById("room-type");
  const adults = parseInt(document.getElementById("adults").value) || 1;
  const children = parseInt(document.getElementById("children").value) || 0;
  const checkIn = document.getElementById("check-in").value;
  const checkOut = document.getElementById("check-out").value;

  if (!checkIn || !checkOut || !roomTypeSelect.value) return;

  const nights = calculateNights(checkIn, checkOut);
  const roomsNeeded = calculateRooms(adults);
  const roomPrice =
    parseInt(roomTypeSelect.value.split("৳")[1].replace(/,/g, "")) || 0;

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

// Confirm booking button
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
    `Booking confirmed!\n\n` +
      `Location: ${location}\n` +
      `Check-in: ${checkIn}\n` +
      `Check-out: ${checkOut}\n` +
      `Room Type: ${roomType}\n` +
      `Adults: ${adults}\n` +
      `Children: ${children}\n\n` +
      `Price Details:\n` +
      `- Room Rate: ${roomRate}/night\n` +
      `- Rooms Needed: ${roomsNeeded}\n` +
      `- Nights: ${nights}\n\n` +
      `Total Cost: ${totalCost}`
  );
});

// Initial page load
document.addEventListener("DOMContentLoaded", function () {
  const lastLocation = sessionStorage.getItem("lastSelectedLocation");
  if (
    window.location.hash === "#booking" ||
    document.querySelector(".nav-booking").classList.contains("active")
  ) {
    showBookingPage(lastLocation);
  }
});
