import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import { PlacementsProvider } from "./context/PlacementsContext";
import { ChatFocusProvider } from "./context/ChatFocusContext";
import { ChatProvider } from "./context/ChatContext";
import { LenisProvider } from "./context/LenisContext";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContentProvider>
        <PlacementsProvider>
          <ChatFocusProvider>
            <ChatProvider>
              <LenisProvider>
                <App />
              </LenisProvider>
            </ChatProvider>
          </ChatFocusProvider>
        </PlacementsProvider>
      </ContentProvider>
    </BrowserRouter>
  </StrictMode>
);
