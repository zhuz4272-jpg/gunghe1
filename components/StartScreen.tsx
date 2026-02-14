import React from 'react';
import { ArrowLeft, MoreHorizontal, Droplets, ChevronRight } from 'lucide-react';
import { ASSETS, TEXTS } from '../constants';

interface StartScreenProps {
  onGenerate: () => void;
  isGenerating: boolean;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onGenerate, isGenerating }) => {
  
  const handleGenerateClick = () => {
    if (isGenerating) return;
    
    // Play sound
    const audio = new Audio(ASSETS.SOUND_WATER);
    audio.volume = 0.5;
    audio.play().catch(e => console.error("Audio play failed", e));

    onGenerate();
  };

  return (
    <div className="bg-gradient-to-br from-[#ffe8cc] via-[#ebf7ee] to-[#d6f5d6] h-[100dvh] w-full relative overflow-hidden flex flex-col items-center animate-gradient-xy text-slate-800">
      {/* Ambient Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-200/40 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Main Flex Container */}
      <div className="w-full h-full flex flex-col relative z-10 px-6 py-4 justify-between">
        
        {/* Header - Fixed Height */}
        <header className="flex justify-between items-center w-full shrink-0 h-12">
          <button className="w-10 h-10 flex items-center justify-center rounded-full glass-panel hover:bg-white/40 transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-sm font-bold tracking-widest text-gray-600 uppercase">
              {TEXTS.START_TITLE}
            </h1>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full glass-panel hover:bg-white/40 transition-colors shadow-sm">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </header>

        {/* Content Area - Flexible */}
        <main className="flex-1 min-h-0 flex flex-col items-center justify-center w-full relative py-2">
            {/* Vertical Line Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[20vh] bg-gradient-to-b from-transparent via-white/80 to-transparent blur-[2px] opacity-70"></div>

            {/* Seed Container - Flexible with constraints */}
            <div className={`flex-1 min-h-0 w-full flex items-center justify-center relative ${isGenerating ? 'animate-pulse scale-95 transition-all duration-700' : 'animate-float'}`}>
              <div className="relative h-full max-h-[50vh] aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 m-auto w-[90%] h-[90%] bg-gradient-to-tr from-orange-100 to-green-100 rounded-full blur-3xl opacity-80"></div>
                  
                  <div className="relative h-[80%] aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-green-900/10 border border-white/40 backdrop-blur-sm bg-gradient-to-br from-white/30 to-white/10 z-10">
                    <img 
                      src={ASSETS.SEED_IMAGE} 
                      alt="Floating Seed" 
                      className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-[3s] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/40 mix-blend-soft-light pointer-events-none"></div>
                  </div>

                  {/* Floating Particles */}
                  <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-yellow-300 rounded-full blur-[1px] animate-pulse shadow-[0_0_10px_rgba(253,224,71,0.8)]"></div>
                  <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full blur-[0.5px] opacity-80"></div>
                  <div className="absolute top-1/3 left-8 w-3 h-3 bg-white/40 rounded-full blur-[4px]"></div>
              </div>
            </div>

            {/* Text Content - Fixed/Shrinkable */}
            <div className={`text-center space-y-2 z-20 shrink-0 pb-2 transition-opacity duration-500 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
              <div className="inline-block px-3 py-1 rounded-full glass-panel border border-white/50">
                <p className="text-stone-600 text-xs font-bold tracking-widest uppercase">
                  休眠状态
                </p>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight tracking-tight drop-shadow-sm whitespace-pre-line">
                {TEXTS.START_HEADLINE}
              </h2>
              <p className="text-sm text-stone-500 font-medium tracking-wide">
                {TEXTS.START_SUBTITLE}
              </p>
            </div>
        </main>

        {/* Footer Action - Fixed */}
        <footer className="w-full flex flex-col items-center space-y-4 z-20 shrink-0 pb-4">
            <button 
              onClick={handleGenerateClick}
              disabled={isGenerating}
              className="group relative w-full max-w-[340px] h-16 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-[0_8px_32px_0_rgba(19,236,91,0.3)] transition-all duration-500 overflow-hidden active:scale-95 animate-breathe disabled:animate-none disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/90 opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className={`absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full ${isGenerating ? 'animate-[shimmer_0.8s_infinite]' : 'group-hover:animate-[shimmer_1.5s_infinite]'}`}></div>
              
              <div className="relative flex items-center justify-between px-6 sm:px-8 h-full">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <Droplets className="text-white w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-start text-white">
                    <span className="text-lg sm:text-xl font-bold tracking-wider text-shadow-sm">
                      {isGenerating ? '正在唤醒...' : TEXTS.BUTTON_GENERATE}
                    </span>
                    <span className="text-[10px] font-bold opacity-90 tracking-[0.2em] uppercase">
                      {TEXTS.BUTTON_SUB}
                    </span>
                  </div>
                </div>
                <ChevronRight className="text-white/80 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <div className="flex items-center space-x-3 opacity-40 text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold">
              <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
              <span>{TEXTS.APP_NAME}</span>
              <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
            </div>
        </footer>
      </div>
    </div>
  );
};