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
  }
});