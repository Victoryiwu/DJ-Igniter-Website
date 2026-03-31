// script.js

// Function to show/hide custom service input
function checkOther(selectElement) {
    const customInput = selectElement.parentElement.querySelector('.customService');
    if (selectElement.value === 'Other') {
        customInput.style.display = 'block';
        customInput.required = true;
    } else {
        customInput.style.display = 'none';
        customInput.required = false;
    }
}

// Function to handle form submission
function saveBooking(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const serviceSelect = form.querySelector('.serviceSelect');
    const customService = form.querySelector('.customService').value;
    const date = form.querySelector('input[name="date"]').value;

    const service = (serviceSelect.value === 'Other') ? customService : serviceSelect.value;

    // Create booking object
    const booking = { name, email, service, date };

    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Show success message
    const successMsg = form.parentElement.querySelector('.successMsg');
    successMsg.textContent = '✅ Booking Saved Successfully!';
    successMsg.style.color = 'green';

    // Optional: Reset the form
    form.reset();
    form.querySelector('.customService').style.display = 'none';
}

// Attach event listeners to all booking forms
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.bookingForm');
    forms.forEach(form => {
        form.addEventListener('submit', saveBooking);

        // Attach onchange for service select to show/hide custom input
        const select = form.querySelector('.serviceSelect');
        select.addEventListener('change', () => checkOther(select));
    });
});