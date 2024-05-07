const { invoke } = window.__TAURI__.tauri;
const tauri = window.__TAURI__;

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

    

    if (result) return result.replace('.txt', '');

    result = result.split('\\');
    result = result[result.length - 1];
    
    let thingy = await openFile(result);

    await console.log(result, thingy)

    return result, thingy;
}

export async function openFile(path) {
    if (!path) return;

    path = path.split('\\');
    path = path[path.length - 1];

    await console.log(path);

    return path;
}