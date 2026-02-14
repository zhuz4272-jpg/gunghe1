import React, { useRef, useState } from 'react';
import { Download, ArrowLeft } from 'lucide-react';
import { ASSETS, TEXTS } from '../constants';

interface ResultScreenProps {
  onReset: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ onReset }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (cardRef.current === null) return;
    
    setIsSaving(true);
    try {
      const { toPng } = await import('html-to-image');
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true, 
        pixelRatio: 2,
        backgroundColor: '#fdfbf7',
        style: {
          transform: 'scale(1)',
        }
      });
      
      const link = document.createElement('a');
      link.download = `oasis-specimen-${TEXTS.SPECIMEN_NO}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to save image', err);
      alert('保存图片失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#ecebe4] font-sans text-earth-dark h-[100dvh] w-full flex flex-col relative overflow-hidden animate-in fade-in duration-1000">
        {/* Background Ambience */}
        <div className="absolute inset-0 z-0">
            <div className="leaf-shadow absolute w-full h-full top-0 left-0 pointer-events-none"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-[#d8dcd3] rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] bg-[#e3dcd3] rounded-full blur-3xl opacity-60"></div>
        </div>

        {/* Floating Light Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-olive-green/5 blur-[80px] rounded-full pointer-events-none z-30 mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-terracotta/5 blur-[60px] rounded-full pointer-events-none z-30 mix-blend-multiply"></div>

        {/* Header Bar - Now part of Flex flow to avoid overlap */}
        <header className="w-full p-4 flex justify-between items-center z-50 shrink-0 relative">
           <button 
             onClick={onReset}
             className="w-10 h-10 flex items-center justify-center rounded-full glass-panel hover:bg-white/60 transition-colors shadow-sm text-stone-600"
           >
             <ArrowLeft className="w-5 h-5" />
           </button>
           <div className="text-stone-500 font-serif text-xs tracking-widest uppercase opacity-60">
             {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
           </div>
           <div className="w-10"></div>
        </header>

        {/* Main Flex Container */}
        <div className="flex-1 min-h-0 w-full flex flex-col px-4 pb-4 relative z-20">
            
            {/* Card Area - Flexible Height */}
            <div className="flex-1 min-h-0 w-full flex items-center justify-center mb-2">
                <div ref={cardRef} className="w-full max-w-sm max-h-full bg-earth-light rounded-[4px] shadow-2xl relative overflow-hidden flex flex-col items-center">
                    {/* Texture Overlay */}
                    <div className="texture-overlay"></div>
                    
                    {/* Inner Frame Borders */}
                    <div className="absolute inset-2 border border-olive-green/10 pointer-events-none"></div>
                    <div className="absolute inset-3 border border-olive-green/5 pointer-events-none"></div>

                    {/* Card Content - Flex Column */}
                    <div className="relative z-10 w-full p-4 flex flex-col h-full items-center">
                        
                        {/* Header Label - Fixed */}
                        <div className="w-full flex justify-between items-start mb-1 shrink-0">
                            <div className="flex flex-col">
                                <span className="font-serif italic text-olive-green text-xs tracking-widest">
                                    {TEXTS.RESULT_TITLE}
                                </span>
                                <div className="w-6 h-px bg-olive-green/30 mt-1"></div>
                            </div>
                            <div className="border border-stone-300 rounded-full px-2 py-px">
                                <span className="text-[8px] font-sans uppercase tracking-widest text-stone-500">NO. {TEXTS.SPECIMEN_NO}</span>
                            </div>
                        </div>

                        {/* Image Specimen - Flexible Height */}
                        <div className="flex-1 min-h-0 w-full relative flex items-center justify-center my-1 p-2 bg-gradient-to-b from-white/40 to-transparent rounded-full">
                            <div className="absolute w-2/3 h-2/3 bg-olive-green/10 rounded-full blur-xl animate-pulse"></div>
                            <img 
                                src={ASSETS.CACTUS_IMAGE} 
                                crossOrigin="anonymous"
                                alt="Botanical illustration" 
                                className="relative z-10 max-h-full max-w-full object-contain mix-blend-multiply opacity-95 filter contrast-110" 
                            />
                        </div>

                        {/* Text Content - Fixed or naturally sized */}
                        <div className="text-center w-full shrink-0 mt-1 flex flex-col gap-1 sm:gap-2">
                            <h1 className="font-serif text-xl sm:text-3xl font-black text-earth-dark tracking-wide leading-tight">
                                {TEXTS.RESULT_NAME}
                            </h1>

                            {/* Tag & Stamp */}
                            <div className="relative py-1">
                                <div className="inline-flex items-center justify-center space-x-2 px-4 relative z-10">
                                    <div className="flex flex-col items-center">
                                        <span className="font-serif font-bold text-terracotta text-base sm:text-lg">{TEXTS.RESULT_TAG_TYPE}</span>
                                    </div>
                                    <div className="h-5 sm:h-6 w-px bg-stone-300 transform rotate-12"></div>
                                    <span className="font-serif text-earth-dark/90 text-sm sm:text-base tracking-wide border-b border-dashed border-stone-300 pb-0.5">
                                        {TEXTS.RESULT_TAG_TEXT}
                                    </span>
                                </div>
                                
                                {/* Stamp */}
                                <div className="absolute -right-2 -top-1 transform rotate-[-15deg] opacity-80 mix-blend-multiply pointer-events-none border border-seal-red rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                                    <div className="absolute inset-0.5 border border-seal-red rounded-full opacity-60"></div>
                                    <span className="text-[7px] sm:text-[8px] text-seal-red font-bold uppercase tracking-widest text-center leading-tight">
                                        Oasis<br/>Verified
                                    </span>
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="px-3 py-2 sm:py-3 bg-paper-texture border-t border-b border-stone-100 relative mt-1">
                                <span className="absolute top-0 left-1 text-xl sm:text-2xl text-stone-200 font-serif leading-none">“</span>
                                <p className="text-earth-dark/80 leading-relaxed font-serif text-xs sm:text-sm italic relative z-10 line-clamp-3">
                                    {TEXTS.RESULT_QUOTE}
                                </p>
                                <span className="absolute bottom-0 right-1 text-xl sm:text-2xl text-stone-200 font-serif leading-none transform rotate-180">“</span>
                            </div>

                            {/* Card Footer Details */}
                            <div className="pt-1 sm:pt-2 w-full flex justify-center items-center opacity-60">
                                <div className="flex items-center space-x-2 text-[8px] uppercase tracking-[0.3em] text-stone-gray font-bold">
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
            <div className="shrink-0 w-full flex items-center justify-center">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="group relative flex flex-col items-center justify-center outline-none active:scale-95 transition-transform"
                >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-terracotta to-[#a83e38] rounded-xl shadow-lg shadow-terracotta/20 border-2 border-[#fff1e6]/20 flex items-center justify-center transform group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20"></div>
                        {isSaving ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Download className="text-white w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md" />
                        )}
                    </div>
                    <div className="mt-2 flex flex-col items-center">
                        <span className="font-serif text-xs font-bold text-earth-dark/70 tracking-widest group-hover:text-terracotta transition-colors">
                            留存标本
                        </span>
                    </div>
                </button>
            </div>

        </div>
    </div>
  );
};