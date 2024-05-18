window.addEventListener('scroll', function() {
    // For 'home-about-section'
    const elementAbout = document.getElementById('home-about-section');
    const positionAbout = elementAbout.getBoundingClientRect();

    if(positionAbout.top >= 0 && positionAbout.bottom <= window.innerHeight) {
        elementAbout.classList.add('fade-and-move-up');
    }
});