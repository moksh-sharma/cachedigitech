import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import { PlacementsProvider } from "./context/PlacementsContext";
import { ChatFocusProvider } from "./context/ChatFocusContext";
import { ChatProvider } from "./context/ChatContext";
import { LenisProvider } from "./context/LenisContext";
import { CookieConsentProvider } from "./context/CookieConsentContext";

import "./index.css";
import App from "./App.jsx";

// HashRouter works when opening index.html via file:// (e.g. from dist folder)
const Router = window.location.protocol === "file:" ? HashRouter : BrowserRouter;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ContentProvider>
        <PlacementsProvider>
          <ChatFocusProvider>
            <ChatProvider>
              <LenisProvider>
                <CookieConsentProvider>
                  <App />
                </CookieConsentProvider>
              </LenisProvider>
            </ChatProvider>
          </ChatFocusProvider>
        </PlacementsProvider>
      </ContentProvider>
    </Router>
  </StrictMode>
);
