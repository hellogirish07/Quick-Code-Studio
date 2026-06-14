// AI Assistant Functionality
const aiSection = document.getElementById("aiAssistantSection");
const aiMessageInput = document.getElementById("aiMessageInput");
const aiMessages = document.getElementById("aiMessages");
const aiSendBtn = document.getElementById("aiSendBtn");

function openAIAssistant() {
  if (!aiSection) return;
  aiSection.classList.toggle("open");
  if (aiSection.classList.contains("open") && aiMessageInput) {
    setTimeout(() => aiMessageInput.focus(), 100);
  }
}

function closeAIAssistant() {
  if (!aiSection) return;
  aiSection.classList.remove("open");
}

function appendAiMessage(content, type) {
  if (!aiMessages) return;
  const messageEl = document.createElement("div");
  messageEl.className = `ai-message ${type}`;
  messageEl.innerHTML = marked.parse(content);
  aiMessages.appendChild(messageEl);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

function showAiResponse(prompt) {
  appendAiMessage(prompt, "user");

  const thinkingEl = document.createElement("div");
  thinkingEl.className = "ai-message assistant";
  thinkingEl.textContent = "Thinking...";
  aiMessages.appendChild(thinkingEl);
  aiMessages.scrollTop = aiMessages.scrollHeight;

  // Send request to server
  fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  })
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      return data;
    })
    .then((data) => {
      thinkingEl.remove();
      appendAiMessage(data.response, "assistant");
    })
    .catch((error) => {
      console.error(error);
      thinkingEl.remove();
      appendAiMessage(error.message || "AI failed to respond", "assistant");
    });
}

if (aiSendBtn) {
  aiSendBtn.addEventListener("click", () => {
    const prompt = aiMessageInput.value.trim();
    if (!prompt) {
      aiMessageInput.focus();
      return;
    }
    showAiResponse(prompt);
    aiMessageInput.value = "";
  });
}

const promptButtons = document.querySelectorAll(".ai-prompt");
promptButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const prompt = button.dataset.prompt;
    if (!prompt) return;
    aiMessageInput.value = prompt;
    aiMessageInput.focus();
  });
});

if (aiMessageInput) {
  aiMessageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      aiSendBtn.click();
    }
  });
}
