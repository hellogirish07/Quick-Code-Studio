// const e = require("express");

document.getElementById('htmlCode').addEventListener('input', RunCode);
document.getElementById('cssCode').addEventListener('input', RunCode);

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

// function checkDisplaySize() {
//     if (window.innerWidth < 750) {
//         // document.getElementById('content').classList.add('hidden');
//         // document.getElementById('alertMessage').style.display = 'block';
//         // alert("Please make sure you have a bigger display");
//     }
// }

// window.onload = checkDisplaySize;
// window.onresize = checkDisplaySize;

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
    mode: 'xml', 
    theme: 'monokai', // Default theme
    lineNumbers: true,
    autoCloseTags: true,
    matchBrackets: true,
    lineWrapping: true,
    autoCloseBrackets: true,
});

// Initialize CodeMirror for CSS
const cssEditor = CodeMirror.fromTextArea(document.getElementById('cssCode'), {
    mode: 'css',
    theme: 'monokai', // Default theme
    lineNumbers: false,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    autoCloseBrackets: true,
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
        autoCloseBrackets: true,
    });
}


// fountion to toggle the iframe 
function togglePreview() {
    const previewFrame = document.getElementById('preview');
    if (previewFrame.style.display === 'none' || previewFrame.style.display === '') {
        previewFrame.style.display = 'block';
    } else {
        previewFrame.style.display = 'none';
    }
}

function openInfo() {
    const infoSection = document.getElementById('infoSection');
    if (infoSection.style.display === 'none' || infoSection.style.display === '') {
        infoSection.style.display = 'block';
    } else {
        infoSection.style.display = 'none';
    }
}

function closeInfo() {
    const infoSection = document.getElementById('infoSection');
    infoSection.style.display = 'none';
}