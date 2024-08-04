
// To check the room available or not and validate the form
document.getElementById('checkAvailable').addEventListener('click', function (event) {
    event.preventDefault();

    const Adate = document.getElementById('Adate').value;
    const Edate = document.getElementById('Edate').value;
    const room = document.getElementById('room').value;

    if (Edate <= Adate) {
        alert('Departure date must be after arrival date');
        return;
    }
    if (!Adate || !Edate || !room) {
        alert('Please fill in all required fields.');
        return;
    }

    const bookingData = {
        arrivalDate: Adate,
        departureDate: Edate,
        roomType: room
    };

    function check_room_availablity() {
        return true;
    }

    let checkAvailability = check_room_availablity();
    if (checkAvailability) {
        document.querySelector('.form-section').classList.add('hidden');
        document.querySelector('.form-container').classList.remove('hidden');
    }
    else {
        alert('Room not available, Please select other type of room or date');
    }

});

function saveFormData() {
    const bookingData = {
        arrivalDate: document.getElementById('Adate').value, // Assuming the input field has an ID 'arrivalDate'
        departureDate: document.getElementById('Edate').value, // Assuming the input field has an ID 'departureDate'
        roomType: document.getElementById('room').value // Assuming the select field has an ID 'roomType'
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

const frPrice = 850;
const droomPrice = 875;
const deluxeRoomPrice = 700
const rsPrice = 2000;
const psPrice = 4000;

// To dynamically display the selected room type and dates, and room image for better room experience
document.addEventListener('DOMContentLoaded', () => {
    const arrivalDateInput = document.getElementById('Adate');
    const departureDateInput = document.getElementById('Edate');
    const roomTypeSelect = document.getElementById('room');

    const arrivalDateDisplay = document.getElementById('booking-arrival-date');
    const departureDateDisplay = document.getElementById('booking-departure-date');
    const roomTypeDisplay = document.getElementById('booking-room-type');
    const roomImage = document.getElementById('type-of-room-choosen');

    const roomPriceDisplay = document.getElementById('room-price');
    const ValTaxDisplay = document.getElementById('tax');
    const totalAmountDisplay = document.getElementById('total-price');
    const roomImages = {
        'FR': 'assets/images/family-room/left.jpg',
        'Droom': 'assets/images/duplex-suite/bed.jpg',
        'DeluxeRoom': 'assets/images/deluxe-room/sid-bed.jpg',
        'RS': 'assets/images/renaissance-suite/bed-side.jpg',
        'PS': 'assets/images/pres-suite/bed.jpg'
    };

    const roomPrice = {
        'FR': frPrice,
        'Droom': droomPrice,
        'DeluxeRoom': deluxeRoomPrice,
        'RS': rsPrice,
        'PS': psPrice
    };

    function updatePrice() {
        const arrivalDate = new Date(arrivalDateInput.value);
        const departureDate = new Date(departureDateInput.value);
        const selectedRoomType = roomTypeSelect.options[roomTypeSelect.selectedIndex].value;

        // Ensure dates are valid
        if (arrivalDateInput.value && departureDateInput.value && arrivalDate < departureDate) {
            const dataDifferent = (departureDate - arrivalDate) / (1000 * 60 * 60 * 24);

            roomPriceDisplay.textContent = `${(roomPrice[selectedRoomType] * dataDifferent).toFixed(2)} USD`;
            ValTaxDisplay.textContent = `${((roomPrice[selectedRoomType] * dataDifferent) * 0.21).toFixed(2)} USD`;
            totalAmountDisplay.textContent = `${((roomPrice[selectedRoomType] * dataDifferent) + ((roomPrice[selectedRoomType] * dataDifferent) * 0.21)).toFixed(2)} USD`;
        } else {
            roomPriceDisplay.textContent = '0 USD';
            ValTaxDisplay.textContent = '0 USD';
            totalAmountDisplay.textContent = '0 USD';
        }
    }

    const today = new Date().toISOString().split('T')[0];
    arrivalDateInput.setAttribute('min', today);
    departureDateInput.setAttribute('min', today);

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

    roomTypeSelect.dispatchEvent(new Event('input'));


});


// To validate the form and submit the form
const form = document.getElementById('payment-form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const cardNumber = document.getElementById('cardNum');
const cardName = document.getElementById('chname');
const cvv = document.getElementById('CVV');


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("Form submission prevented");

    if (validateInputs()) {
        console.log("Inputs are valid, attempting to send email...");
        let checkEmail = await sendEmail();
        console.log("Email sent status:", checkEmail);
        if (checkEmail) {
            console.log("Redirecting to confirmation page...");
            window.location.href = 'form-confirmation-page.html';
        } else {
            console.log("Email send failed or returned false");
        }
    } else {
        console.log("Validation failed");
    }
});

function sendEmail() {
    return new Promise((resolve, reject) => {
        var Params = {
            name: document.getElementById('fname').value,
            check_in_date: document.getElementById('Adate').value,
            check_out_date: document.getElementById('Edate').value,
            room_type: document.getElementById('room').options[document.getElementById('room').selectedIndex].text,
            receive_email: document.getElementById('email').value,
        };

        emailjs.send('service_1gx8wq3', 'template_mj24ruk', Params).then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            resolve(true); // Resolve the promise with true when email is sent successfully
        }, function (error) {
            console.log('FAILED...', error);
            resolve(false); // Resolve the promise with false when email sending fails
        });
    });
}

function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
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
    let isvalid = true;

    if (fnameValue === '') {
        setError(fname, 'First Name cannot be empty');
        isvalid = false;
    }
    else if (!nameRegex.test(fnameValue)) {
        setError(fname, 'First Name can only contain letters');
        isvalid = false;
    }
    else {
        setSuccess(fname);
    }

    if (lnameValue === '') {
        setError(lname, 'Last Name cannot be empty');
        isvalid = false;
    }
    else if (!nameRegex.test(lnameValue)) {
        setError(lname, 'Last Name can only contain letters');
        isvalid = false;
    }
    else {
        setSuccess(lname);
    }

    if (emailValue === '') {
        setError(email, 'Email cannot be empty');
        isvalid = false;
    }
    else if (emailValue.indexOf('@') === -1 || emailValue.indexOf('.') === -1) {
        setError(email, 'Email is not valid');
        isvalid = false;
    }
    else {
        setSuccess(email);
    }

    if (phoneValue === '') {
        setError(phone, 'Phone number cannot be empty');
        isvalid = false;
    }
    else if (isNaN(phoneValue)) {
        setError(phone, 'Phone number is can only contain numbers');
        isvalid = false;
    }
    else {
        setSuccess(phone);
    }

    if (cardNumberValue === '') {
        setError(cardNumber, 'Card number cannot be empty');
    }
    else {
        var cardNumwithoutSpace = cardNumberValue.replace(/\s/g, '');
        if (cardNumwithoutSpace.length < 16 || cardNumwithoutSpace.length > 16 || isNaN(cardNumwithoutSpace)) {
            setError(cardNumber, 'Card number can only contain numbers and must be 16 digits');
            isvalid = false;
        }
        else {
            setSuccess(cardNumber);
        }
    }

    if (cardNameValue === '') {
        setError(cardName, 'Card name cannot be empty');
        isvalid = false;
    }
    else if (!nameRegex.test(cardNameValue)) {
        setError(cardName, 'Last Name can only contain letters');
        isvalid = false;
    }
    else {
        setSuccess(cardName);
    }

    if (cvvValue === '') {
        setError(cvv, 'CVV cannot be empty');
        isvalid = false;
    }
    else if (cvvValue.length < 3 || cvvValue.length > 3 || isNaN(cvvValue)) {
        setError(cvv, 'CVV can only contain 3 digits and must be numbers');
        isvalid = false;
    }
    else {
        setSuccess(cvv);
    }
    return isvalid;
}

