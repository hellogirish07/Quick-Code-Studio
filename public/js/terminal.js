// --- JS Terminal Modal Logic ---
const jsTerminalModal = document.getElementById("jsTerminalModal");
const jsTerminalInput = document.getElementById("jsTerminalInput");
const jsTerminalOutput = document.getElementById("jsTerminalOutput");
const toggleTerminalBtn = document.getElementById("toggleTerminalBtn");
const closeJsTerminal = document.getElementById("closeJsTerminal");
const jsTerminalHeader = document.querySelector(".js-terminal-header");

if (toggleTerminalBtn && jsTerminalModal) {
  toggleTerminalBtn.addEventListener("click", () => {
    jsTerminalModal.classList.toggle("hidden");
    if (!jsTerminalModal.classList.contains("hidden")) {
      jsTerminalInput.value = "";
      jsTerminalInput.focus();
      // Optionally clear output each time opened:
      // jsTerminalOutput.innerHTML = '';
    }
  });
}
if (closeJsTerminal && jsTerminalModal) {
  closeJsTerminal.addEventListener("click", () => {
    jsTerminalModal.classList.add("hidden");
  });
}

if (jsTerminalInput && jsTerminalOutput) {
  // Auto-resize textarea
  function autoResizeTextarea(el) {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }
  jsTerminalInput.addEventListener("input", function () {
    autoResizeTextarea(this);
  });

  jsTerminalInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const code = jsTerminalInput.value.trim();
      if (!code) return;

      // 🔥 CLEAR COMMAND
      if (code.toLowerCase() === "clear") {
        jsTerminalOutput.innerHTML = "";
        jsTerminalInput.value = "";
        return;
      }

      let result;
      let isError = false;
      let logs = [];

      // 🎯 Patch console methods
      const originalConsole = { ...console };

      console.log = (...args) => {
        logs.push({ type: "log", data: args });
        originalConsole.log(...args);
      };

      console.warn = (...args) => {
        logs.push({ type: "warn", data: args });
        originalConsole.warn(...args);
      };

      console.error = (...args) => {
        logs.push({ type: "error", data: args });
        originalConsole.error(...args);
      };

      console.table = (data) => {
        logs.push({ type: "table", data });
      };

      try {
        result = eval(code);
      } catch (err) {
        result = err;
        isError = true;
      }

      // Restore console
      Object.assign(console, originalConsole);

      // 🧠 Output builder
      let outputHtml = `<div><span style='color:#0f0;'>&gt; ${code.replace(/\n/g, "<br>")}</span>`;

      logs.forEach((log) => {
        if (log.type === "log") {
          outputHtml += `<br><span style='color:#0af;'>${format(log.data)}</span>`;
        }
        if (log.type === "warn") {
          outputHtml += `<br><span style='color:#ff0;'>⚠ ${format(log.data)}</span>`;
        }
        if (log.type === "error") {
          outputHtml += `<br><span style='color:#f55;'>❌ ${format(log.data)}</span>`;
        }
        if (log.type === "table") {
          outputHtml += `<br>${renderTable(log.data)}`;
        }
      });

      if (isError) {
        outputHtml += `<br><span style='color:#f55;'>${result}</span>`;
      } else if (typeof result !== "undefined") {
        outputHtml += `<br><span style='color:#fff;'>${format([result])}</span>`;
      }

      outputHtml += `</div>`;

      jsTerminalOutput.innerHTML += outputHtml;

      jsTerminalInput.value = "";
      autoResizeTextarea(jsTerminalInput);
      jsTerminalOutput.scrollTop = jsTerminalOutput.scrollHeight;
      jsTerminalInput.focus();
    }

    // Shift+Enter → multiline
    if (e.key === "Enter" && e.shiftKey) {
      setTimeout(() => autoResizeTextarea(jsTerminalInput), 0);
    }
  });

  function format(args) {
    return args
      .map((a) => {
        if (typeof a === "object") {
          try {
            return JSON.stringify(a, null, 2);
          } catch {
            return "[Object]";
          }
        }
        return String(a);
      })
      .join(" ");
  }

  // 🔥 console.table renderer
  function renderTable(data) {
    if (!Array.isArray(data)) return "<span>Invalid table data</span>";

    let keys = Object.keys(data[0] || {});
    let table = `<table style="border-collapse: collapse; color:white;">`;

    // Header
    table += `<tr>${keys.map((k) => `<th style="border:1px solid #555; padding:4px;">${k}</th>`).join("")}</tr>`;

    // Rows
    data.forEach((row) => {
      table += `<tr>${keys.map((k) => `<td style="border:1px solid #555; padding:4px;">${row[k]}</td>`).join("")}</tr>`;
    });

    table += `</table>`;
    return table;
  }
  // Initial resize
  autoResizeTextarea(jsTerminalInput);
}
