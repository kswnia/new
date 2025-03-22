document.addEventListener('DOMContentLoaded', function() {
    const messagesContainer = document.getElementById('messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Auto-resize textarea as user types
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Send message when Enter key is pressed (without Shift)
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Send message when send button is clicked
    sendButton.addEventListener('click', sendMessage);

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Add user message to chat
            addUserMessage(message);

            // Clear input and reset height
            userInput.value = '';
            userInput.style.height = 'auto';

            // Simulate bot response (in a real app, this would be an API call)
            setTimeout(() => {
                if (message.toLowerCase().includes('powershell') ||
                    message.toLowerCase().includes('enable') ||
                    message.toLowerCase().includes('disable') ||
                    message.toLowerCase().includes('website')) {
                    addPowershellResponse(message);
                } else {
                    addBotMessage("I'm not sure how to respond to that. Try asking about PowerShell commands or website access.");
                }
            }, 1000);
        }
    }

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    function addPowershellResponse(query) {
        // Create search query display
        const searchQueryDiv = document.createElement('div');
        searchQueryDiv.className = 'search-query';
        searchQueryDiv.textContent = query.toLowerCase().includes('powershell') ?
            query : 'powershell enable / disable http://example.com';
        messagesContainer.appendChild(searchQueryDiv);

        // Create bot response
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        // Add explanation text
        const explanation = document.createElement('p');
        explanation.innerHTML = 'In PowerShell, you can enable or disable access to <span class="highlight">http://example.com</span> using different methods depending on your goal. Here are some common approaches:';
        messageContent.appendChild(explanation);

        // Add divider
        const divider = document.createElement('div');
        divider.className = 'divider';
        messageContent.appendChild(divider);

        // Add heading
        const heading = document.createElement('h2');
        heading.textContent = '1. Block/Unblock Website via Windows Firewall';
        messageContent.appendChild(heading);

        // Add code block
        const codeBlock = document.createElement('div');
        codeBlock.className = 'code-block';

        const codeHeader = document.createElement('div');
        codeHeader.className = 'code-header';

        const codeLanguage = document.createElement('div');
        codeLanguage.className = 'code-language';
        codeLanguage.textContent = 'powershell';

        const codeActions = document.createElement('div');
        codeActions.className = 'code-actions';

        const copyButton = document.createElement('button');
        copyButton.className = 'code-action';
        copyButton.innerHTML = '<i class="far fa-copy"></i> Copy';
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(codeContent.textContent)
                .then(() => {
                    copyButton.innerHTML = '<i class="fas fa-check"></i> Copied';
                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="far fa-copy"></i> Copy';
                    }, 2000);
                });
        });

        const editButton = document.createElement('button');
        editButton.className = 'code-action';
        editButton.innerHTML = '<i class="far fa-edit"></i> Edit';

        codeActions.appendChild(copyButton);
        codeActions.appendChild(editButton);

        codeHeader.appendChild(codeLanguage);
        codeHeader.appendChild(codeActions);

        const codeContent = document.createElement('div');
        codeContent.className = 'code-content';
        codeContent.textContent = '# To block a website\nNew-NetFirewallRule -DisplayName "Block example.com" -Direction Outbound -RemoteAddress example.com -Action Block\n\n# To unblock a website\nRemove-NetFirewallRule -DisplayName "Block example.com"';

        codeBlock.appendChild(codeHeader);
        codeBlock.appendChild(codeContent);

        messageContent.appendChild(codeBlock);

        // Add Windows activation notice
        const windowsActivation = document.createElement('div');
        windowsActivation.className = 'windows-activation';
        windowsActivation.innerHTML = '<h3>Activate Windows</h3><p>Go to Settings to activate Windows.</p>';

        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.appendChild(windowsActivation);

        scrollToBottom();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Add initial welcome message
    setTimeout(() => {
        addBotMessage("Hello! I'm your AI assistant. Try asking me about PowerShell commands for enabling or disabling website access.");
    }, 500);
});