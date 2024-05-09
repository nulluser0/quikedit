export async function newSimpleToast(message, timeout) {
    if (!timeout) timeout = 3000;
    let newToast = $('<div>' + message + '</div>')
    $('#toastService').append(newToast);
    setTimeout(function(){
        newToast.remove();
    }, timeout);
}