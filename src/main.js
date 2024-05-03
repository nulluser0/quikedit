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

let tabLinksScrollAnimation = null;

function tabLinksScrollToSpecificTab(tab) {
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
    complete: function() {
      tabLinksScrollAnimation = null; // Reset animation object
    }
  });
}

function openCommandPalette() {
  $('#commandPalette').removeClass('hidden');
  $('#commandPalette').find('input').trigger('focus');
}

function closeCommandPalette() {
  $('#commandPalette').addClass('hidden');
  $('#commandPalette').find('input').trigger('blur');

  // let currentTab = $('#tabLinks .active');
  // let currentTargetTab = $(currentTab).data('tab');
  // $(currentTargetTab).children('.text-input').trigger("focus");
}

function increaseFontSize() {
  let currentTab = $("#tabLinks .active");
  let targetTab = $(currentTab).data('tab');
  let fontSize = parseInt($(targetTab).children('.text-input').css("font-size"));
  fontSize = fontSize + 1 + "px";
  $(targetTab).children('.text-input').css({'font-size':fontSize});
}

function decreaseFontSize() {
  let currentTab = $("#tabLinks .active");
  let targetTab = $(currentTab).data('tab');
  let fontSize = parseInt($(targetTab).children('.text-input').css("font-size"));
  fontSize = fontSize - 1 + "px";
  $(targetTab).children('.text-input').css({'font-size':fontSize});
}

function resetFontSize() {
  let currentTab = $("#tabLinks .active");
  let targetTab = $(currentTab).data('tab');
  let fontSize = "14px"
  $(targetTab).children('.text-input').css({'font-size':fontSize});
}

// New tab. (Ctrl + T)
function newTab() {
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

function deleteTab() {
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
function nextTab() {
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
function prevTab() {
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

function moveTabLeft() {
  let currentActiveTab = $('#tabLinks .active');
  let leftTab = currentActiveTab.prev('#tabLink');

  $(currentActiveTab).insertBefore(leftTab);
}

function moveTabRight() {
  let currentActiveTab = $('#tabLinks .active');
  let rightTab = currentActiveTab.next('#tabLink');

  $(currentActiveTab).insertAfter(rightTab);
}

$(document).on('click', '#tabLink', function(){
  let targetTab = $(this).data('tab');

  // Show/Hide Tabs
  $(targetTab).removeClass('hidden').siblings('#tabsContents div').addClass('hidden');

  // Change/remove current tab to active
  $(this).addClass('active').siblings('#tabLink').removeClass('active');

  $(targetTab).children('.text-input').trigger("focus");
});

$('#tabNewTabButton').on('click', newTab);

// Scroll on X
document.getElementById("tabLinks").addEventListener("wheel", function (e) {
    if (e.deltaY > 0) document.getElementById("tabLinks").scrollLeft += 100;
    else document.getElementById("tabLinks").scrollLeft -= 100;
  });

// Document Keyboard Shortcuts
$(document).on('keydown', null, 'Ctrl+T', function(e) {e.preventDefault(); newTab()});
$(document).on('keydown', null, 'Ctrl+W', function(e) {e.preventDefault(); deleteTab()});
$(document).on('keydown', null, 'Ctrl+Tab', function(e) {e.preventDefault(); nextTab()});
$(document).on('keydown', null, 'Ctrl+Shift+Tab', function(e) {e.preventDefault(); prevTab()});

$(document).on('keydown', null, 'Ctrl+Shift+P', function(e) {e.preventDefault(); openCommandPalette()});
$('#commandPalette input').on('keydown', null, 'Esc', function(e) {e.preventDefault(); closeCommandPalette()});
$(document).on('keydown', null, 'Esc', function(e) {e.preventDefault(); closeCommandPalette()});
$(document).on('click', function(e){
  if (!$('#commandPalette').is(e.target) && !$('#commandPalette').has(e.target).length) {
    closeCommandPalette();
  }
});

$(document).on('keydown', null, 'Ctrl+R', function(e) {e.preventDefault()});
$(document).on('keydown', null, 'Ctrl+P', function(e) {e.preventDefault()});

$(document).on('keydown', null, 'Alt+Left', function(e) {e.preventDefault(); moveTabLeft()});
$(document).on('keydown', null, 'Alt+Right', function(e) {e.preventDefault(); moveTabRight()});

$(document).on('keydown', null, 'Ctrl+=', function(e) {e.preventDefault(); increaseFontSize()});
$(document).on('keydown', null, 'Ctrl+-', function(e) {e.preventDefault(); decreaseFontSize()});
$(document).on('keydown', null, 'Ctrl+0', function(e) {e.preventDefault(); resetFontSize()});