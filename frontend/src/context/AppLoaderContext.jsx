import React, { createContext, useContext, useState } from "react";

const AppLoaderContext = createContext({
  loaderDone: false,
  setLoaderDone: () => {},
});

export function AppLoaderProvider({ children }) {
  const [loaderDone, setLoaderDone] = useState(false);
  return (
    <AppLoaderContext.Provider value={{ loaderDone, setLoaderDone }}>
      {children}
    </AppLoaderContext.Provider>
  );
}

export function useAppLoader() {
  const ctx = useContext(AppLoaderContext);
  return ctx;
}
