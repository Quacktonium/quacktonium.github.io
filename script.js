// Toggle Menu Function
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Carousel Functions
const slideIntervals = {};

// Function to show a specific slide
function showSlide(carouselId, index) {
  const carousel = document.getElementById(carouselId);
  const slides = carousel.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;

  let currentIndex = index;
  if (currentIndex >= totalSlides) currentIndex = 0;
  if (currentIndex < 0) currentIndex = totalSlides - 1;

  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === currentIndex) slide.classList.add('active');
  });

  const carouselInner = carousel.querySelector('.carousel-inner');
  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

  carousel.dataset.currentIndex = currentIndex;
}

// Function to show the next slide
function nextSlide(carouselId) {
  const carousel = document.getElementById(carouselId);
  let currentIndex = parseInt(carousel.dataset.currentIndex, 10);
  currentIndex++;
  showSlide(carouselId, currentIndex);
}

// Function to show the previous slide
function prevSlide(carouselId) {
  const carousel = document.getElementById(carouselId);
  let currentIndex = parseInt(carousel.dataset.currentIndex, 10);
  currentIndex--;
  showSlide(carouselId, currentIndex);
}

// Function to start auto sliding
function startAutoSlide(carouselId) {
  slideIntervals[carouselId] = setInterval(() => {
    nextSlide(carouselId);
  }, 3000); // Change slide every 3 seconds
}

// Function to stop auto sliding
function stopAutoSlide(carouselId) {
  clearInterval(slideIntervals[carouselId]);
}

// Initialize carousels on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const carouselId = carousel.id;
    carousel.dataset.currentIndex = 0;
    showSlide(carouselId, 0);
    startAutoSlide(carouselId);

    carousel.addEventListener('mouseover', () => stopAutoSlide(carouselId));
    carousel.addEventListener('mouseout', () => startAutoSlide(carouselId));
  });
});
