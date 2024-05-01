const { invoke } = window.__TAURI__.tauri;

const { register } = window.__TAURI__.globalShortcut;

function getLineNumber(textarea, indicator) {
  indicator.innerHTML = textarea.value.substr(0, textarea.selectionStart).split("\n").length;
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
}

// Tab after. (Ctrl + Tab)
function nextTab() {
  var currentActiveTab = $('#tabLinks .active');
  var nextTab = currentActiveTab.next('#tabLink');

  if (nextTab.length === 0) {
    // If there is no next tab, switch to the first tab
    console.log("No next tab. Goto First.")
    nextTab = $('#tabLinks #tabLink').first();
  }

  var targetTab = $(nextTab).data('tab');

  // Show/Hide Tabs
  $(targetTab).removeClass('hidden').siblings('#tabsContents div').addClass('hidden');

  // Change/remove current tab to active
  $(nextTab).addClass('active').siblings('#tabLink').removeClass('active');
}

$(document).on('click', '#tabLink', function(){
  var targetTab = $(this).data('tab');

  // Show/Hide Tabs
  $(targetTab).removeClass('hidden').siblings('#tabsContents div').addClass('hidden');

  // Change/remove current tab to active
  $(this).addClass('active').siblings('#tabLink').removeClass('active');
});
  
$('#tabNewTabButton').on('click', newTab);

await register('CommandOrControl+T', () => {
  newTab();
});

await register('CommandOrControl+Tab', () => {
  nextTab();
})