import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function StoryModal({ story, onClose, onNext }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/story/${story.id}`;
    if (navigator.share) {
      navigator.share({
        title: `100 Bàn Tay Dựng Xây - ${story.job}`,
        text: story.quote,
        url: shareUrl,
      });
    } else {
      alert('Copy link to share: ' + shareUrl);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#101518]/95 backdrop-blur-md z-40 touch-none"
      />
      
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={(e, info) => {
          if (info.offset.y > 100) onClose();
        }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="fixed bottom-0 left-0 md:left-auto md:right-0 z-50 w-full h-[88dvh] md:h-screen md:w-[600px] lg:w-[700px] bg-[#101518] border-t md:border-t-0 md:border-l border-[#272A6E] flex flex-col overflow-hidden shadow-[-20px_0_50px_rgba(59,42,133,0.3)]"
      >
        {/* Drag handle for mobile */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1 bg-[#272A6E] rounded-full"></div>
        </div>

        {/* Header - Cyber Editorial Style */}
        <div className="flex justify-between items-center px-6 py-4 md:py-5 border-b border-[#272A6E]">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#179FE8]">
            RECORD No. {String(story.id).padStart(3, '0')}
          </div>
          <button 
            onClick={onClose}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-[#DDE1E6] transition-colors"
          >
            [ Đóng ]
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-[100px]">
          
          <div className="w-full h-[40vh] md:h-[45vh] bg-[#181f24] border-b border-[#272A6E] relative">
            <img 
              src={story.image} 
              alt="" 
              className="w-full h-full object-cover grayscale-[0.1] contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101518] via-transparent to-transparent opacity-60"></div>
          </div>

          <div className="px-6 py-10 md:px-12 md:py-16">
            
            <div className="flex gap-4 mb-8">
              <div className="text-xs uppercase tracking-widest text-[#6E2BDB] font-bold bg-[#3B2A85]/40 px-3 py-1 border border-[#6E2BDB]/40">
                {story.region}
              </div>
              <div className="text-xs uppercase tracking-widest text-[#179FE8] font-bold bg-[#0C6ED9]/20 px-3 py-1 border border-[#179FE8]/40">
                {story.job}
              </div>
            </div>

            <h2 className="font-heading text-5xl md:text-7xl font-bold text-[#DDE1E6] mb-10 leading-[0.9] tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(110,43,219,0.25)]">
              {story.stat}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] gap-8 mb-12">
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
                {story.story}
              </p>
              <div className="hidden md:block w-[1px] bg-[#272A6E]"></div>
              <div className="relative">
                <svg className="w-6 h-6 text-[#532DA3] mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="font-serif text-lg md:text-xl text-[#DDE1E6] italic font-medium leading-snug">
                  {story.quote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions - Brutalist Cyber Footer */}
        <div className="absolute bottom-0 left-0 w-full border-t border-[#272A6E] bg-[#101518] flex">
          <button 
            onClick={onNext}
            className="flex-1 py-5 px-6 text-left hover:bg-[#181f24] transition-colors group"
          >
            <div className="text-[10px] uppercase tracking-widest text-[#179FE8] mb-1 font-semibold group-hover:text-[#6E2BDB] transition-colors">Explore</div>
            <div className="text-sm font-bold text-[#DDE1E6] uppercase tracking-wider">Tiếp theo</div>
          </button>
          
          <button 
            onClick={handleShare}
            className="w-32 border-l border-[#272A6E] flex flex-col justify-center items-center hover:bg-[#532DA3] hover:text-white text-zinc-400 transition-all group"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold group-hover:text-white">Share</span>
          </button>
        </div>
      </motion.div>
    </>
  );
}
