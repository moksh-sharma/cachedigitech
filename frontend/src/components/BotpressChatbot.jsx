import { useEffect } from "react";

function BotpressChatbot() {
  useEffect(() => {
    // Load the Botpress webchat inject script
    const injectScript = document.createElement('script');
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v3.3/inject.js';
    document.head.appendChild(injectScript);

    // Load the configuration script after the inject script is loaded
    injectScript.onload = () => {
      const configScript = document.createElement('script');
      configScript.src = 'https://files.bpcontent.cloud/2025/10/01/13/20251001130549-FDA5EVKK.js';
      configScript.defer = true;
      document.head.appendChild(configScript);

      // Apply custom positioning after scripts are loaded
      configScript.onload = () => {
        // Wait a bit for Botpress to initialize
        setTimeout(() => {
          const chatButton = document.querySelector('[data-testid="webchat-button"]');
          if (chatButton) {
            // Position the chatbot button at bottom left
            chatButton.style.position = 'fixed';
            chatButton.style.bottom = '20px';
            chatButton.style.left = '20px';
            chatButton.style.right = 'auto';
            chatButton.style.zIndex = '9998';
            chatButton.style.backgroundColor = 'red'; // Button background

            // Set icon color to red
            const svg = chatButton.querySelector('svg');
            if (svg) {
              svg.style.fill = 'red'; // Icon color
              svg.style.color = 'red'; // For some SVGs
            }
          }

          // Also check for the chat container
          const chatContainer = document.querySelector('[data-testid="webchat-container"]');
          if (chatContainer) {
            chatContainer.style.position = 'fixed';
            chatContainer.style.bottom = '90px';
            chatContainer.style.left = '20px';
            chatContainer.style.right = 'auto';
            chatContainer.style.zIndex = '9998'; // Lower z-index than N8N chatbot
          }
        }, 1000);
      };
    };

    // Cleanup function to remove scripts when component unmounts
    return () => {
      if (injectScript.parentNode) {
        injectScript.parentNode.removeChild(injectScript);
      }
      const configScript = document.querySelector('script[src="https://files.bpcontent.cloud/2025/10/01/13/20251001130549-FDA5EVKK.js"]');
      if (configScript && configScript.parentNode) {
        configScript.parentNode.removeChild(configScript);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}

export default BotpressChatbot;