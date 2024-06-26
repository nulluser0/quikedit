const { invoke } = window.__TAURI__.tauri;
const tauri = window.__TAURI__;

import * as gateway from './gateway.js';
import * as tabManagement from './tabManagement.js';

export async function requestFile() {
    const result = await tauri.dialog.open({
        title: "Open File",
        multiple: false,
        defaultPath: 'C:/Users/User/Documents/',
        filters: [
            {
                name: 'Text Documents',
                extensions: ['txt']
            }
        ]
    });

    if (result) return result;
    return;
}

export async function requestSaveFile() {
    const result = await tauri.dialog.save ({
        title: "Save File",
        multiple: false,
        defaultPath: 'C:/Users/User/Documents/',
        filters: [
            {
                name: 'Text Documents',
                extensions: ['txt']
            }
        ]
    });

    if (result) return result;
    return;
}

export async function requestSaveAs() {
    const result = await tauri.dialog.save ({
        title: "Save File As",
        multiple: false,
        defaultPath: 'C:/Users/User/Documents/',
        filters: [
            {
                name: 'Text Documents',
                extensions: ['txt']
            }
        ]
    });

    if (result) return result;
    return;
}

export async function openFile(path) {
    if (!path) return;
    await console.log('open: ' + path);
    let contents = await gateway.open_file(path);
    await tabManagement.openTabFromFile(path, contents)
    return;
}

export async function saveFile(path, contents) {
    if (!path) return;
    await console.log('save: ' + path);
    await gateway.save_file(path, contents);
    // textInputManagement or tabManagement .removeModifiedData();
    return;
}