// by: Kriston
// taken from Github by itzzmerov

// Select the toggle button element
const toggleBtn = document.querySelector('.toggle_btn');

// Select the icon element inside the toggle button
const toggleBtnIcon = document.querySelector('.toggle_btn i');

// Select the dropdown menu element
const dropDownMenu = document.querySelector('.dropdown_menu');

// Select all social icons
const socialIcons = document.querySelectorAll('.socials i');

// Get the tooltip element
const tooltip = document.getElementById('tooltip');

// Check if elements exist to prevent errors
if (toggleBtn && toggleBtnIcon && dropDownMenu) {
    toggleBtn.addEventListener('click', function () {
        // Toggle the dropdown menu
        dropDownMenu.classList.toggle('open');
        
        // Change the icon based on menu state
        const isOpen = dropDownMenu.classList.contains('open');
        toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        
        // Prevent body scrolling when menu is open
        document.body.classList.toggle('no-scroll', isOpen);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!dropDownMenu.contains(e.target) && 
            !toggleBtn.contains(e.target) && 
            dropDownMenu.classList.contains('open')) {
            
            // Close the menu
            dropDownMenu.classList.remove('open');
            toggleBtnIcon.className = 'fa-solid fa-bars';
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && dropDownMenu.classList.contains('open')) {
            // Close the menu
            dropDownMenu.classList.remove('open');
            toggleBtnIcon.className = 'fa-solid fa-bars';
            document.body.classList.remove('no-scroll');
        }
    });
}

// Transparent navbar on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 50) {
            navbar.classList.add('transparent');
        } else {
            navbar.classList.remove('transparent');
        }
    }
});

// Add event listeners for showing and hiding the tooltip
socialIcons.forEach((icon) => {
    icon.addEventListener('mouseenter', (event) => {
        // Get the website name from the icon's ID
        const websiteName = event.target.id;

        // Set the tooltip content and position it at the bottom of the mouse
        tooltip.innerText = websiteName;
        tooltip.style.display = 'block';
        tooltip.style.left = event.clientX + 'px';
        tooltip.style.top = event.clientY + 20 + 'px';
    });

    icon.addEventListener('mouseleave', () => {
        // Hide the tooltip when the mouse leaves the icon
        tooltip.style.display = 'none';
    });
});