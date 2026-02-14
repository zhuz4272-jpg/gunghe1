import React, { useRef, useState } from 'react';
import { Download, Share2, ArrowLeft } from 'lucide-react';
import { ASSETS, TEXTS } from '../constants';
import { toPng } from 'html-to-image';

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
      // Small delay to ensure any layout shifts are settled
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true, 
        pixelRatio: 2,
        backgroundColor: '#fdfbf7' // Ensure background color is captured
      });
      
      const link = document.createElement('a');
      link.download = `oasis-specimen-${TEXTS.SPECIMEN_NO}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to save image', err);
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

        {/* Back Button */}
        <div className="absolute top-4 left-6 z-50">
           <button 
             onClick={onReset}
             className="w-10 h-10 flex items-center justify-center rounded-full glass-panel hover:bg-white/60 transition-colors shadow-sm text-stone-600"
           >
             <ArrowLeft className="w-5 h-5" />
           </button>
        </div>

        <main className="relative z-20 w-full h-full flex flex-col items-center px-6 pb-6 pt-16 sm:pt-6">
            <div className="flex-1 w-full max-w-md flex flex-col justify-center min-h-0">
                
                {/* The Paper Card - Wrapper for scaling */}
                <div className="w-full flex-shrink-1 min-h-0 flex flex-col">
                    <div ref={cardRef} className="w-full bg-earth-light rounded-[2px] shadow-paper relative overflow-hidden flex flex-col items-center transform transition-transform">
                        {/* Texture Overlay */}
                        <div className="texture-overlay"></div>
                        {/* Top decorative stripe */}
                        <div className="w-full h-2 bg-olive-green/20 absolute top-0 left-0"></div>

                        <div className="relative z-10 w-full p-6 flex flex-col items-center h-full">
                            
                            {/* Header Label */}
                            <div className="mb-4 relative shrink-0">
                                <span className="font-serif italic text-olive-green text-lg tracking-widest border-b border-olive-green/30 pb-1">
                                    {TEXTS.RESULT_TITLE}
                                </span>
                            </div>

                            {/* Image Specimen - Flexible height container */}
                            <div className="relative w-full flex-1 min-h-0 flex items-center justify-center py-2">
                                <div className="absolute w-2/3 h-2/3 bg-olive-green/10 rounded-full blur-xl"></div>
                                <img 
                                    src={ASSETS.CACTUS_IMAGE} 
                                    alt="Botanical illustration of a cactus" 
                                    className="relative z-10 w-auto h-full max-h-[35vh] object-contain mix-blend-multiply opacity-90 filter contrast-125 sepia-[0.2]" 
                                />
                            </div>

                            {/* Text Content */}
                            <div className="text-center w-full space-y-3 shrink-0 mt-2">
                                <h1 className="font-serif text-3xl font-bold text-earth-dark tracking-wide">
                                    {TEXTS.RESULT_NAME}
                                </h1>

                                <div className="w-12 h-px bg-stone-gray/30 mx-auto"></div>

                                {/* Tag */}
                                <div className="inline-flex items-baseline justify-center space-x-2">
                                    <span className="font-serif font-bold text-terracotta text-lg border border-terracotta/30 px-2 py-0.5 rounded-[4px] bg-terracotta/5">
                                        {TEXTS.RESULT_TAG_TYPE}
                                    </span>
                                    <span className="font-serif text-earth-dark/80 text-lg">
                                        {TEXTS.RESULT_TAG_TEXT}
                                    </span>
                                </div>

                                {/* Quote */}
                                <div className="mt-2 px-2">
                                    <p className="text-earth-dark/70 leading-relaxed font-serif text-sm sm:text-base italic line-clamp-3">
                                        {TEXTS.RESULT_QUOTE}
                                    </p>
                                </div>

                                {/* Card Footer Details */}
                                <div className="pt-4 w-full flex justify-between items-end border-t border-dashed border-stone-gray/30 mt-2">
                                    <div className="flex flex-col items-start">
                                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone-gray">Collection</span>
                                        <span className="font-serif text-olive-green font-medium text-sm">{TEXTS.COLLECTION}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone-gray">Specimen No.</span>
                                        <span className="font-serif text-earth-dark font-medium text-sm">{TEXTS.SPECIMEN_NO}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full mt-6 mb-2 flex items-center justify-center space-x-12 shrink-0 h-24">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="group relative flex flex-col items-center justify-center outline-none active:scale-95 transition-transform"
                    >
                        <div className="w-16 h-16 bg-[#a83e38] rounded-xl shadow-md border-4 border-[#8f322d] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 relative">
                            <div className="absolute inset-0 border border-white/20 rounded-lg m-1 opacity-50"></div>
                            {isSaving ? (
                                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <Download className="text-[#fdfbf7] w-8 h-8 opacity-90" />
                            )}
                        </div>
                        <div className="mt-3 flex flex-col items-center">
                            <span className="font-serif text-sm font-bold text-earth-dark/60 tracking-widest group-hover:text-terracotta transition-colors">
                                保存相册
                            </span>
                            <span className="font-serif text-xs text-earth-dark/40 scale-90">
                                寻找同类
                            </span>
                        </div>
                    </button>
                </div>

            </div>
        </main>
    </div>
  );
};