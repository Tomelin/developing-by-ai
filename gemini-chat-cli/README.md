# Gemini Chat CLI

A command-line interface (CLI) application that allows you to interact with Google's Gemini Pro model. Your conversations are saved locally for your reference.

## Prerequisites

Before you can run this application, you need:

1.  **Go:** Ensure Go is installed on your system. You can download it from [golang.org](https://golang.org/dl/).
2.  **Google Gemini API Key:** You must have a valid API key for the Gemini API. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).

## Setup

1.  **Get the Code:**
    *   If you've cloned this repository, the code will be in the `gemini-chat-cli` directory.
    *   Otherwise, ensure `main.go`, `go.mod`, and `go.sum` are present in a directory named `gemini-chat-cli`.

2.  **Set the `GEMINI_API_KEY` Environment Variable:**
    This application requires your Gemini API key to be set as an environment variable.

    *   **Linux/macOS:**
        Open your terminal and run:
        ```bash
        export GEMINI_API_KEY="YOUR_API_KEY"
        ```
        Replace `"YOUR_API_KEY"` with your actual API key. To make this permanent, add the line to your shell's configuration file (e.g., `~/.bashrc`, `~/.zshrc`) and then source it (e.g., `source ~/.bashrc`).

    *   **Windows (Command Prompt):**
        ```cmd
        set GEMINI_API_KEY=YOUR_API_KEY
        ```
        Replace `YOUR_API_KEY` with your actual API key. To set it permanently, search for "environment variables" in the Start menu, and add `GEMINI_API_KEY` as a new user variable with your key as its value.

    *   **Windows (PowerShell):**
        ```powershell
        $env:GEMINI_API_KEY="YOUR_API_KEY"
        ```
        Replace `"YOUR_API_KEY"` with your actual API key. For permanent setting, you can add this to your PowerShell profile script.

## Running the Application

1.  **Navigate to the Directory:**
    Open your terminal or command prompt and change to the application's directory:
    ```bash
    cd path/to/gemini-chat-cli
    ```

2.  **Run the Application:**
    Execute the following command:
    ```bash
    go run main.go
    ```
    The application will start, and you can begin chatting with Gemini.

## Features

*   **Interactive Chat:** Engage in conversations with the Gemini Pro model.
*   **Chat History:** All conversations are automatically saved to a file named `chat_history.txt` in the application directory.
*   **Exit Command:** Type `exit` and press Enter to end the chat session.

## Error Handling

The application includes error handling for common issues such as:
*   Missing or invalid API key.
*   Problems connecting to the Gemini API.
*   Errors during file operations (e.g., writing to `chat_history.txt`).
Error messages will be displayed in the console if issues arise.

## Directory Structure

```
gemini-chat-cli/
├── go.mod             # Go module definition
├── go.sum             # Go module checksums
├── main.go            # Main application code
├── chat_history.txt   # Saved chat conversations (created on first run)
└── README.md          # This file
```
