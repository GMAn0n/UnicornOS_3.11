import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  currentApp: string | null;
  launchApp: (appName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentApp, setCurrentApp] = useState<string | null>(null);

  const launchApp = (appName: string) => {
    setCurrentApp(appName);
  };

  return (
    <AppContext.Provider value={{ currentApp, launchApp }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};