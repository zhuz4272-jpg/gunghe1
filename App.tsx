import React, { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { ResultScreen } from './components/ResultScreen';

export enum AppState {
  START = 'START',
  GENERATING = 'GENERATING',
  RESULT = 'RESULT'
}

const App: React.FC = () => {
  const [view, setView] = useState<AppState>(AppState.START);

  const handleGenerate = () => {
    setView(AppState.GENERATING);
    // Simulate a network request or "brewing" time
    // Reduced from 2000ms to 800ms for faster response
    setTimeout(() => {
      setView(AppState.RESULT);
    }, 800);
  };

  const handleReset = () => {
    setView(AppState.START);
  };

  return (
    <div className="w-screen h-screen fixed inset-0 overflow-hidden bg-white">
       {/* Global Container */}
       {view === AppState.START || view === AppState.GENERATING ? (
         <StartScreen onGenerate={handleGenerate} isGenerating={view === AppState.GENERATING} />
       ) : (
         <ResultScreen onReset={handleReset} />
       )}
    </div>
  );
};

export default App;