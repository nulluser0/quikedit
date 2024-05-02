// const { invoke } = window.__TAURI__.tauri;

jQuery.hotkeys.options.filterInputAcceptingElements = false

function getLineNumber(textarea, indicator) {
  indicator.innerHTML = textarea.value.substr(0, textarea.selectionStart).split("\n").length;
}

function showDefaultPageCheck() {
  if ($('#tabLinks #tabLink').length === 0) {
    $('#defaultPage').removeClass('hidden');
  }
}

var tabLinksScrollAnimation = null;

function tabLinksScrollToSpecificTab(tab) {
  var container = $('#tabLinks');
  var scrollTo = $(tab).position().left + container.scrollLeft();

  // Cancel ongoing animation, if any
  if (tabLinksScrollAnimation !== null) {
    tabLinksScrollAnimation.stop();
  }

  // Animate scrolling
  tabLinksScrollAnimation = container.stop().animate({ scrollLeft: scrollTo }, {
    duration: 200,
    easing: 'easeInOutQuart',
    complete: function() {
      tabLinksScrollAnimation = null; // Reset animation object
    }
  });
}


// New tab. (Ctrl + T)
function newTab() {
  var newTabId = $('#tabLinks #tabLink').length + 1;
  var newTab = $('<li id="tabLink" data-tab="#tab' + newTabId + '">Tab ' + newTabId + '</li>');
  var newTabContent = $('<div id="tab' + newTabId + '"><textarea class="text-input"></textarea></div>')
  $('#tabNewTabButton').before(newTab);
  $('#mainContainer').children().append(newTabContent);

  $(newTab).addClass('active').siblings('#tabLink').removeClass('active');
  $(newTabContent).removeClass('hidden').siblings('#tabsContents div').addClass('hidden');

  $(newTabContent).children('.text-input').trigger("focus");

  tabLinksScrollToSpecificTab(newTab);
}

function deleteTab() {
  var currentDeletionTab = $('#tabLinks .active');
  var previousTab = currentDeletionTab.prev('#tabLink');
  if (previousTab.length === 0) {
    // If there is no previous tab, next tab
    previousTab = currentDeletionTab.next('#tabLink');
  }
  if (previousTab.length === 0) {
    previousTab = null;
  }

  var targetDeletionTab = $(currentDeletionTab).data('tab');
  var targetNextTab = $(previousTab).data('tab');

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
function nextTab() {
  var currentActiveTab = $('#tabLinks .active');
  var nextTab = currentActiveTab.next('#tabLink');

  if (nextTab.length === 0) {
    // If there is no next tab, switch to the first tab
    nextTab = $('#tabLinks #tabLink').first();
  }

  var targetTab = $(nextTab).data('tab');

  // Show/Hide Tabs
  $(targetTab).removeClass('hidden').siblings('#tabsContents div').addClass('hidden');

  // Change/remove current tab to active
  $(nextTab).addClass('active').siblings('#tabLink').removeClass('active');

  $(targetTab).children('.text-input').trigger("focus");

  tabLinksScrollToSpecificTab(nextTab);
}

// Tab before. (Ctrl + Shift + Tab)
function prevTab() {
  var currentActiveTab = $('#tabLinks .active');
  var nextTab = currentActiveTab.prev('#tabLink');

  if (nextTab.length === 0) {
    // If there is no next tab, switch to the first tab
    nextTab = $('#tabLinks #tabLink').last();
  }

  var targetTab = $(nextTab).data('tab');

  // Show/Hide Tabs
  $(targetTab).removeClass('hidden').siblings('#tabsContents div').addClass('hidden');

  // Change/remove current tab to active
  $(nextTab).addClass('active').siblings('#tabLink').removeClass('active');

  $(targetTab).children('.text-input').trigger("focus");

  tabLinksScrollToSpecificTab(nextTab);
}

$(document).on('click', '#tabLink', function(){
  var targetTab = $(this).data('tab');

  // Show/Hide Tabs
  $(targetTab).removeClass('hidden').siblings('#tabsContents div').addClass('hidden');

  // Change/remove current tab to active
  $(this).addClass('active').siblings('#tabLink').removeClass('active');

  $(targetTab).children('.text-input').trigger("focus");
});
  
$('#tabNewTabButton').on('click', newTab);

// Document Keyboard Shortcuts
$(document).on('keydown', null, 'Ctrl+T', function() {newTab()});
$(document).on('keydown', null, 'Ctrl+W', function() {deleteTab()});
$(document).on('keydown', null, 'Ctrl+Tab', function() {nextTab()});
$(document).on('keydown', null, 'Ctrl+Shift+Tab', function() {prevTab()});