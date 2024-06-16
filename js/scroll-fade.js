// Select all elements with the class "animate-on-scroll"
let elements = document.querySelectorAll('.animate-on-scroll');

// Create an IntersectionObserver object to track when elements come into view
let observer = new IntersectionObserver((entries) => {
  // For each entry in the observer
  entries.forEach(entry => {
    // If the entry is currently intersecting the viewport
    if(entry.isIntersecting) {
      // Add the class "visible" to the target element
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// For each element in the selected elements
elements.forEach(element => {
  // Observe the element using the IntersectionObserver
  observer.observe(element);
});