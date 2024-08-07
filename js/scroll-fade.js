let elements = document.querySelectorAll('.animate-on-scroll');

// IntersectionObserver object to track when elements come into view.
let observer = new IntersectionObserver((entries) => {
  // Loop through each element being observed.
  entries.forEach(entry => {
    // Check if in view.
    if (entry.isIntersecting) {
      // Use requestAnimationFrame to add class in sync with browser's repaint
      requestAnimationFrame(() => {
        entry.target.classList.add('visible');
      });
      // Stop observing if visible.
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 }); // Lower threshold earlier triggers.

// Start observing each element in the selected elements.
elements.forEach(element => {
  observer.observe(element);
});
