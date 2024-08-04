// by: Kriston

$(document).ready(function () {
    // This code waits for the document to finish loading before executing the following code.

    $('.toggle_btn').on('click', function () {
        // This code attaches a click event handler to all elements with the class "toggle_btn".

        $('body').toggleClass('no-scroll');
        // This code adds or removes the class "no-scroll" to the <body> element.
        // If the class is already present, it will be removed. If it's not present, it will be added.
    });
});