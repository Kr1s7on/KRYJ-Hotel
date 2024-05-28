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

// Add a click event listener to the toggle button
toggleBtn.onclick = function() {
    // Toggle the 'open' class on the dropdown menu
    dropDownMenu.classList.toggle('open');

    // Check if the dropdown menu is open
    const isOpen = dropDownMenu.classList.contains('open');

    // Change the icon based on whether the dropdown menu is open or closed
    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

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