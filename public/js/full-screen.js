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
