import React, { useRef, useState } from 'react';
import { Download, Share2, ArrowLeft, RefreshCw } from 'lucide-react';
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
      // Dynamically import html-to-image to avoid initial load issues
      const { toPng } = await import('html-to-image');
      
      // Small delay to ensure any layout shifts are settled
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true, 
        pixelRatio: 2,
        backgroundColor: '#fdfbf7', // Ensure background color is captured
        style: {
          transform: 'scale(1)', // Ensure no scaling transform affects the output
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
    <div className="bg-[#ecebe4] font-sans text-earth-dark h-full w-full flex flex-col relative overflow-hidden animate-in fade-in duration-1000">
        {/* Background Ambience */}
        <div className="absolute inset-0 z-0">
            <div className="leaf-shadow absolute w-full h-full top-0 left-0 pointer-events-none"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-[#d8dcd3] rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] bg-[#e3dcd3] rounded-full blur-3xl opacity-60"></div>
        </div>

        {/* Floating Light Effect top right */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-olive-green/5 blur-[80px] rounded-full pointer-events-none z-30 mix-blend-multiply"></div>
        {/* Floating Light Effect bottom left */}
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-terracotta/5 blur-[60px] rounded-full pointer-events-none z-30 mix-blend-multiply"></div>

        {/* Header Bar */}
        <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50">
           <button 
             onClick={onReset}
             className="w-10 h-10 flex items-center justify-center rounded-full glass-panel hover:bg-white/60 transition-colors shadow-sm text-stone-600"
           >
             <ArrowLeft className="w-5 h-5" />
           </button>
           <div className="text-stone-500 font-serif text-xs tracking-widest uppercase opacity-60">
             {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
           </div>
           <div className="w-10"></div> {/* Spacer for balance */}
        </header>

        <main className="relative z-20 w-full h-full flex flex-col items-center px-4 pb-6 pt-16">
            <div className="flex-1 w-full max-w-sm flex flex-col justify-center min-h-0">
                
                {/* The Paper Card - Wrapper for scaling */}
                <div className="w-full flex-shrink-1 min-h-0 flex flex-col items-center justify-center py-2">
                    <div ref={cardRef} className="w-full bg-earth-light rounded-[4px] shadow-2xl relative overflow-hidden flex flex-col items-center transform transition-transform">
                        {/* Texture Overlay */}
                        <div className="texture-overlay"></div>
                        
                        {/* Inner Frame */}
                        <div className="absolute inset-2 border border-olive-green/10 pointer-events-none"></div>
                        <div className="absolute inset-3 border border-olive-green/5 pointer-events-none"></div>

                        <div className="relative z-10 w-full p-6 flex flex-col items-center h-full">
                            
                            {/* Header Label */}
                            <div className="w-full flex justify-between items-start mb-2 relative shrink-0">
                                <div className="flex flex-col">
                                    <span className="font-serif italic text-olive-green text-sm tracking-widest">
                                        {TEXTS.RESULT_TITLE}
                                    </span>
                                    <div className="w-8 h-0.5 bg-olive-green/30 mt-1"></div>
                                </div>
                                <div className="border border-stone-300 rounded-full px-2 py-0.5">
                                    <span className="text-[10px] font-sans uppercase tracking-widest text-stone-500">NO. {TEXTS.SPECIMEN_NO}</span>
                                </div>
                            </div>

                            {/* Image Specimen - Flexible height container */}
                            <div className="relative w-full aspect-square flex items-center justify-center my-2 p-2 bg-gradient-to-b from-white/40 to-transparent rounded-full">
                                <div className="absolute w-2/3 h-2/3 bg-olive-green/10 rounded-full blur-xl animate-pulse"></div>
                                <img 
                                    src={ASSETS.CACTUS_IMAGE} 
                                    crossOrigin="anonymous"
                                    alt="Botanical illustration of a cactus" 
                                    className="relative z-10 w-full h-full object-contain mix-blend-multiply opacity-95 filter contrast-110" 
                                />
                            </div>

                            {/* Text Content */}
                            <div className="text-center w-full space-y-4 shrink-0 mt-2">
                                <h1 className="font-serif text-3xl sm:text-4xl font-black text-earth-dark tracking-wide">
                                    {TEXTS.RESULT_NAME}
                                </h1>

                                {/* Tag & Stamp */}
                                <div className="relative py-2">
                                    <div className="inline-flex items-center justify-center space-x-3 px-4 py-1 relative z-10">
                                        <div className="flex flex-col items-center">
                                            <span className="font-serif font-bold text-terracotta text-xl">{TEXTS.RESULT_TAG_TYPE}</span>
                                        </div>
                                        <div className="h-8 w-px bg-stone-300 transform rotate-12"></div>
                                        <span className="font-serif text-earth-dark/90 text-lg tracking-wide border-b border-dashed border-stone-300 pb-0.5">
                                            {TEXTS.RESULT_TAG_TEXT}
                                        </span>
                                    </div>
                                    
                                    {/* Decorative Stamp */}
                                    <div className="absolute -right-2 top-0 transform rotate-[-15deg] opacity-80 mix-blend-multiply pointer-events-none border-2 border-seal-red rounded-full w-16 h-16 flex items-center justify-center">
                                        <div className="absolute inset-0.5 border border-seal-red rounded-full opacity-60"></div>
                                        <span className="text-[10px] text-seal-red font-bold uppercase tracking-widest text-center leading-tight">
                                            Oasis<br/>Verified
                                        </span>
                                    </div>
                                </div>

                                {/* Quote */}
                                <div className="mt-4 px-4 py-4 bg-paper-texture border-t border-b border-stone-100 relative">
                                    <span className="absolute top-0 left-2 text-4xl text-stone-200 font-serif leading-none">“</span>
                                    <p className="text-earth-dark/80 leading-relaxed font-serif text-sm sm:text-base italic relative z-10">
                                        {TEXTS.RESULT_QUOTE}
                                    </p>
                                    <span className="absolute bottom-0 right-2 text-4xl text-stone-200 font-serif leading-none transform rotate-180">“</span>
                                </div>

                                {/* Card Footer Details */}
                                <div className="pt-4 w-full flex justify-center items-center opacity-60">
                                    <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-stone-gray font-bold">
                                        <span>—</span>
                                        <span>{TEXTS.COLLECTION}</span>
                                        <span>—</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full mt-6 flex items-center justify-center gap-6 shrink-0 pb-6">
                    <button 
                      onClick={onReset}
                      className="flex flex-col items-center justify-center group"
                    >
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-stone-400 group-hover:text-olive-green group-hover:shadow-md transition-all">
                             <RefreshCw className="w-5 h-5" />
                        </div>
                        <span className="mt-2 text-xs font-medium text-stone-400 uppercase tracking-wider">重置</span>
                    </button>

                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="group relative flex flex-col items-center justify-center outline-none active:scale-95 transition-transform"
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-terracotta to-[#a83e38] rounded-2xl shadow-lg shadow-terracotta/20 border-2 border-[#fff1e6]/20 flex items-center justify-center transform group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20"></div>
                            {isSaving ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <Download className="text-white w-7 h-7 drop-shadow-md" />
                            )}
                        </div>
                        <div className="mt-3 flex flex-col items-center">
                            <span className="font-serif text-sm font-bold text-earth-dark/70 tracking-widest group-hover:text-terracotta transition-colors">
                                留存标本
                            </span>
                        </div>
                    </button>

                     <button 
                      className="flex flex-col items-center justify-center group cursor-not-allowed opacity-50"
                    >
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-stone-400">
                             <Share2 className="w-5 h-5" />
                        </div>
                        <span className="mt-2 text-xs font-medium text-stone-400 uppercase tracking-wider">分享</span>
                    </button>
                </div>

            </div>
        </main>
    </div>
  );
};