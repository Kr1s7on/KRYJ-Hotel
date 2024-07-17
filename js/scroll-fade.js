// Select all elements with the class "animate-on-scroll"
let elements = document.querySelectorAll('.animate-on-scroll');

// Create an IntersectionObserver object to track when elements come into view
let observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Use requestAnimationFrame to add class in sync with browser's repaint
      requestAnimationFrame(() => {
        entry.target.classList.add('visible');
      });
      // Stop observing the element if it's already visible
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 }); // Increased threshold for less frequent, but earlier triggers

// For each element in the selected elements
elements.forEach(element => {
  observer.observe(element);
});