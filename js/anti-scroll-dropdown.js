$(document).ready(function () {
    // Waits for document to finish loading.

    $('.toggle_btn').on('click', function () {
        // Attaches a click event handler to the element with class "toggle_btn".

        $('body').toggleClass('no-scroll');
        // Adds or removes the class "no-scroll" to the <body> element.
    });
});
