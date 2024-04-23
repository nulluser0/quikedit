// const { invoke } = window.__TAURI__.tauri;


// Main Tab System
$(document).ready(function(){
  $('#tab-links #tab-link').on('click', function(){
    var targetTab = $(this).data('tab');

    // Show/Hide Tabs
    $(targetTab).show().siblings('#tabs-contents div').hide();

    // Change/remove current tab to active
    $(this).addClass('active').siblings('#tab-link').removeClass('active');
  });
});