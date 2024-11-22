// Get all the navigation buttons, slides, and images
const navButtons = document.querySelectorAll(".nav-btn");
const slides = document.querySelector(".slides");
const heroImages = document.querySelectorAll(".hero-img");

// Function to update image source based on screen size
function updateImagesForSmallScreens() {
  if (window.innerWidth < 800) {
    heroImages.forEach((img, index) => {
      // Change image source based on index for smaller screens
      img.src = `../Assets/${index + 1}-hero-img-resized.jpg`; // Adjust based on index
    });
  } else {
    // Reset image source to original images for larger screens
    heroImages.forEach((img, index) => {
      img.src = `../Assets/${index + 1}-hero-img.jpg`; // Reset to original images
    });
  }
}

// Function to change the slide based on the clicked button
navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = button.getAttribute("data-index");

    // Update the active button style
    navButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Move the slides to the selected index
    slides.style.transform = `translateX(-${index * 100}%)`;
  });
});

// Listen for window resize event to update images
window.addEventListener("resize", updateImagesForSmallScreens);

// Initial image update based on screen size
updateImagesForSmallScreens();

// js for sliding of items
document.addEventListener("DOMContentLoaded", function () {
  const shopNowSection = document.querySelector(".shop-now-section");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");
  const items = Array.from(document.querySelectorAll(".shop-now-section a"));
  const totalItems = items.length;
  let currentIndex = 0;

  const mediaQuery = window.matchMedia("(max-width: 1050px)"); // Change the width as needed for small screens
  let cloned = false; // Track whether items are cloned or not

  // Function to clone items for small screens
  function cloneItemsForSmallScreens() {
    if (mediaQuery.matches && !cloned) {
      const firstClone = items[0].cloneNode(true);
      const lastClone = items[totalItems - 1].cloneNode(true);

      // Append and prepend clones
      shopNowSection.appendChild(firstClone);
      shopNowSection.insertBefore(lastClone, items[0]);

      cloned = true; // Mark as cloned
    }
  }

  // Function to reset items when on larger screens
  function resetItemsForLargeScreens() {
    if (!mediaQuery.matches && cloned) {
      // Remove clones if they exist and reset carousel
      shopNowSection.removeChild(shopNowSection.lastChild); // Remove the last clone
      shopNowSection.removeChild(shopNowSection.firstChild); // Remove the first clone
      cloned = false; // Mark as not cloned

      // Reset the position to show the first actual item
      shopNowSection.style.transition = "none";
      shopNowSection.style.transform = "translateX(0)";
      setTimeout(() => {
        shopNowSection.style.transition = "transform 0.3s ease";
      }, 50);
    }
  }

  // Function to update the carousel
  function updateCarousel() {
    const itemWidth = items[0].offsetWidth + 20; // Calculate item width with margin
    const offset = -currentIndex * itemWidth;
    shopNowSection.style.transition = "transform 0.3s ease";
    shopNowSection.style.transform = `translateX(${offset}px)`;
  }

  // Show the next set of items
  function showNextItem() {
    currentIndex++;
    updateCarousel();

    // When we reach the last item (which is a clone), reset the carousel position to avoid duplicates
    if (currentIndex === totalItems) {
      setTimeout(() => {
        shopNowSection.style.transition = "none";
        currentIndex = 1; // Set to first item (skip clone)
        shopNowSection.style.transform = `translateX(${-items[0]
          .offsetWidth}px)`;
        setTimeout(() => {
          shopNowSection.style.transition = "transform 0.3s ease";
        }, 50);
      }, 300);
    }
  }

  // Show the previous set of items
  function showPrevItem() {
    currentIndex--;
    updateCarousel();

    // When we reach the first item (which is a clone), reset the carousel position
    if (currentIndex === -1) {
      setTimeout(() => {
        shopNowSection.style.transition = "none";
        currentIndex = totalItems - 2; // Skip to last actual item
        shopNowSection.style.transform = `translateX(${
          -items[0].offsetWidth * currentIndex
        }px)`;
        setTimeout(() => {
          shopNowSection.style.transition = "transform 0.3s ease";
        }, 50);
      }, 300);
    }
  }

  // Event listeners for chevron buttons
  leftBtn.addEventListener("click", showPrevItem);
  rightBtn.addEventListener("click", showNextItem);

  // Automatically move to the next item every 3 seconds
  setInterval(() => {
    if (mediaQuery.matches) {
      showNextItem();
    }
  }, 3000);

  // Handle window resize to adjust behavior for small and large screens
  function handleResize() {
    cloneItemsForSmallScreens(); // Clone items for small screens
    resetItemsForLargeScreens(); // Remove clones and reset for large screens
  }

  // Add resize event listener
  window.addEventListener("resize", handleResize);

  // Call the clone function initially
  cloneItemsForSmallScreens();
  handleResize(); // Ensure it's set correctly on page load
});
