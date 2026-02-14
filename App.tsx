import React, { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { ResultScreen } from './components/ResultScreen';
import { PRESETS, SpecimenPreset } from './constants';

export enum AppState {
  START = 'START',
  GENERATING = 'GENERATING',
  RESULT = 'RESULT'
}

const App: React.FC = () => {
  const [view, setView] = useState<AppState>(AppState.START);
  const [currentResult, setCurrentResult] = useState<SpecimenPreset>(PRESETS[1]); // Default to Cactus

  const handleGenerate = () => {
    setView(AppState.GENERATING);
    
    // Randomly select a preset
    const randomIndex = Math.floor(Math.random() * PRESETS.length);
    setCurrentResult(PRESETS[randomIndex]);

    // Simulate a network request or "brewing" time
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
         <ResultScreen onReset={handleReset} data={currentResult} />
       )}
    </div>
  );
};

export default App;