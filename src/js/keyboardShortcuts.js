import * as tabManagement from './tabManagement.js';
import * as commandPalette from './commandPalette.js';
import * as textInputManagement from './textInputManagement.js';
import * as fileUtils from './fileUtils.js';

// Tab Management:
$(document).on('keydown', null, 'Ctrl+T', function (e) { e.preventDefault(); tabManagement.newTab() });
$(document).on('keydown', null, 'Ctrl+W', function (e) { e.preventDefault(); tabManagement.deleteTab() });
$(document).on('keydown', null, 'Ctrl+Tab', function (e) { e.preventDefault(); tabManagement.nextTab() });
$(document).on('keydown', null, 'Ctrl+Shift+Tab', function (e) { e.preventDefault(); tabManagement.prevTab() });
$(document).on('keydown', null, 'Alt+Left', function (e) { e.preventDefault(); tabManagement.moveTabLeft() });
$(document).on('keydown', null, 'Alt+Right', function (e) { e.preventDefault(); tabManagement.moveTabRight() });

// Command Palette:
$(document).on('keydown', null, 'Ctrl+Shift+P', function (e) { e.preventDefault(); commandPalette.openCommandPalette() });
$('#commandPalette input').on('keydown', null, 'Esc', function (e) { e.preventDefault(); commandPalette.closeCommandPalette() });
$(document).on('keydown', null, 'Esc', function (e) { e.preventDefault(); commandPalette.closeCommandPalette() });
$(document).on('click', function (e) {
  if (!$('#commandPalette').is(e.target) && !$('#commandPalette').has(e.target).length) {
    commandPalette.closeCommandPalette();
  }
});

// Text Input Management:
$(document).on('keydown', null, 'Ctrl+=', function (e) { e.preventDefault(); textInputManagement.increaseFontSize() });
$(document).on('keydown', null, 'Ctrl+-', function (e) { e.preventDefault(); textInputManagement.decreaseFontSize() });
$(document).on('keydown', null, 'Ctrl+0', function (e) { e.preventDefault(); textInputManagement.resetFontSize() });

// Intentionally prevent default behaviour:
$(document).on('keydown', null, 'Ctrl+R', function (e) { e.preventDefault() });
$(document).on('keydown', null, 'Ctrl+P', function (e) { e.preventDefault() });

$(document).on('keydown', null, 'Ctrl+O', async function (e) {
  e.preventDefault();
  try {
    let filePath = await fileUtils.requestFile(); // Wait for requestFile promise to resolve
    await fileUtils.openFile(filePath); // Wait for openFile promise to resolve
  } catch (error) {
    console.error('Error:', error);
    // toast notification
  }
});

function saveFunction() {
  let tabLink = $('#tabLinks .active');
  let targetTab = tabLink.data('tab');

  // If no active tab, return.
  if (!targetTab) {
    console.log('Save: No active tab...');
    return;
  };

  let tabContent = $(targetTab).children('.text-input');

  // If no text-input, return.
  if (!tabContent) {
    console.log('Save: No .text-input to save...');
    return;
  };

  let tabText = tabContent.val();
  return tabText
}

$(document).on('keydown', null, 'Ctrl+S', async function (e) {
  e.preventDefault();

  let tabText = saveFunction();
  if (!tabText) return;

  try {
    let filePath = $(tabLink).data('savedirectory');
    if (!$(tabLink).data('savedirectory')) {
      filePath = await fileUtils.requestSaveFile();
    }

    if (!filePath) {
      console.log('save: No path specified.');
      return;
    }
    
    await fileUtils.saveFile(filePath, tabText);
    tabManagement.removeUnsavedChangesData();
    tabManagement.addSaveDirectoryData(tabLink, filePath)
  } catch (error) {
    console.error('Error: ', error);
    // TODO: toast notification
  }
})

$(document).on('keydown', null, 'Ctrl+Shift+S', async function (e) {
  // TODO: put check for data savedirectory
  e.preventDefault();

  let tabText = saveFunction();
  if (!tabText) return;

  try {
    filePath = await fileUtils.requestSaveAs();

    if (!filePath) {
      console.log('save: No path specified.');
      return;
    }
    
    await fileUtils.saveFile(filePath, tabText);
    tabManagement.removeUnsavedChangesData();
    tabManagement.addSaveDirectoryData(tabLink, filePath)
  } catch (error) {
    console.error('Error: ', error);
    // TODO: toast notification
  }
})