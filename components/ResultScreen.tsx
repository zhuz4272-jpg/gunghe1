import React, { useRef, useState } from 'react';
import { Download, ArrowLeft, Sparkles } from 'lucide-react';
import { ASSETS, TEXTS, SpecimenPreset } from '../constants';

interface ResultScreenProps {
  onReset: () => void;
  data: SpecimenPreset;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ onReset, data }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (cardRef.current === null) return;
    
    setIsSaving(true);
    try {
      const { toPng } = await import('html-to-image');
      
      // Wait a bit for any layout shifts
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: false,
        pixelRatio: 2,
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

        {/* Header Bar */}
        <header className="w-full p-3 flex justify-between items-center z-50 shrink-0 relative">
           <button 
             onClick={onReset}
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
            
            {/* Card Area - Flex with min-height safety */}
            <div className="flex-1 min-h-0 w-full flex items-center justify-center mb-2">
                <div ref={cardRef} className="w-full max-w-sm max-h-full bg-earth-light rounded-[4px] shadow-2xl relative overflow-hidden flex flex-col items-center">
                    {/* Texture Overlay */}
                    <div className="texture-overlay"></div>
                    
                    {/* Inner Frame Borders */}
                    <div className="absolute inset-2 border border-olive-green/10 pointer-events-none z-20"></div>
                    <div className="absolute inset-3 border border-olive-green/5 pointer-events-none z-20"></div>

                    {/* Card Content - Flex Column */}
                    <div className="relative z-10 w-full p-4 flex flex-col h-full items-center justify-between">
                        
                        {/* Top Section: Header & Image */}
                        <div className="w-full flex flex-col items-center flex-1 min-h-0 overflow-hidden">
                            {/* Card Header */}
                            <div className="w-full flex justify-between items-start mb-1 shrink-0">
                                <div className="flex flex-col">
                                    <span className="font-serif italic text-olive-green text-[10px] tracking-widest">
                                        {TEXTS.RESULT_TITLE}
                                    </span>
                                    <div className="w-6 h-px bg-olive-green/30 mt-0.5"></div>
                                </div>
                                <div className="border border-stone-300 rounded-full px-1.5 py-px">
                                    <span className="text-[8px] font-sans uppercase tracking-widest text-stone-500">NO. {TEXTS.SPECIMEN_NO}</span>
                                </div>
                            </div>

                            {/* Image Specimen - Increased padding (p-8) to significantly reduce visual size */}
                            <div className="flex-1 min-h-[80px] w-full relative flex items-center justify-center my-1 rounded-lg overflow-hidden p-8">
                                {data.isIllustration ? (
                                   <>
                                     <div className="absolute w-2/3 h-2/3 bg-olive-green/10 rounded-full blur-xl animate-pulse"></div>
                                     <img 
                                        src={data.image} 
                                        crossOrigin="anonymous"
                                        alt="Botanical illustration" 
                                        className="relative z-10 max-h-[80%] max-w-[80%] object-contain mix-blend-multiply opacity-95 filter contrast-110" 
                                     />
                                   </>
                                ) : (
                                     <img 
                                        src={data.image} 
                                        crossOrigin="anonymous"
                                        alt="Botanical photo" 
                                        className="max-h-[80%] max-w-[80%] object-contain rounded-sm shadow-sm filter sepia-[0.1] contrast-[0.95]" 
                                     />
                                )}
                            </div>
                        </div>

                        {/* Bottom Section: Text Content - Compacted for mobile */}
                        <div className="text-center w-full shrink-0 mt-1 flex flex-col gap-1.5">
                            <h1 className="font-serif text-xl sm:text-2xl font-black text-earth-dark tracking-wide leading-none">
                                {data.name}
                            </h1>

                            {/* Tag & Stamp */}
                            <div className="relative py-0.5">
                                <div className="inline-flex items-center justify-center space-x-2 px-4 relative z-10">
                                    <div className="flex flex-col items-center">
                                        <span className={`font-serif font-bold text-sm sm:text-base ${data.tagType.includes('忌') ? 'text-seal-red' : 'text-terracotta'}`}>
                                            {data.tagType}
                                        </span>
                                    </div>
                                    <div className="h-4 w-px bg-stone-300 transform rotate-12"></div>
                                    <span className="font-serif text-earth-dark/90 text-xs sm:text-sm tracking-wide border-b border-dashed border-stone-300 pb-0.5">
                                        {data.tagText}
                                    </span>
                                </div>
                                
                                {/* Stamp */}
                                <div className="absolute -right-1 -top-1 transform rotate-[-15deg] opacity-80 mix-blend-multiply pointer-events-none border border-seal-red rounded-full w-9 h-9 flex items-center justify-center">
                                    <div className="absolute inset-0.5 border border-seal-red rounded-full opacity-60"></div>
                                    <span className="text-[6px] text-seal-red font-bold uppercase tracking-widest text-center leading-tight">
                                        Oasis<br/>Verified
                                    </span>
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="px-3 py-1.5 bg-paper-texture border-t border-b border-stone-100 relative">
                                <span className="absolute top-0 left-1 text-lg text-stone-300 font-serif leading-none">“</span>
                                <p className="text-earth-dark/80 leading-relaxed font-serif text-[10px] sm:text-xs italic relative z-10 line-clamp-3">
                                    {data.quote}
                                </p>
                                <span className="absolute bottom-0 right-1 text-lg text-stone-300 font-serif leading-none transform rotate-180">“</span>
                            </div>

                            {/* Lucky Nutrient CTA */}
                            <div className="w-full flex justify-center items-center">
                                <div className="flex items-center space-x-1 bg-olive-green/5 px-2 py-1 rounded-full border border-olive-green/10">
                                    <Sparkles className="w-2.5 h-2.5 text-olive-green" />
                                    <span className="text-[9px] sm:text-[10px] text-olive-green/90 font-medium tracking-wide">
                                       幸运养分：{data.cta}
                                    </span>
                                </div>
                            </div>

                            {/* Card Footer Details */}
                            <div className="pt-1 w-full flex justify-center items-center opacity-50">
                                <div className="flex items-center space-x-2 text-[6px] uppercase tracking-[0.3em] text-stone-gray font-bold">
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
            <div className="shrink-0 w-full flex items-center justify-center pb-safe">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="group relative flex flex-col items-center justify-center outline-none active:scale-95 transition-transform"
                >
                    <div className="w-11 h-11 bg-gradient-to-br from-terracotta to-[#a83e38] rounded-xl shadow-lg shadow-terracotta/20 border-2 border-[#fff1e6]/20 flex items-center justify-center transform group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20"></div>
                        {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Download className="text-white w-5 h-5 drop-shadow-md" />
                        )}
                    </div>
                    <div className="mt-1.5 flex flex-col items-center">
                        <span className="font-serif text-[10px] font-bold text-earth-dark/70 tracking-widest group-hover:text-terracotta transition-colors">
                            留存标本
                        </span>
                    </div>
                </button>
            </div>

        </div>
    </div>
  );
};