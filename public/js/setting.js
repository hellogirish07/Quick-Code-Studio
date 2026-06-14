const settingsBtn = document.getElementById("settingsBtn");
const settingPannel = document.getElementById("settingPannel");
const closeSettingPannel = document.getElementById("closeSettingPannel");
const downloadCodeBtn = document.getElementById("downloadCodeBtn");

// Theme switching logic
document.getElementById('themeSelector').addEventListener('change', (event) => {
    const selectedTheme = event.target.value;
    htmlEditor.setOption('theme', selectedTheme);
    cssEditor.setOption('theme', selectedTheme);
    if (jsEditor) jsEditor.setOption('theme', selectedTheme);
});

// Open Sidebar
settingsBtn.addEventListener("click", () => {
    settingPannel.classList.add("open");
});

// Close Sidebar
closeSettingPannel.addEventListener("click", () => {
    settingPannel.classList.remove("open");
});

// Change Font Size
function changeFontSize(size) {
    const editors = document.querySelectorAll('.CodeMirror');
    editors.forEach(editor => {
        editor.style.fontSize = `${size}px`;
    });
}

// Change Font Family
function changeFontFamily(fontFamily) {
    const editors = document.querySelectorAll('.CodeMirror');
    editors.forEach(editor => {
        editor.style.fontFamily = fontFamily;
    });
}

// Toggle Line Numbers
function toggleLineNumbers(show) {
    htmlEditor.setOption('lineNumbers', show);
    cssEditor.setOption('lineNumbers', show);
    if (jsEditor) jsEditor.setOption('lineNumbers', show);
}

// Toggle Word Wrap
function toggleWordWrap(wrap) {
    htmlEditor.setOption('lineWrapping', wrap);
    cssEditor.setOption('lineWrapping', wrap);
    if (jsEditor) jsEditor.setOption('lineWrapping', wrap);
}

// Clear Code
document.getElementById('clearCodeBtn').addEventListener('click', () => {
    htmlEditor.setValue('');
    cssEditor.setValue('');
    if (jsEditor) jsEditor.setValue('');
});

// Download Code Function
downloadCodeBtn.addEventListener("click", () => {
    const htmlContent = htmlEditor.getValue();
    const cssContent = cssEditor.getValue();
    const jsContent = jsEditor ? jsEditor.getValue() : '';

    const zip = new JSZip();
    const folder = zip.folder("Quick Code Studio Project");
    folder.file("index.html", htmlContent);
    folder.file("style.css", cssContent);
    if (jsContent) folder.file("script.js", jsContent);

    zip.generateAsync({ type: "blob" }).then(content => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "Quick_Code_Studio.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

// Log out function with SweetAlert Code
// Ensure SweetAlert is included in your project
if (typeof Swal === 'undefined') {
    console.error('SweetAlert library is not loaded.');
} else {
    document.getElementById('logOutBtn').addEventListener('click', function() {
        const messages = [
            "You have been Logged Out. Don't forget me! 😢",
            "Goodbye! Come back soon. 😞",
            "Logging out… but my heart is still signed in. 💔",
            "You're leaving? But… I thought we had something special. 😢",
            "Goodbye, warrior! The system will miss you. ⚔️",
            "You're out! But don't stay away too long.",
            "Every logout feels like a breakup. Don't make it permanent. 😭",
            "Session ended… but my heart is still processing the pain. 💔",
            "Goodbye… This server won't be the same without you. 😔",
            "Mission complete! You have successfully logged out. ✅"
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        // SweetAlert custom styled alert
        Swal.fire({
            title: "<span style='font-size: 30px; font-weight: bold;'>Logged Out!</span>",
            html: `<p style="font-size: 30px; color: #ddd;">${randomMessage}</p>`,
            icon: "warning",
            showConfirmButton: false,
            timer: 5000, // Auto-close after 5 seconds
            background: "#222", // Dark theme
            color: "#fff", // White text
            customClass: {
                popup: 'custom-popup',
                title: 'custom-title',
                content: 'custom-content'
            }
        }).then(() => {
            window.location.href = '/signin.html';
        });
    });
}
