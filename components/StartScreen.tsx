
import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft, MoreHorizontal, Droplets, ChevronRight, Sparkles } from 'lucide-react';
import { ASSETS, TEXTS, LOADING_TEXTS } from '../constants';

interface StartScreenProps {
  onGenerate: () => void;
  isGenerating: boolean;
  seedImage: string;
}

export const StartScreen: React.FC<StartScreenProps> = ({ 
  onGenerate, 
  isGenerating, 
  seedImage
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [progress, setProgress] = useState(0);
  const [isWatering, setIsWatering] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  
  const isReady = progress >= 100;

  // Manually enforce referrer policy on mount
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.referrerPolicy = "no-referrer";
    }
  }, []);

  // Cycle loading texts
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setLoadingTextIndex(prev => (prev + 1) % LOADING_TEXTS.length);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleInteraction = () => {
    if (isGenerating || isWatering || isReady) return;

    // Start Watering Sequence
    setIsWatering(true);
    const audio = new Audio(ASSETS.SOUND_WATER);
    audio.volume = 0.5;
    audio.play().catch(e => console.error("Audio play failed", e));
    
    const duration = 2000; // 2 seconds to fill
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);
      
      if (newProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setIsWatering(false);
        
        // Auto trigger generation after animation completes
        // Play grow sound immediately
        const growAudio = new Audio(ASSETS.SOUND_GROW);
        growAudio.volume = 0.6;
        growAudio.play().catch(e => console.error("Audio play failed", e));

        // Short delay to show full bar before transition
        setTimeout(() => {
          onGenerate();
        }, 600);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const getButtonText = () => {
    if (isGenerating) return LOADING_TEXTS[loadingTextIndex];
    if (isWatering) return "正在注入能量...";
    if (isReady) return "能量充盈"; // Transitional text before generating
    return TEXTS.BUTTON_GENERATE;
  };

  const getButtonSubText = () => {
    if (isGenerating) return "Generating...";
    if (isWatering) return "Injecting Energy...";
    if (isReady) return "Ready to Grow";
    return "Tap to Water";
  };

  return (
    <div className="bg-gradient-to-br from-[#ffe8cc] via-[#ebf7ee] to-[#d6f5d6] h-[100dvh] w-full relative overflow-hidden flex flex-col items-center animate-gradient-xy text-slate-800">
      {/* Ambient Background Blobs - Parallax could be added here */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-200/40 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse delay-700"></div>

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
              <div className="relative h-full max-h-[50vh] aspect-square flex items-center justify-center group">
                  {/* Energy Aura */}
                  <div 
                    className="absolute inset-0 m-auto w-[90%] h-[90%] bg-gradient-to-tr from-orange-100 to-green-100 rounded-full blur-3xl transition-opacity duration-300"
                    style={{ opacity: 0.3 + (progress / 100) * 0.5 }}
                  ></div>
                  
                  {/* Water Ripples - Visible when watering */}
                  {isWatering && (
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping opacity-60"></div>
                  )}

                  <div className={`relative h-[80%] aspect-square rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 z-10 
                      ${isReady ? 'shadow-[0_0_50px_rgba(19,236,91,0.4)] border-primary/40' : 'shadow-green-900/10 border-white/40'}
                      backdrop-blur-sm bg-gradient-to-br from-white/30 to-white/10`}>
                    <img 
                      ref={imgRef}
                      src={seedImage} 
                      alt="Floating Seed" 
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-transform duration-[3s] ease-out block ${isGenerating ? 'scale-125 saturate-150' : 'scale-105 hover:scale-110'}`}
                    />
                  </div>

                  {/* Floating Particles - Appear based on progress */}
                  <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-yellow-300 rounded-full blur-[1px] animate-pulse shadow-[0_0_10px_rgba(253,224,71,0.8)]"></div>
                  <div className={`absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full blur-[0.5px] opacity-80 animate-bounce delay-100 transition-opacity duration-500 ${progress > 20 ? 'opacity-80' : 'opacity-0'}`}></div>
                  <div className={`absolute top-1/3 left-8 w-3 h-3 bg-white/40 rounded-full blur-[4px] animate-pulse delay-300 transition-opacity duration-500 ${progress > 60 ? 'opacity-100' : 'opacity-0'}`}></div>
                  <div className={`absolute bottom-10 right-10 w-2 h-2 bg-primary rounded-full blur-[2px] animate-ping delay-500 transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>
            </div>

            {/* Text Content - Fixed/Shrinkable */}
            <div className={`text-center space-y-2 z-20 shrink-0 pb-2 transition-opacity duration-500 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
              <div className={`inline-block px-3 py-1 rounded-full glass-panel border transition-colors duration-500 ${isReady ? 'border-primary/50 bg-primary/10' : 'border-white/50'}`}>
                <p className={`text-xs font-bold tracking-widest uppercase transition-colors ${isReady ? 'text-primary-dark' : 'text-stone-600'}`}>
                  {isReady ? '能量充盈 · Ready' : '休眠状态 · Dormant'}
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
              onClick={handleInteraction}
              disabled={isGenerating || isWatering || isReady}
              className={`group relative w-full max-w-[340px] h-16 sm:h-20 rounded-2xl backdrop-blur-xl border shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] transition-all duration-300 overflow-hidden active:scale-95
                ${isReady 
                  ? 'bg-primary/20 border-primary/50 hover:shadow-[0_8px_32px_0_rgba(19,236,91,0.3)] animate-pop' 
                  : 'bg-white/10 border-white/40 hover:bg-white/20'
                }
                ${(isGenerating || isWatering) ? 'cursor-not-allowed opacity-90' : ''}
              `}
            >
              {/* Progress Bar Background */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary-dark/30 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
              
              {/* Shimmer Effect */}
              <div className={`absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full ${isGenerating ? 'animate-[shimmer_0.8s_infinite]' : isReady ? 'animate-[shimmer_2s_infinite]' : ''}`}></div>
              
              <div className="relative flex items-center justify-between px-6 sm:px-8 h-full">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border transition-colors duration-300
                    ${isReady ? 'bg-primary text-white border-primary-dark' : 'bg-white/20 text-white/90 border-white/30'}
                  `}>
                    {isReady ? <Sparkles className="w-5 h-5 animate-spin-slow" /> : <Droplets className="w-5 h-5" />}
                  </div>
                  <div className="flex flex-col items-start text-earth-dark/90">
                    <span className="text-lg sm:text-xl font-bold tracking-wider text-shadow-sm min-w-[140px] text-left transition-all duration-300">
                      {getButtonText()}
                    </span>
                    <span className="text-[10px] font-bold opacity-70 tracking-[0.2em] uppercase">
                      {getButtonSubText()}
                    </span>
                  </div>
                </div>
                {isReady && <ChevronRight className="text-earth-dark/60 w-6 h-6 animate-pulse" />}
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
