const { invoke } = window.__TAURI__.tauri;
const { tauri } = window.__TAURI__;

async function request_file() {
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

    if (result) return result.replace('.txt', '');

    return;
}