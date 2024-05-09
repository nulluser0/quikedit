// Open
export function openCommandPalette() {
    $('#commandPalette').fadeIn(200);
    $('#commandPalette').find('input').trigger('focus');
}

// Close
export function closeCommandPalette() {
    $('#commandPalette').find('input').trigger('blur');

    let currentTab = $('#tabLinks .active');
    let currentTargetTab = $(currentTab).data('tab');
    $(currentTargetTab).children('.text-input').trigger("focus");


    $('#commandPalette').fadeOut(200);
}

$('#commandPalette').fadeOut(0);