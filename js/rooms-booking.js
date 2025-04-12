// To check the room available or not and validate the form
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum dates for check-in and check-out
    const today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const arrivalDateInput = document.getElementById('Adate');
    const departureDateInput = document.getElementById('Edate');
    
    // Set minimum date for check-in to today
    arrivalDateInput.min = formatDate(today);
    
    // Set minimum date for check-out to tomorrow
    departureDateInput.min = formatDate(tomorrow);
    
    // When check-in date changes, update check-out date minimum
    arrivalDateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        let minDepartureDate = new Date(selectedDate);
        minDepartureDate.setDate(minDepartureDate.getDate() + 1);
        
        departureDateInput.min = formatDate(minDepartureDate);
        
        // If the current checkout date is before the new minimum date, update it
        if (new Date(departureDateInput.value) <= selectedDate) {
            departureDateInput.value = formatDate(minDepartureDate);
            // Trigger the input event to update pricing
            departureDateInput.dispatchEvent(new Event('input'));
        }
    });
});

document.getElementById('checkAvailable').addEventListener('click', function (event) {
    event.preventDefault();

    const Adate = document.getElementById('Adate').value;
    const Edate = document.getElementById('Edate').value;
    const room = document.getElementById('room').value;

    if (!Adate || !Edate || !room) {
        alert('Please fill in all required fields.');
        return;
    }

    if (new Date(Edate) <= new Date(Adate)) {
        alert('Check-out date must be after check-in date');
        return;
    }

    const bookingData = {
        arrivalDate: Adate,
        departureDate: Edate,
        roomType: room
    };

    function check_room_availability() {
        // For demonstration purposes - would normally check against a database
        return true;
    }

    let checkAvailability = check_room_availability();
    if (checkAvailability) {
        document.querySelector('.form-section').classList.add('hidden');
        document.querySelector('.form-container').classList.remove('hidden');
    }
    else {
        alert('Room not available. Please select another room type or date.');
    }

});

function saveFormData() {
    const bookingData = {
        arrivalDate: document.getElementById('Adate').value,
        departureDate: document.getElementById('Edate').value,
        roomType: document.getElementById('room').value
    };

    localStorage.setItem('bookingData', JSON.stringify(bookingData));
}

function populateFormData() {
    const savedData = localStorage.getItem('bookingData');
    if (savedData) {
        const bookingData = JSON.parse(savedData);
        document.getElementById('Adate').value = bookingData.arrivalDate;
        document.getElementById('Edate').value = bookingData.departureDate;
        document.getElementById('room').value = bookingData.roomType;
    }
}

// Call populateFormData on page load
document.addEventListener('DOMContentLoaded', populateFormData);

// Call saveFormData when the form is submitted or when the "go back" link is clicked
document.getElementById('go-back').addEventListener('click', saveFormData);

// Room pricing
const frPrice = 850;
const droomPrice = 875;
const deluxeRoomPrice = 700;
const rsPrice = 2000;
const psPrice = 4000;

// To dynamically display the selected room type, dates, and room image
document.addEventListener('DOMContentLoaded', () => {
    const arrivalDateInput = document.getElementById('Adate');
    const departureDateInput = document.getElementById('Edate');
    const roomTypeSelect = document.getElementById('room');

    const arrivalDateDisplay = document.getElementById('booking-arrival-date');
    const departureDateDisplay = document.getElementById('booking-departure-date');
    const roomTypeDisplay = document.getElementById('booking-room-type');
    const roomImage = document.getElementById('type-of-room-choosen');
    const priceDisplay = document.getElementById('booking-price');

    const roomImages = {
        'Family Room': 'assets/images/family-room/twin.jpg',
        'Duplex Room': 'assets/images/duplex-suite/bed.jpg',
        'Deluxe Room': 'assets/images/deluxe-room/sid-bed.jpg',
        'Renaissance Suite': 'assets/images/renaissance-suite/bed-side.jpg',
        'Presidential Suite': 'assets/images/pres-suite/bed.jpg'
    };

    function getDaysBetween(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    function updatePrice() {
        if (!arrivalDateInput.value || !departureDateInput.value || !roomTypeSelect.value) {
            return;
        }

        const days = getDaysBetween(arrivalDateInput.value, departureDateInput.value);
        let ratePerNight = 0;

        switch (roomTypeSelect.value) {
            case 'Family Room':
                ratePerNight = frPrice;
                break;
            case 'Duplex Room':
                ratePerNight = droomPrice;
                break;
            case 'Deluxe Room':
                ratePerNight = deluxeRoomPrice;
                break;
            case 'Renaissance Suite':
                ratePerNight = rsPrice;
                break;
            case 'Presidential Suite':
                ratePerNight = psPrice;
                break;
            default:
                ratePerNight = 0;
        }

        const totalPrice = days * ratePerNight;
        const vat = totalPrice * 0.07; // Assuming 7% VAT
        
        // Update all price displays with the correct element IDs
        document.getElementById('room-price').textContent = `SGD $${(totalPrice - vat).toFixed(2)}`;
        document.getElementById('tax').textContent = `SGD $${vat.toFixed(2)}`;
        document.getElementById('total-price').textContent = `SGD $${totalPrice.toFixed(2)}`;
    }

    arrivalDateInput.addEventListener('input', () => {
        arrivalDateDisplay.textContent = arrivalDateInput.value;
        updatePrice();
    });

    departureDateInput.addEventListener('input', () => {
        departureDateDisplay.textContent = departureDateInput.value;
        updatePrice();
    });

    roomTypeSelect.addEventListener('input', () => {
        const selectedRoomType = roomTypeSelect.options[roomTypeSelect.selectedIndex].value;
        roomTypeDisplay.textContent = roomTypeSelect.options[roomTypeSelect.selectedIndex].text;
        roomImage.src = roomImages[selectedRoomType];
        updatePrice();
    });

    // Initialize display on page load
    roomTypeSelect.dispatchEvent(new Event('input'));
});

// Form validation
const form = document.getElementById('payment-form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const cardNumber = document.getElementById('cardNum');
const cardName = document.getElementById('chname');
const cvv = document.getElementById('CVV');
const agreePolicy = document.getElementById('agreePolicy');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    if (validateInputs()) {
        // Send email confirmation using EmailJS
        let emailSent = await sendEmail();
        if (emailSent) {
            window.location.href = 'form-confirmation-page.html';
        } else {
            alert('There was an issue sending your confirmation email. Please try again.');
        }
    }
});

// Function to send confirmation email using EmailJS
function sendEmail() {
    return new Promise((resolve, reject) => {
        var templateParams = {
            to_name: document.getElementById('fname').value + ' ' + document.getElementById('lname').value,
            name: document.getElementById('fname').value,
            check_in_date: document.getElementById('Adate').value,
            check_out_date: document.getElementById('Edate').value,
            room_type: document.getElementById('room').options[document.getElementById('room').selectedIndex].text,
            to_email: document.getElementById('email').value,
        };

        console.log("Sending email with params:", templateParams); // Debug log

        // Using the service ID from your EmailJS dashboard
        emailjs.send('service_14l659g', 'template_tao0d9h', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                resolve(true);
            })
            .catch(function (error) {
                console.log('FAILED...', error);
                alert('Error: ' + JSON.stringify(error)); // More detailed error message
                resolve(false);
            });
    });
}

function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.remove('error');
}

function validateInputs() {
    const fnameValue = fname.value.trim();
    const lnameValue = lname.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const cardNumberValue = cardNumber.value.trim();
    const cardNameValue = cardName.value.trim();
    const cvvValue = cvv.value.trim();
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    // First Name validation
    if (fnameValue === '') {
        setError(fname, 'First Name cannot be empty');
        isValid = false;
    } else if (!nameRegex.test(fnameValue)) {
        setError(fname, 'First Name can only contain letters');
        isValid = false;
    } else {
        setSuccess(fname);
    }

    // Last Name validation
    if (lnameValue === '') {
        setError(lname, 'Last Name cannot be empty');
        isValid = false;
    } else if (!nameRegex.test(lnameValue)) {
        setError(lname, 'Last Name can only contain letters');
        isValid = false;
    } else {
        setSuccess(lname);
    }

    // Email validation
    if (emailValue === '') {
        setError(email, 'Email cannot be empty');
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        setError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        setSuccess(email);
    }

    // Phone validation
    if (phoneValue === '') {
        setError(phone, 'Phone number cannot be empty');
        isValid = false;
    } else if (!/^\d+$/.test(phoneValue)) {
        setError(phone, 'Phone number can only contain numbers');
        isValid = false;
    } else {
        setSuccess(phone);
    }

    // Card number validation
    if (cardNumberValue === '') {
        setError(cardNumber, 'Card number cannot be empty');
        isValid = false;
    } else {
        const cardNumWithoutSpace = cardNumberValue.replace(/\s/g, '');
        if (cardNumWithoutSpace.length !== 16 || !/^\d+$/.test(cardNumWithoutSpace)) {
            setError(cardNumber, 'Card number must be 16 digits');
            isValid = false;
        } else {
            setSuccess(cardNumber);
        }
    }

    // Card name validation
    if (cardNameValue === '') {
        setError(cardName, 'Card holder name cannot be empty');
        isValid = false;
    } else if (!nameRegex.test(cardNameValue)) {
        setError(cardName, 'Card holder name can only contain letters');
        isValid = false;
    } else {
        setSuccess(cardName);
    }

    // CVV validation
    if (cvvValue === '') {
        setError(cvv, 'CVV cannot be empty');
        isValid = false;
    } else if (!/^\d{3,4}$/.test(cvvValue)) {
        setError(cvv, 'CVV must be 3 or 4 digits');
        isValid = false;
    } else {
        setSuccess(cvv);
    }

    // Agreement policy validation
    if (!agreePolicy.checked) {
        setError(agreePolicy, 'You must agree to the privacy policy');
        isValid = false;
    } else {
        setSuccess(agreePolicy);
    }

    return isValid;
}

document.addEventListener('DOMContentLoaded', function() {
    // Form validation for the booking form
    const paymentForm = document.getElementById('payment-form');
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic validation
            const cardNumber = document.getElementById('cardnumber').value.trim();
            const cardName = document.getElementById('cardname').value.trim();
            const expMonth = document.getElementById('exp-month').value;
            const expYear = document.getElementById('exp-year').value;
            const cvv = document.getElementById('cvv').value.trim();
            
            let isValid = true;
            
            // Reset all error messages
            const errorElements = document.querySelectorAll('.error');
            errorElements.forEach(function(element) {
                element.textContent = '';
            });
            
            // Remove error class from input fields
            const inputFields = document.querySelectorAll('.input-field');
            inputFields.forEach(function(field) {
                field.classList.remove('error');
            });
            
            // Validate card number (should be numbers only and appropriate length)
            if (!/^\d{13,19}$/.test(cardNumber.replace(/\s/g, ''))) {
                document.getElementById('cardnumber-error').textContent = 'Please enter a valid card number';
                document.getElementById('cardnumber').parentElement.classList.add('error');
                isValid = false;
            }
            
            // Validate card holder name
            if (cardName.length < 3) {
                document.getElementById('cardname-error').textContent = 'Please enter the card holder name';
                document.getElementById('cardname').parentElement.classList.add('error');
                isValid = false;
            }
            
            // Validate expiration date
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1; // JS months are 0-indexed
            
            if (!expMonth || !expYear) {
                document.getElementById('exp-date-error').textContent = 'Please select an expiration date';
                document.getElementById('exp-month').parentElement.classList.add('error');
                isValid = false;
            } else if (parseInt(expYear) < currentYear || 
                      (parseInt(expYear) === currentYear && parseInt(expMonth) < currentMonth)) {
                document.getElementById('exp-date-error').textContent = 'Card has expired';
                document.getElementById('exp-month').parentElement.classList.add('error');
                isValid = false;
            }
            
            // Validate CVV (3-4 digits)
            if (!/^\d{3,4}$/.test(cvv)) {
                document.getElementById('cvv-error').textContent = 'Please enter a valid CVV code (3-4 digits)';
                document.getElementById('cvv').parentElement.classList.add('error');
                isValid = false;
            }
            
            // If everything is valid, submit the form
            if (isValid) {
                // In a real application, you would submit the form to a payment processor
                // For this demo, we'll redirect to the confirmation page
                window.location.href = 'form-confirmation-page.html';
            }
        });
    }
    
    // Format credit card number as user types
    const cardNumberInput = document.getElementById('cardnumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            // Remove any non-digit characters
            let value = e.target.value.replace(/\D/g, '');
            
            // Add a space after every 4 digits
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            
            // Update the input value
            e.target.value = value;
        });
    }
});

