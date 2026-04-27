document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("user-input");

    // Allow Enter key to send message
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    // Remove the initial dummy message if we want to or leave it. We will leave it as greeting.
});

async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();

    if (!message) return;

    const chatBox = document.getElementById("chat-box");

    // Add user message to chat
    chatBox.innerHTML += `
        <div class="message user-msg">
            <div class="msg-bubble">${escapeHTML(message)}</div>
        </div>`;
    
    input.value = "";
    scrollToBottom(chatBox);

    // Show "Bot is typing..." indicator
    const typingIndicatorId = "typing-" + Date.now();
    chatBox.innerHTML += `
        <div id="${typingIndicatorId}" class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>`;
    scrollToBottom(chatBox);

    // Set the API URL dynamically based on whether you are on localhost or production
    const API_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
        ? "http://localhost:3001" 
        : "https://chatbot-tb3s.onrender.com"; 

    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        
        // Remove typing indicator
        document.getElementById(typingIndicatorId).remove();

        // Add bot message to chat
        chatBox.innerHTML += `
            <div class="message bot-msg">
                <div class="msg-bubble">${formatBotResponse(data.reply)}</div>
            </div>`;

    } catch (error) {
        document.getElementById(typingIndicatorId).remove();
        chatBox.innerHTML += `
            <div class="message bot-msg">
                <div class="msg-bubble" style="color: #ef4444;">Error connecting to server. Is the backend running?</div>
            </div>`;
        console.error(error);
    }

    scrollToBottom(chatBox);
}

function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}

// Simple HTML escaper to prevent XSS from input
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function formatBotResponse(text) {
    // Basic formatting: handle newlines
    let formattedText = escapeHTML(text).replace(/\n/g, "<br>");
    return formattedText;
}
