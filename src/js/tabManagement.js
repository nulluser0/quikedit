// Check if tabs == 0. If so, display default page
export function showDefaultPageCheck() {
    if ($('#tabLinks #tabLink').length === 0) {
        $('#defaultPage').removeClass('hidden');
    }
}

// Scroll to active tab logic
let tabLinksScrollAnimation = null;
export function tabLinksScrollToSpecificTab(tab) {
    let container = $('#tabLinks');
    let scrollTo = $(tab).position().left + container.scrollLeft();

    // Cancel ongoing animation, if any
    if (tabLinksScrollAnimation !== null) {
        tabLinksScrollAnimation.stop();
    }

    // Animate scrolling
    tabLinksScrollAnimation = container.stop().animate({ scrollLeft: scrollTo }, {
        duration: 200,
        easing: 'easeInOutQuart',
        complete: function () {
            tabLinksScrollAnimation = null; // Reset animation object
        }
    });
}

// New tab
export function newTab() {
    let newTabId = $('#tabLinks #tabLink').length + 1;
    while ($('#tab' + newTabId).length > 0) {
        newTabId++;
    }
    let newTab = $('<li id="tabLink" data-tab="#tab' + newTabId + '">Tab ' + newTabId + '</li>');
    let newTabContent = $('<div id="tab' + newTabId + '"><textarea class="text-input"></textarea></div>')
    $('#tabNewTabButton').before(newTab);
    $('#mainContainer').children().append(newTabContent);

    $(newTab).addClass('active').siblings('#tabLink').removeClass('active');
    $(newTabContent).removeClass('hidden').siblings('#tabsContents div').addClass('hidden');

    $(newTabContent).children('.text-input').trigger("focus");

    tabLinksScrollToSpecificTab(newTab);
}

// Delete tab
export function deleteTab() {
    let currentDeletionTab = $('#tabLinks .active');
    let previousTab = currentDeletionTab.prev('#tabLink');
    if (previousTab.length === 0) {
        // If there is no previous tab, next tab
        previousTab = currentDeletionTab.next('#tabLink');
    }
    if (previousTab.length === 0) {
        previousTab = null;
    }

    let targetDeletionTab = $(currentDeletionTab).data('tab');
    let targetNextTab = $(previousTab).data('tab');

    // TODO: There should be an area which stops/warns you before deleting the current tab.

    // Show/Hide Tabs
    $(targetDeletionTab).addClass('hidden');
    $(targetNextTab).removeClass('hidden');

    // Change/remove current tab to active
    $(currentDeletionTab).removeClass('active');
    $(previousTab).addClass('active');

    // Delete tabs.
    $(currentDeletionTab).remove();
    $(targetDeletionTab).remove();

    $(targetNextTab).children('.text-input').trigger("focus");

    showDefaultPageCheck();
}

// Tab after. (Ctrl + Tab)
export function nextTab() {
    let currentActiveTab = $('#tabLinks .active');
    let nextTab = currentActiveTab.next('#tabLink');

    if (nextTab.length === 0) {
        // If there is no next tab, switch to the first tab
        nextTab = $('#tabLinks #tabLink').first();
    }

    let targetTab = $(nextTab).data('tab');

    // Show/Hide Tabs
    $(targetTab).removeClass('hidden').siblings('#tabsContents div').addClass('hidden');

    // Change/remove current tab to active
    $(nextTab).addClass('active').siblings('#tabLink').removeClass('active');

    $(targetTab).children('.text-input').trigger("focus");

    tabLinksScrollToSpecificTab(nextTab);
}

// Tab before. (Ctrl + Shift + Tab)
export function prevTab() {
    let currentActiveTab = $('#tabLinks .active');
    let nextTab = currentActiveTab.prev('#tabLink');

    if (nextTab.length === 0) {
        // If there is no next tab, switch to the first tab
        nextTab = $('#tabLinks #tabLink').last();
    }

    let targetTab = $(nextTab).data('tab');

    // Show/Hide Tabs
    $(targetTab).removeClass('hidden').siblings('#tabsContents div').addClass('hidden');

    // Change/remove current tab to active
    $(nextTab).addClass('active').siblings('#tabLink').removeClass('active');

    $(targetTab).children('.text-input').trigger("focus");

    tabLinksScrollToSpecificTab(nextTab);
}

// Move left
export function moveTabLeft() {
    let currentActiveTab = $('#tabLinks .active');
    let leftTab = currentActiveTab.prev('#tabLink');

    $(currentActiveTab).insertBefore(leftTab);
}

// Move right 
export function moveTabRight() {
    let currentActiveTab = $('#tabLinks .active');
    let rightTab = currentActiveTab.next('#tabLink');

    $(currentActiveTab).insertAfter(rightTab);
}

// Switch to tab on click
$(document).on('click', '#tabLink', function () {
    let targetTab = $(this).data('tab');

    // Show/Hide Tabs
    $(targetTab).removeClass('hidden').siblings('#tabsContents div').addClass('hidden');

    // Change/remove current tab to active
    $(this).addClass('active').siblings('#tabLink').removeClass('active');

    $(targetTab).children('.text-input').trigger("focus");
});

// New tab on click
$('#tabNewTabButton').on('click', newTab);

// Scroll on X
document.getElementById("tabLinks").addEventListener("wheel", function (e) {
    if (e.deltaY > 0) document.getElementById("tabLinks").scrollLeft += 100;
    else document.getElementById("tabLinks").scrollLeft -= 100;
});