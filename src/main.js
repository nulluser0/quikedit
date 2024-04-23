// const { invoke } = window.__TAURI__.tauri;


// Main Tab System
$(document).ready(function(){
  $('#tabLinks #tabLink').on('click', function(){
    var targetTab = $(this).data('tab');

    // Show/Hide Tabs
    $(targetTab).removeAttr('hidden').siblings('#tabsContents div').attr('hidden', 'hidden');

    // Change/remove current tab to active
    $(this).addClass('active').siblings('#tabLink').removeClass('active');
  });
});
