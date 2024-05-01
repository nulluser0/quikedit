const { invoke } = window.__TAURI__.tauri;

import { register } from '@tauri-apps/api/globalShortcut';

function getLineNumber(textarea, indicator) {
  indicator.innerHTML = textarea.value.substr(0, textarea.selectionStart).split("\n").length;
}

// Main Tab System
$(document).ready(function(){
  $('#tabLinks #tabLink').on('click', function(){
    var targetTab = $(this).data('tab');

    // Show/Hide Tabs
    $(targetTab).removeClass('hidden').siblings('#tabsContents div').addClass('hidden');

    // Change/remove current tab to active
    $(this).addClass('active').siblings('#tabLink').removeClass('active');
  });

  $('#tabNewTabButton').on('click', function newTab(){
    var newTab = $('<li id="tabLink"></li>').text('New Tab').data('tab', 10);
    $('#tabNewTabButton').before(newTab);
  })
});

await register('CommandOrControl+T', () => {
  newTab();
});