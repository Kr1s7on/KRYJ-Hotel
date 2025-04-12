// by: Kriston
// taken from MDBootstrap

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the button
    const backToTopButton = document.getElementById('btn-back-to-top');
    
    if (backToTopButton) {
        // When the user scrolls down 300px from the top of the document, show the button
        window.addEventListener('scroll', function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopButton.style.display = 'block';
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.style.opacity = '0';
                // Hide the button after the opacity transition
                setTimeout(() => {
                    if (document.body.scrollTop <= 300 && document.documentElement.scrollTop <= 300) {
                        backToTopButton.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // When the user clicks on the button, scroll to the top of the document with smooth animation
        backToTopButton.addEventListener('click', function() {
            // For modern browsers
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // For older browsers that don't support smooth scrolling
            function scrollToTop(duration) {
                const start = window.pageYOffset;
                const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
                
                function scroll() {
                    const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
                    const elapsed = currentTime - startTime;
                    
                    window.scrollTo(0, start * (1 - Math.min(elapsed / duration, 1)));
                    
                    if (elapsed < duration) {
                        requestAnimationFrame(scroll);
                    }
                }
                
                requestAnimationFrame(scroll);
            }
            
            // If smooth scrolling is not supported
            if (!('scrollBehavior' in document.documentElement.style)) {
                scrollToTop(500);
            }
        });
    }
});