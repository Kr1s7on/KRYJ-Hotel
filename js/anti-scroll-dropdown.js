$(document).ready(function() {
    // This line of code waits for the document to be fully loaded and ready before executing the code inside the function.
    
    $('.toggle_btn').on('click', function () {
        // This line of code selects all elements with the class "toggle_btn" and attaches a click event handler to them.
        
        $('body').toggleClass('no-scroll');
        // This line of code selects the <body> element and toggles the presence of the class "no-scroll".
        // If the class is already present, it will be removed. If it's not present, it will be added.
    });
});