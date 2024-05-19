window.addEventListener('scroll', function() {
    // Select all the elements with the specified IDs and classes
    const elements = document.querySelectorAll('#home-about-section, #v-review, #vogue-text, #cc-title, .card-container, .newsletter-container'); // replace with your IDs and classes
  
    // Iterate over each element
    elements.forEach(element => {
      // If the element has already been animated, skip it
      if(element.classList.contains('fade-and-move-up')) {
        return;
      }
  
      // Get the position of the element relative to the viewport
      const position = element.getBoundingClientRect();
  
      // Check whether the element is in the viewport
      if(position.top <= window.innerHeight && position.bottom >= 0) {
        // Add the 'fade-and-move-up' class to animate the element
        element.classList.add('fade-and-move-up');
      }
    });
  });
