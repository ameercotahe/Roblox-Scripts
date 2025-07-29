document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    const responses = {
        "hello": "Hello! I'm a Roblox scripting chatbot. How can I help you today?",
        "how are you": "I'm just a bot, but I'm doing great! Ready to generate some scripts.",
        "default": "I'm not sure how to respond to that. Please ask me to generate a script for something specific.",
        "create a part": "```lua\nlocal part = Instance.new('Part')\npart.Parent = game.Workspace\npart.Position = Vector3.new(0, 5, 0)\npart.Anchored = true\n```",
        "make a part that kills you": "```lua\nlocal part = Instance.new('Part')\npart.Parent = game.Workspace\npart.Position = Vector3.new(0, 5, 0)\npart.Anchored = true\npart.Touched:Connect(function(hit)\n    local humanoid = hit.Parent:FindFirstChild('Humanoid')\n    if humanoid then\n        humanoid.Health = 0\n    end\nend)\n```"
    };

    const sendMessage = () => {
        const userInput = chatInput.value.toLowerCase().trim();
        if (userInput === '') return;

        appendMessage('user', userInput);

        let botResponse = responses[userInput] || responses['default'];

        appendMessage('bot', botResponse);

        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const appendMessage = (sender, message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);

        if (sender === 'bot' && message.startsWith('```lua')) {
            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.textContent = message.substring(6, message.length - 3);
            pre.appendChild(code);
            messageElement.appendChild(pre);
        } else {
            messageElement.textContent = message;
        }

        chatMessages.appendChild(messageElement);
    };

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
