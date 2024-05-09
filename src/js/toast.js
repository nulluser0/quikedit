export async function newSimpleToast(message, timeout) {
    if (!timeout) timeout = 2000;
    let newToast = $('<div>' + message + '</div>')
    $('#toastService').append(newToast);
    setTimeout(function(){
        newToast.fadeOut(500, function() { // 500 milliseconds fade out duration
            $(newToast).remove(); // Remove the element from the DOM
        });
    }, timeout - 500);
}