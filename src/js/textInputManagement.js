// Increase font size
export function increaseFontSize() {
    let currentTab = $("#tabLinks .active");
    let targetTab = $(currentTab).data('tab');
    let fontSize = parseInt($(targetTab).children('.text-input').css("font-size"));
    fontSize = fontSize + 1 + "px";
    $(targetTab).children('.text-input').css({ 'font-size': fontSize });
}

// Decrease font size
export function decreaseFontSize() {
    let currentTab = $("#tabLinks .active");
    let targetTab = $(currentTab).data('tab');
    let fontSize = parseInt($(targetTab).children('.text-input').css("font-size"));
    fontSize = fontSize - 1 + "px";
    $(targetTab).children('.text-input').css({ 'font-size': fontSize });
}

// Reset font size
export function resetFontSize() {
    let currentTab = $("#tabLinks .active");
    let targetTab = $(currentTab).data('tab');
    let fontSize = "14px"
    $(targetTab).children('.text-input').css({ 'font-size': fontSize });
}