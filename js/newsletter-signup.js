// by: Kriston

document.getElementById('newsletter-form').addEventListener('submit', function (event) {

    // Prevent the default form submission
    event.preventDefault();
    
    // Get the email from the input
    const email = document.getElementById('newsletter-email').value;
    
    // Store the email in local storage
    localStorage.setItem('newsletterEmail', email);
    
    // Provide feedback to the user
    alert('Thank you for subscribing!');
    
    // Clear the input field
    document.getElementById('newsletter-email').value = '';
});