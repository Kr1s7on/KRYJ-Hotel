// by: Kriston

window.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader');
  const websiteContent = document.body;

  // Trigger fade-out animation for preloader
  preloader.classList.add('fade-out');
  websiteContent.classList.add('visible'); // Start website fade-in

  // Wait for the fade-out animation to complete before removing preloader
  setTimeout(() => {
    if (preloader.parentNode) {
      preloader.parentNode.removeChild(preloader);
    }
  }, 2000); // Delay to match the duration of the fade-out animation
});