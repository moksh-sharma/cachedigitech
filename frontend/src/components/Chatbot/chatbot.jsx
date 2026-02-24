import { useEffect } from "react";

function Chatbot() {
  useEffect(() => {
    // Ensure DotLottie Web Component is available
    const dotLottieSrc = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.1/dist/dotlottie-wc.js';
    let dotLottieScript = document.querySelector('script[data-dotlottie-wc]');
    if (!window.customElements?.get('dotlottie-wc') && !dotLottieScript) {
      dotLottieScript = document.createElement('script');
      dotLottieScript.src = dotLottieSrc;
      dotLottieScript.type = 'module';
      dotLottieScript.setAttribute('data-dotlottie-wc', 'true');
      document.head.appendChild(dotLottieScript);
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.n8nchatui.com/v1/embed.js';
    script.type = 'module';
    script.defer = true;
    document.head.appendChild(script);
    

    script.onload = () => {
      if (window.Chatbot) {
        window.Chatbot.init({
          n8nChatUrl: "https://koustubh-sonekar.n8n-wsk.com/webhook/ad5dff5f-0b31-46c9-a228-91bd696a2462/chat",
          theme: {
            button: {
              right: 50,
              left: "auto",
              bottom: 40,
              size: 50,
              iconColor: "white",
              // Remove bell icon fallback entirely
              backgroundColor: "red",
              border: "none",
              boxShadow: "none",
              outline: "none",
              hoverBackgroundColor: "transparent",
            },
            chatWindow: {
              title: "Zuno",
              welcomeMessage: "Hi! I'm your assistant. Ask me anything.",
              titleColor: "#000",
              borderColor: "#dc2626",
              borderSize: "10px",
              errorMessage: "⚠ Couldn't reach the bot. Try again later.",
              textInput: {
                placeholder: "Type here...",
                sendButtonColor: "#dc2626",
              },
              botMessage: { backgroundColor: "#dc2626", textColor: "#fff" },
              userMessage: { backgroundColor: "#eee", textColor: "#000" },
            },
          },
        });

        // Overlay the chat button with the provided Lottie animation
        // const overlay = document.createElement('div');
        // overlay.style.position = 'fixed';
        // overlay.style.right = '90px';
        // overlay.style.bottom = '100px';
        // overlay.style.width = '100px';
        // overlay.style.height = '100px';
        // // Ensure the animation sits above the chat button square
        // overlay.style.zIndex = '2147483647';
        // // Allow clicks to pass through to the underlying chat button
        // overlay.style.pointerEvents = 'none';
        // overlay.innerHTML = `
        //   <dotlottie-wc
        //     src="https://lottie.host/b53765a7-aa95-4bbc-aee9-ea7d6c6ef188/sqf73jTfZr.lottie"
        //     autoplay
        //     loop
        //     style="width: 150px; height: 150px;"
        //   ></dotlottie-wc>
        // `;
        // document.body.appendChild(overlay);

        // Toggle overlay visibility based on whether the chatbox is open
        const isChatOpen = () => {
          // Detect chat window by presence of the title text "Zuno" being visible
          const all = Array.from(document.querySelectorAll('*'));
          for (const el of all) {
            const text = el.textContent || '';
            if (text.includes('Zuno')) {
              const rect = el.getBoundingClientRect();
              const style = window.getComputedStyle(el);
              const visible = rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
              if (visible) return true;
            }
          }
          return false;
        };

        // Overlay logic removed; bell animation overlay is no longer used.
      }
    };

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      const existingOverlay = document.querySelector('dotlottie-wc')?.parentElement;
      if (existingOverlay && existingOverlay.parentNode) existingOverlay.parentNode.removeChild(existingOverlay);
    };
  }, []);

  return null;
}

// Ensure both default and named exports are available
export { Chatbot };
export default Chatbot;