document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Store data in local storage
    localStorage.setItem('contactFormData', JSON.stringify({ name, email, subject, message }));

    // Redirect to confirmation page
    window.location.href = 'contact-confirmation.html';
});
