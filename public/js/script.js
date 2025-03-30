document.getElementById('htmlCode').addEventListener('input', RunCode);
document.getElementById('cssCode').addEventListener('input', RunCode);

const settingsBtn = document.getElementById("settingsBtn");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");
const downloadCodeBtn = document.getElementById("downloadCodeBtn");

// Main Concept Code for Code Editor 
// RunCode Function autometically Event Listeners Ke kaaran Call ho raha he 
function RunCode() {
    const htmlCode = document.getElementById('htmlCode').value;
    const cssCode = '<style>' + document.getElementById('cssCode').value + '</style>';
    const previewFrame = document.getElementById('preview');
    previewFrame.contentDocument.body.innerHTML = htmlCode + cssCode;
}

// Toggle HTML
function toggleHTML() {
    const htmlTextarea = document.getElementById('htmlCode');
    htmlTextarea.style.display = (htmlTextarea.style.display === 'none') ? 'block' : 'none';
}

// Toggle CSS
function toggleCSS() {
    const cssTextarea = document.getElementById('cssCode');
    cssTextarea.style.display = (cssTextarea.style.display === 'none') ? 'block' : 'none';
}

function checkDisplaySize() {
    if (window.innerWidth < 750) {
        // document.getElementById('content').classList.add('hidden');
        // document.getElementById('alertMessage').style.display = 'block';
        // alert("Please make sure you have a bigger display");
    }
}

window.onload = checkDisplaySize;
window.onresize = checkDisplaySize;

function reloadPage() {
    location.reload();
}

// JavaScript to manage the toggle and status
function toggleHTML() {
    const htmlTextarea = document.getElementById("htmlCode");
    const htmlEditorWrapper = htmlEditor.getWrapperElement(); // Get the CodeMirror wrapper
    const htmlStatus = document.querySelector(".html .status-circle");

    if (htmlEditorWrapper.style.display === "none" || htmlEditorWrapper.style.display === "") {
        htmlEditorWrapper.style.display = "block";
        htmlStatus.classList.add("filled");
    } else {
        htmlEditorWrapper.style.display = "none";
        htmlStatus.classList.remove("filled");
    }
}

function toggleCSS() {
    const cssTextarea = document.getElementById("cssCode");
    const cssEditorWrapper = cssEditor.getWrapperElement(); // Get the CodeMirror wrapper
    const cssStatus = document.querySelector(".css .status-circle");

    if (cssEditorWrapper.style.display === "none" || cssEditorWrapper.style.display === "") {
        cssEditorWrapper.style.display = "block";
        cssStatus.classList.add("filled");
    } else {
        cssEditorWrapper.style.display = "none";
        cssStatus.classList.remove("filled");
    }
}

// Initialize CodeMirror for HTML
const htmlEditor = CodeMirror.fromTextArea(document.getElementById('htmlCode'), {
    mode: 'xml', // Use 'htmlmixed' for HTML with embedded CSS/JS
    theme: 'dracula', // Default theme
    lineNumbers: true,
    autoCloseTags: true,
    matchBrackets: true,
    lineWrapping: true,
});

// Initialize CodeMirror for CSS
const cssEditor = CodeMirror.fromTextArea(document.getElementById('cssCode'), {
    mode: 'css',
    theme: 'dracula', // Default theme
    lineNumbers: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
});

// Theme switching logic
document.getElementById('themeSelector').addEventListener('change', (event) => {
    const selectedTheme = event.target.value;
    htmlEditor.setOption('theme', selectedTheme);
    cssEditor.setOption('theme', selectedTheme);
});

// Function to update the iframe preview
function ShowOutput() {
    const htmlContent = htmlEditor.getValue();
    const cssContent = `<style>${cssEditor.getValue()}</style>`;
    const previewFrame = document.getElementById('preview');
    const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    previewDoc.open();
    previewDoc.write(`
        <html>
            <head>
                ${cssContent}
            </head>
            <body>
                ${htmlContent}
            </body>
        </html>
    `);
    previewDoc.close();
}

// Event listeners to update preview in real-time (optional)
htmlEditor.on('change', ShowOutput);
cssEditor.on('change', ShowOutput);

// Open Sidebar
settingsBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
});

// Close Sidebar
closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("open");
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
}

// Toggle Word Wrap
function toggleWordWrap(wrap) {
    htmlEditor.setOption('lineWrapping', wrap);
    cssEditor.setOption('lineWrapping', wrap);
}

// Clear Code
document.getElementById('clearCodeBtn').addEventListener('click', () => {
    htmlEditor.setValue('');
    cssEditor.setValue('');
});

// Download Code Function
downloadCodeBtn.addEventListener("click", () => {
    const htmlContent = htmlEditor.getValue();
    const cssContent = cssEditor.getValue();

    const zip = new JSZip();
    const folder = zip.folder("Quick Code Studio Project");
    folder.file("index.html", htmlContent);
    folder.file("style.css", cssContent);

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

// Global variable to store the full-screen window reference
let fullScreenWindow = null;

// Function to open output in full screen
function openFullScreenOutput() {
    const htmlContent = htmlEditor.getValue();
    const cssContent = `<style>${cssEditor.getValue()}</style>`;
    
    // Create a new window with the output
    fullScreenWindow = window.open('', '_blank');
    fullScreenWindow.document.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Quick Code Studio - Output</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                ${cssContent}
            </head>
            <body>
                ${htmlContent}
            </body>
        </html>
    `);
    fullScreenWindow.document.close();

    // Add event listener for window close
    fullScreenWindow.onbeforeunload = function() {
        fullScreenWindow = null;
    };
}

// Function to update full screen output
function updateFullScreenOutput() {
    if (fullScreenWindow && !fullScreenWindow.closed) {
        const htmlContent = htmlEditor.getValue();
        const cssContent = `<style>${cssEditor.getValue()}</style>`;
        
        fullScreenWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Quick Code Studio - Output</title>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    ${cssContent}
                </head>
                <body>
                    ${htmlContent}
                </body>
            </html>
        `);
        fullScreenWindow.document.close();
    }
}

// Add event listeners for real-time updates
htmlEditor.on('change', function() {
    ShowOutput();
    updateFullScreenOutput();
});

cssEditor.on('change', function() {
    ShowOutput();
    updateFullScreenOutput();
});
