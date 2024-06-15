// // NOT implemented in the project, work in progress, basically to animate elements on scroll, but kinda laggy

// let elements;

// function checkPosition() {
//   // Select all the elements with the specified IDs and classes
//   elements = document.querySelectorAll('#home-about-section, #v-review, #vogue-text, #cc-title, .card-container, .newsletter-container'); // replace with your IDs and classes

//   // Iterate over each element
//   elements.forEach(element => {
//     // If the element has already been animated, skip it
//     if(element.classList.contains('fade-and-move-up')) {
//       return;
//     }

//     // Get the position of the element relative to the viewport
//     const position = element.getBoundingClientRect();

//     // Check whether the element is in the viewport
//     if(position.top <= window.innerHeight && position.bottom >= 0) {
//       // Add the 'fade-and-move-up' class to animate the element
//       element.classList.add('fade-and-move-up');
//     }
//   });

//   // Request the next frame
//   requestAnimationFrame(checkPosition);
// }

// // Start the animation
// requestAnimationFrame(checkPosition);
let elements = document.querySelectorAll('.animate-on-scroll');

let observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

elements.forEach(element => {
  observer.observe(element);
});