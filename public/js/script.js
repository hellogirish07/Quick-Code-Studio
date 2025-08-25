// Helper: get cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// On load, set localStorage.username from cookie if not present
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('username')) {
        const cookieUser = getCookie('username');
        if (cookieUser) localStorage.setItem('username', cookieUser);
    }
    const saveBtn = document.getElementById('saveProjectBtn');
    const loadBtn = document.getElementById('loadProjectBtn');
    if (saveBtn) saveBtn.addEventListener('click', saveProject);
    if (loadBtn) loadBtn.addEventListener('click', loadProjects);
});

// --- Project Save/Load Functions (SQLite backend) ---
// Save project to server
function saveProject() {
    const username = localStorage.getItem('username'); // Or get from session
    const name = prompt('Enter project name:');
    if (!name || !username) return alert('Missing project name or user.');
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    fetch('/project/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, name, html, css })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) alert('Project saved!');
        else alert('Failed to save project.');
    })
    .catch(() => alert('Error saving project.'));
}

// Load all projects for user
function loadProjects() {
    const username = localStorage.getItem('username');
    if (!username) return alert('No user.');
    fetch(`/project/list?username=${encodeURIComponent(username)}`)
        .then(res => res.json())
        .then(projects => {
            // Show project list (simple prompt for now)
            const names = projects.map(p => p.name).join('\n');
            const pick = prompt('Your projects:\n' + names + '\nEnter project name to load:');
            const proj = projects.find(p => p.name === pick);
            if (proj) {
                htmlEditor.setValue(proj.html || '');
                cssEditor.setValue(proj.css || '');
            }
        });
}


document.getElementById('htmlCode').addEventListener('input', RunCode);
document.getElementById('cssCode').addEventListener('input', RunCode);
// Add event for JS code (will be handled by CodeMirror below)

const settingsBtn = document.getElementById("settingsBtn");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");
const downloadCodeBtn = document.getElementById("downloadCodeBtn");


// Main Concept Code for Code Editor 
// RunCode Function autometically Event Listeners Ke kaaran Call ho raha he 
function RunCode() {
    const htmlCode = document.getElementById('htmlCode').value;
    const cssCode = '<style>' + document.getElementById('cssCode').value + '</style>';
    const jsCode = document.getElementById('jsCode') ? document.getElementById('jsCode').value : '';
    const previewFrame = document.getElementById('preview');
    // For legacy support, but CodeMirror will handle preview
    previewFrame.contentDocument.body.innerHTML = htmlCode + cssCode + (jsCode ? `<script>${jsCode}<\/script>` : '');
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
    theme: 'monokai', // Default theme
    lineNumbers: true,
    autoCloseTags: true,
    matchBrackets: true,
    lineWrapping: true,
});

// Initialize CodeMirror for CSS
const cssEditor = CodeMirror.fromTextArea(document.getElementById('cssCode'), {
    mode: 'css',
    theme: 'monokai', // Default theme
    lineNumbers: false,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
});

// Initialize CodeMirror for JS
let jsEditor = null;
if (document.getElementById('jsCode')) {
    jsEditor = CodeMirror.fromTextArea(document.getElementById('jsCode'), {
        mode: 'javascript',
        theme: 'monokai',
        lineNumbers: false,
        lineWrapping: true,
        autoCloseBrackets: true,
        matchBrackets: true,
    });
}

// Theme switching logic

document.getElementById('themeSelector').addEventListener('change', (event) => {
    const selectedTheme = event.target.value;
    htmlEditor.setOption('theme', selectedTheme);
    cssEditor.setOption('theme', selectedTheme);
    if (jsEditor) jsEditor.setOption('theme', selectedTheme);
});


// Function to update the iframe preview
function ShowOutput() {
    const htmlContent = htmlEditor.getValue();
    const cssContent = `<style>${cssEditor.getValue()}</style>`;
    const jsContent = jsEditor ? `<script>${jsEditor.getValue()}<\/script>` : '';
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
                ${jsContent}
            </body>
        </html>
    `);
    previewDoc.close();
}

// Event listeners to update preview in real-time (optional)

htmlEditor.on('change', ShowOutput);
cssEditor.on('change', ShowOutput);
if (jsEditor) jsEditor.on('change', ShowOutput);

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

// Global variable to store the full-screen window reference
let fullScreenWindow = null;


// Function to open output in full screen
function openFullScreenOutput() {
    const htmlContent = htmlEditor.getValue();
    const cssContent = `<style>${cssEditor.getValue()}</style>`;
    const jsContent = jsEditor ? `<script>${jsEditor.getValue()}<\/script>` : '';
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
                ${jsContent}
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
        const jsContent = jsEditor ? `<script>${jsEditor.getValue()}<\/script>` : '';
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
                    ${jsContent}
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
if (jsEditor) jsEditor.on('change', function() {
    ShowOutput();
    updateFullScreenOutput();
});

function showEditor(editor) {
    document.getElementById("html-editor").classList.add("hidden");
    document.getElementById("css-editor").classList.add("hidden");
    if (document.getElementById("js-editor")) document.getElementById("js-editor").classList.add("hidden");

    document.getElementById(`${editor}-editor`).classList.remove("hidden");

    const tabs = document.querySelectorAll(".tab-button");
    tabs.forEach(tab => tab.classList.remove("active"));

    // Fix: allow 'js' to match 'JavaScript' tab
    let activeTab = null;
    if (editor === 'js') {
        activeTab = Array.from(tabs).find(tab => tab.textContent.trim().toLowerCase() === 'javascript');
    } else {
        activeTab = Array.from(tabs).find(tab => tab.textContent.trim().toLowerCase() === editor);
    }
    if (activeTab) activeTab.classList.add("active");
}

// --- JS Terminal Modal Logic ---
const jsTerminalModal = document.getElementById('jsTerminalModal');
const jsTerminalInput = document.getElementById('jsTerminalInput');
const jsTerminalOutput = document.getElementById('jsTerminalOutput');
const toggleTerminalBtn = document.getElementById('toggleTerminalBtn');
const closeJsTerminal = document.getElementById('closeJsTerminal');
const jsTerminalHeader = document.querySelector('.js-terminal-header');


if (toggleTerminalBtn && jsTerminalModal) {
    toggleTerminalBtn.addEventListener('click', () => {
        jsTerminalModal.classList.toggle('hidden');
        if (!jsTerminalModal.classList.contains('hidden')) {
            jsTerminalInput.value = '';
            jsTerminalInput.focus();
            // Optionally clear output each time opened:
            // jsTerminalOutput.innerHTML = '';
        }
    });
}
if (closeJsTerminal && jsTerminalModal) {
    closeJsTerminal.addEventListener('click', () => {
        jsTerminalModal.classList.add('hidden');
    });
}

if (jsTerminalInput && jsTerminalOutput) {
    // Auto-resize textarea
    function autoResizeTextarea(el) {
        el.style.height = 'auto';
        el.style.height = (el.scrollHeight) + 'px';
    }
    jsTerminalInput.addEventListener('input', function() {
        autoResizeTextarea(this);
    });
    jsTerminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const code = jsTerminalInput.value;
            if (code.trim() === '') return;
            let result;
            let isError = false;
            let logs = [];
            // Patch console.log to capture output
            const originalConsoleLog = console.log;
            console.log = function(...args) {
                logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
                originalConsoleLog.apply(console, args);
            };
            try {
                // eslint-disable-next-line no-eval
                result = eval(code);
            } catch (err) {
                result = err;
                isError = true;
            }
            console.log = originalConsoleLog;
            let outputHtml = `<div><span style='color:#0f0;'>&gt; ${code.replace(/\n/g, '<br>')}</span>`;
            if (logs.length > 0) {
                outputHtml += `<br><span style='color:#0af;'>${logs.join('<br>')}</span>`;
            }
            if (isError) {
                outputHtml += `<br><span style='color:#f55;'>${result}</span>`;
            } else if (typeof result !== 'undefined' && !isError) {
                outputHtml += `<br><span style='color:#fff;'>${result}</span>`;
            }
            outputHtml += `</div>`;
            jsTerminalOutput.innerHTML += outputHtml;
            jsTerminalInput.value = '';
            autoResizeTextarea(jsTerminalInput);
            jsTerminalOutput.scrollTop = jsTerminalOutput.scrollHeight;
            jsTerminalInput.focus();
        } else if (e.key === 'Enter' && e.shiftKey) {
            // Let Shift+Enter insert a newline (default behavior)
            setTimeout(() => autoResizeTextarea(jsTerminalInput), 0);
        }
    });
    // Initial resize
    autoResizeTextarea(jsTerminalInput);
}

