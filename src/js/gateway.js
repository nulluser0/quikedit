const { invoke } = window.__TAURI__.tauri;
const { tauri } = window.__TAURI__;

export async function open_file(path) {
    const file = await invoke('open_file', { path });
    return file;
}