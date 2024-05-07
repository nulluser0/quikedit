// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;

#[tauri::command]
fn open_file(path: String) -> Result<String, String> {
    println!("Opening file: {}", path);
    match fs::read_to_string(&path) {
        Ok(contents) => Ok(contents),
        Err(err) => Err(format!("Failed to read file: {}", err)),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
