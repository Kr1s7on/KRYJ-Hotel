// Scroll animation script
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements to animate
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 && 
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation with debounce
    let scrollTimeout;
    function handleScroll() {
        // Clear previous timeout
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        // Set new timeout using requestAnimationFrame for better performance
        scrollTimeout = window.requestAnimationFrame(function() {
            animatedElements.forEach(element => {
                if (isInViewport(element)) {
                    element.classList.add('visible');
                }
            });
        });
    }
    
    // Run once to check for elements already in view when page loads
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also check on window resize
    window.addEventListener('resize', handleScroll, { passive: true });
});
