// 🔥 Keyboard Shortcuts for Quick Code Studio

document.addEventListener('keydown', (e) => {

    // Windows/Linux → Ctrl
    // Mac → Meta (Cmd)
    const ctrl = e.ctrlKey || e.metaKey;

    // 👉 CTRL + ENTER → Fullscreen Preview
    if (ctrl && e.key === 'Enter') {
        e.preventDefault();
        if (typeof openFullScreenOutput === "function") {
            openFullScreenOutput();
        }
    }

    // 👉 CTRL + P → Toggle Preview
    if (ctrl && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        if (typeof togglePreview === "function") {
            togglePreview();
        }
    }

    // 👉 CTRL + J → Toggle Terminal
    if (ctrl && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        const btn = document.getElementById('toggleTerminalBtn');
        if (btn) btn.click();
    }

    // 👉 CTRL + , → Open and close Settings 
    if (ctrl && e.key === ',') {
        e.preventDefault();
        const btn = document.getElementById('settingsBtn');
        if (btn) btn.click();
    }

    // Ctrl + I → Open Info Section
    if (ctrl && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        openInfo();
    }

    // Ctrl + A → Open AI Assistant
    if (ctrl && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (typeof openAIAssistant === 'function') {
            openAIAssistant();
        }
    }

});