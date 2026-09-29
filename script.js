const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});


// ===============================
// HÓLIC AI
// ===============================

const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

function addMessage(text, type) {
  const message = document.createElement("div");

  message.className =
    type === "user"
      ? "message user-message"
      : "message ai-message";

  message.textContent = text;

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTyping() {
  const typing = document.createElement("div");

  typing.id = "typingMessage";
  typing.className = "message ai-message";
  typing.textContent = "HÓLIC AI is thinking...";

  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typingMessage");

  if (typing) {
    typing.remove();
  }
}

async function askAI(question) {

  if (!question.trim()) return;

  addMessage(question, "user");
  addTyping();

  try {

    const response = await fetch("/api/chat", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: question
      })
    });

    const data = await response.json();

    removeTyping();

    if (!response.ok) {
      throw new Error(data.error || "AI request failed");
    }

    addMessage(data.reply, "ai");

  } catch (error) {

    removeTyping();

    addMessage(
      "Sorry, HÓLIC AI is currently unavailable. Please check the backend connection.",
      "ai"
    );

    console.error(error);
  }
}


chatForm.addEventListener("submit", async event => {

  event.preventDefault();

  const question = userInput.value.trim();

  if (!question) return;

  userInput.value = "";

  await askAI(question);
});


// Quick suggestion buttons

document.querySelectorAll(".suggestions button").forEach(button => {

  button.addEventListener("click", () => {

    const question = button.dataset.question;

    userInput.value = question;

    userInput.focus();
  });

});


// ===============================
// SUGGESTION COUNTER
// ===============================

const suggestionText = document.getElementById("suggestionText");
const charCount = document.getElementById("charCount");
const suggestionCount = document.getElementById("suggestionCount");
const suggestButton = document.getElementById("suggestButton");
const suggestStatus = document.getElementById("suggestStatus");

let count =
  Number(localStorage.getItem("holicSuggestionCount")) || 0;

suggestionCount.textContent = count;


suggestionText.addEventListener("input", () => {

  charCount.textContent =
    `${suggestionText.value.length} / 500`;

});


suggestButton.addEventListener("click", () => {

  const idea = suggestionText.value.trim();

  if (!idea) {

    suggestStatus.textContent =
      "Please write an idea first.";

    return;
  }

  count++;

  localStorage.setItem(
    "holicSuggestionCount",
    count
  );

  suggestionCount.textContent = count;

  suggestionText.value = "";
  charCount.textContent = "0 / 500";

  suggestStatus.textContent =
    "Thanks! Your idea has been recorded on this browser.";

});


// ===============================
// ENTER KEY FOR AI
// ===============================

userInput.addEventListener("keydown", event => {

  if (
    event.key === "Enter" &&
    !event.shiftKey
  ) {

    event.preventDefault();

    chatForm.requestSubmit();

  }

});
