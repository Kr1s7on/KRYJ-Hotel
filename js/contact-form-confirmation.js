// Retrieve data from local storage
const contactFormData = JSON.parse(localStorage.getItem('contactFormData'));

if (contactFormData) {
    const confirmationDetails = `
        <p><strong>Name:</strong> ${contactFormData.name}</p>
        <p><strong>Email:</strong> ${contactFormData.email}</p>
        <p><strong>Subject:</strong> ${contactFormData.subject}</p>
        <p><strong>Message:</strong> ${contactFormData.message}</p>
    `;
    document.getElementById('confirmationDetails').innerHTML = confirmationDetails;

    // Clear the local storage
    localStorage.removeItem('contactFormData');
}

else {
    const noDataElement = document.createElement('p');
    noDataElement.className = 'alert alert-danger';
    noDataElement.innerText = 'No data found.';
    document.getElementById('confirmationDetails').appendChild(noDataElement);
}