// Facilities booking date validation
document.addEventListener('DOMContentLoaded', function() {
    // Get date input element
    const dateInput = document.getElementById('date');
    
    if (dateInput) {
        // Set minimum date to today
        const today = new Date();
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        dateInput.min = formatDate(today);
        
        // Form submission validation
        const facilitiesForm = document.getElementById('facilities-form');
        if (facilitiesForm) {
            facilitiesForm.addEventListener('submit', function(event) {
                const selectedDate = new Date(dateInput.value);
                const today = new Date();
                
                // Reset today's time components for proper comparison
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    event.preventDefault();
                    alert('Please select a date in the future.');
                    return false;
                }
                
                return true;
            });
        }
    }
});