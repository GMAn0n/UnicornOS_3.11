import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import FileExplorer from './components/FileExplorer';
import UnicornPinball from './components/UnicornPinball';

const AppContent: React.FC = () => {
  const { currentApp } = useAppContext();

  return (
    <div className="app">
      {currentApp === null && <FileExplorer />}
      {currentApp === 'UnicornPinball' && <UnicornPinball />}
      {/* Add other apps here */}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;