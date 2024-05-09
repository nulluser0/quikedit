// Open
export function openCommandPalette() {
    $('#commandPalette').removeClass('hidden');
    $('#commandPalette').find('input').trigger('focus');
}

// Close
export function closeCommandPalette() {
    $('#commandPalette').addClass('hidden');
    $('#commandPalette').find('input').trigger('blur');

    let currentTab = $('#tabLinks .active');
    let currentTargetTab = $(currentTab).data('tab');
    $(currentTargetTab).children('.text-input').trigger("focus");
}