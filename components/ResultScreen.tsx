
import React, { useRef, useState, useEffect } from 'react';
import { Download, ArrowLeft } from 'lucide-react';
import { ASSETS, TEXTS, SpecimenPreset } from '../constants';

interface ResultScreenProps {
  onReset: () => void;
  data: SpecimenPreset;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ onReset, data }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback timer to force show content if image hangs
  useEffect(() => {
    const timer = setTimeout(() => {
        if (!isLoaded) setIsLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  const handleBack = () => {
    // Play Click Sound
    const audio = new Audio(ASSETS.SOUND_CLICK);
    audio.volume = 0.4;
    audio.play().catch(e => console.error("Audio play failed", e));
    
    onReset();
  };

  const handleSave = async () => {
    if (cardRef.current === null) return;
    
    // Play Camera Shutter Sound
    const audio = new Audio(ASSETS.SOUND_SHUTTER);
    audio.volume = 0.5;
    audio.play().catch(e => console.error("Audio play failed", e));

    setIsSaving(true);
    try {
      const { toPng } = await import('html-to-image');
      
      // Wait a bit for any layout shifts
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: false,
        pixelRatio: 3, // Higher quality for saved image
        backgroundColor: '#fdfbf7',
        skipAutoScale: true,
      });
      
      const link = document.createElement('a');
      link.download = `oasis-specimen-${TEXTS.SPECIMEN_NO}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to save image', err);
      alert('保存图片失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#ecebe4] font-sans text-earth-dark h-[100dvh] w-full flex flex-col relative overflow-hidden">
        
        {/* Full Screen Loading Overlay */}
        <div 
            className={`absolute inset-0 z-[100] bg-[#ecebe4] flex flex-col items-center justify-center transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <div className="w-10 h-10 border-2 border-stone-200 border-t-olive-green rounded-full animate-spin mb-4"></div>
            <p className="font-serif text-[10px] tracking-[0.2em] text-stone-400 uppercase animate-pulse">
                Developing...
            </p>
        </div>

        {/* Content Wrapper - Revealed when loaded */}
        <div className={`w-full h-full flex flex-col relative z-20 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="leaf-shadow absolute w-full h-full top-0 left-0 pointer-events-none"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-[#d8dcd3] rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] bg-[#e3dcd3] rounded-full blur-3xl opacity-60"></div>
            </div>

            {/* Floating Light Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-olive-green/5 blur-[80px] rounded-full pointer-events-none z-30 mix-blend-multiply"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-terracotta/5 blur-[60px] rounded-full pointer-events-none z-30 mix-blend-multiply"></div>

            {/* Header Bar */}
            <header className="w-full p-2 flex justify-between items-center z-50 shrink-0 relative">
            <button 
                onClick={handleBack}
                className="w-9 h-9 flex items-center justify-center rounded-full glass-panel hover:bg-white/60 transition-colors shadow-sm text-stone-600"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="text-stone-500 font-serif text-[10px] tracking-widest uppercase opacity-60">
                {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
            </div>
            <div className="w-9"></div>
            </header>

            {/* Main Flex Container */}
            <div className="flex-1 min-h-0 w-full flex flex-col px-4 pb-2 relative z-20 items-center">
                
                {/* Card Area */}
                <div className={`flex-1 min-h-0 w-full flex items-center justify-center mb-2 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
                    <div ref={cardRef} className="w-full max-w-[320px] sm:max-w-sm h-auto max-h-full bg-earth-light rounded-[4px] shadow-2xl relative overflow-hidden flex flex-col items-center">
                        {/* Texture Overlay */}
                        <div className="texture-overlay"></div>
                        
                        {/* Inner Frame Borders */}
                        <div className="absolute inset-2 border border-olive-green/10 pointer-events-none z-20"></div>
                        <div className="absolute inset-3 border border-olive-green/5 pointer-events-none z-20"></div>

                        {/* Card Content - Compact Layout */}
                        <div className="relative z-10 w-full px-5 py-8 flex flex-col h-full items-center">
                            
                            {/* Header Section - Shrink 0 */}
                            <div className="w-full flex justify-between items-start mb-1 shrink-0">
                                <div className="flex flex-col">
                                    <span className="font-serif italic text-olive-green text-[9px] tracking-widest">
                                        {TEXTS.RESULT_TITLE}
                                    </span>
                                    <div className="w-6 h-px bg-olive-green/30 mt-0.5"></div>
                                </div>
                                <div className="border border-stone-300 rounded-full px-2 py-0.5">
                                    <span className="text-[10px] font-sans uppercase tracking-widest text-stone-500 font-bold">NO. {TEXTS.SPECIMEN_NO}</span>
                                </div>
                            </div>

                            {/* Image Specimen - Border Removed, Spacing Increased */}
                            <div className="flex-1 w-full flex items-center justify-center min-h-0 py-1 mb-8 group">
                                <div className="relative aspect-square h-full max-h-[280px] sm:max-h-[350px] w-auto max-w-full flex items-center justify-center">
                                    
                                    {/* Holographic Shine Effect Overlay */}
                                    <div className="absolute inset-0 z-30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                                        <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shine-sweep"></div>
                                    </div>

                                    {data.isIllustration ? (
                                    <div className="w-full h-full flex items-center justify-center relative">
                                        <img 
                                            src={data.image} 
                                            crossOrigin="anonymous"
                                            alt="Botanical illustration" 
                                            className="relative z-10 w-full h-full object-contain filter drop-shadow-md" 
                                            onLoad={() => setIsLoaded(true)}
                                            onError={() => setIsLoaded(true)}
                                        />
                                    </div>
                                    ) : (
                                        <img 
                                            src={data.image} 
                                            crossOrigin="anonymous"
                                            alt="Botanical photo" 
                                            className="w-full h-full object-cover rounded-[1rem] shadow-sm" 
                                            onLoad={() => setIsLoaded(true)}
                                            onError={() => setIsLoaded(true)}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Bottom Section: Text Content - Compact - Staggered Reveal */}
                            <div className="text-center w-full shrink-0 flex flex-col gap-1 pb-1">
                                <h1 className={`font-serif text-lg sm:text-xl font-black text-earth-dark tracking-wide leading-none mt-1 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                    {data.name}
                                </h1>

                                {/* Tag & Stamp Container */}
                                <div className={`relative w-full flex justify-center py-0.5 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                    {/* Tag Info */}
                                    <div className="inline-flex items-center justify-center space-x-2 px-4 relative z-10">
                                        <div className="flex flex-col items-center">
                                            <span className={`font-serif font-bold text-sm ${data.tagType.includes('忌') ? 'text-seal-red' : 'text-terracotta'}`}>
                                                {data.tagType}
                                            </span>
                                        </div>
                                        <div className="h-3 w-px bg-stone-300 transform rotate-12"></div>
                                        <span className="font-serif text-earth-dark/90 text-xs tracking-wide border-b border-dashed border-stone-300 pb-px">
                                            {data.tagText}
                                        </span>
                                    </div>
                                    
                                    {/* Stamp - Positioned further out and scaled down to avoid overlap */}
                                    <div className={`absolute right-2 top-1/2 -translate-y-1/2 transform rotate-[-15deg] opacity-80 mix-blend-multiply pointer-events-none border border-seal-red rounded-full w-8 h-8 flex items-center justify-center z-0 scale-90 transition-all duration-500 delay-700 ${isLoaded ? 'scale-90 opacity-80' : 'scale-150 opacity-0'}`}>
                                        <div className="absolute inset-0.5 border border-seal-red rounded-full opacity-60"></div>
                                        <span className="text-[5px] text-seal-red font-bold uppercase tracking-widest text-center leading-tight">
                                            Oasis<br/>Verified
                                        </span>
                                    </div>
                                </div>

                                {/* Quote - Tighter padding */}
                                <div className={`px-3 py-1.5 bg-paper-texture border-t border-b border-stone-100 relative my-0.5 mx-2 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                                    <span className="absolute top-0 left-1 text-base text-stone-300 font-serif leading-none">“</span>
                                    <p className="text-earth-dark/80 leading-relaxed font-serif text-[9px] sm:text-[10px] italic relative z-10 line-clamp-3">
                                        {data.quote}
                                    </p>
                                    <span className="absolute bottom-0 right-1 text-base text-stone-300 font-serif leading-none transform rotate-180">“</span>
                                </div>

                                {/* Card Footer Details */}
                                <div className={`pt-0.5 w-full flex justify-center items-center opacity-50 transition-opacity duration-1000 delay-1000 ${isLoaded ? 'opacity-50' : 'opacity-0'}`}>
                                    <div className="flex items-center space-x-2 text-[5px] uppercase tracking-[0.3em] text-stone-gray font-bold">
                                        <span>—</span>
                                        <span>{TEXTS.COLLECTION}</span>
                                        <span>—</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Fixed at bottom */}
                <div className="shrink-0 w-full flex items-center justify-center pb-2">
                    <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="group relative flex flex-col items-center justify-center outline-none active:scale-95 transition-transform"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-terracotta to-[#a83e38] rounded-xl shadow-lg shadow-terracotta/20 border-2 border-[#fff1e6]/20 flex items-center justify-center transform group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20"></div>
                            {isSaving ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <Download className="text-white w-4 h-4 drop-shadow-md" />
                            )}
                        </div>
                        <div className="mt-1 flex flex-col items-center">
                            <span className="font-serif text-[9px] font-bold text-earth-dark/70 tracking-widest group-hover:text-terracotta transition-colors">
                                留存标本
                            </span>
                        </div>
                    </button>
                </div>

            </div>
        </div>
    </div>
  );
};
