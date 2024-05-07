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

export async function openFile(path) {
    if (!path) return;

    await console.log(path);

    let contents = await gateway.open_file(path);

    await console.log(contents);

    await tabManagement.openTabFromFile(path, contents)

    return;
}