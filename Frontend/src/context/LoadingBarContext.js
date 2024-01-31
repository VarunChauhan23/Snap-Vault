import React, { useContext, createContext, useState } from 'react';
const LoadingBarContext = createContext();

export const LoadingBarProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);

  const contextValue = {
    progress,
    setProgress,
  };

  return (
    <LoadingBarContext.Provider value={contextValue}>
        {children}
    </LoadingBarContext.Provider>
  );
};

export const useLoadingBar = () => {
    const context = useContext(LoadingBarContext);

    if (!context) {
        throw new Error("UseLoadingBar must be used within a LoadingBarProvider");
    }

    return context;
}
