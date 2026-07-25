import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function StoryModal({ story, onClose, onNext }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const shareUrl = `${window.location.origin}/story/${story.id}`;
  const shareText = `${story.quote} — ${story.job} tại ${story.region}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: `100 Bàn Tay Dựng Xây - ${story.job}`, text: shareText, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => alert('Đã copy link: ' + shareUrl));
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => alert('Đã copy link!'));
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0c0c0c]/95 backdrop-blur-sm z-40 touch-none"
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
        className="fixed bottom-0 left-0 md:left-auto md:right-0 z-50 w-full h-[95vh] md:h-screen md:w-[600px] lg:w-[700px] bg-[#0c0c0c] border-t md:border-t-0 md:border-l border-zinc-800 flex flex-col overflow-hidden"
      >
        {/* Header - Editorial Style */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
            RECORD No. {String(story.id).padStart(3, '0')}
          </div>
          <button 
            onClick={onClose}
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
          >
            [ Đóng ]
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-[100px]">
          
          <div className="w-full h-[40vh] md:h-[45vh] bg-[#111] border-b border-zinc-800">
            <img 
              src={story.image} 
              alt="" 
              className="w-full h-full object-cover grayscale-[0.2] contrast-125"
            />
          </div>

          <div className="px-6 py-10 md:px-12 md:py-16">
            
            <div className="flex gap-4 mb-8">
              <div className="text-xs uppercase tracking-widest text-[#FF5C00] font-medium">
                {story.region}
              </div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 font-medium border-l border-zinc-800 pl-4">
                {story.job}
              </div>
            </div>

            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-10 leading-[0.9] tracking-tighter uppercase">
              {story.stat}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] gap-8 mb-12">
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
                {story.story}
              </p>
              <div className="hidden md:block w-[1px] bg-zinc-800"></div>
              <div className="relative">
                <svg className="w-6 h-6 text-zinc-700 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="font-serif text-lg md:text-xl text-white italic font-medium leading-snug">
                  {story.quote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions - Brutalist Footer */}
        <div className="absolute bottom-0 left-0 w-full border-t border-zinc-800 bg-[#0c0c0c] flex">
          <button 
            onClick={onNext}
            className="flex-1 py-5 px-6 text-left hover:bg-[#111] transition-colors"
          >
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Explore</div>
            <div className="text-sm font-medium text-white uppercase tracking-wider">Tiếp theo</div>
          </button>
          
          <div className="flex border-l border-zinc-800">
            <button 
              onClick={handleNativeShare}
              className="w-16 flex items-center justify-center hover:bg-[#FF5C00] text-zinc-400 hover:text-white transition-colors"
              title="Chia sẻ"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 flex items-center justify-center hover:bg-[#1877F2] text-zinc-400 hover:text-white transition-colors border-l border-zinc-800"
              title="Chia sẻ Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a 
              href={`https://zalo.me/share?url=${encodedUrl}&title=${encodedText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 flex items-center justify-center hover:bg-[#0068FF] text-zinc-400 hover:text-white transition-colors border-l border-zinc-800"
              title="Chia sẻ Zalo"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 16.5H7.5v-9h3v9zm1.5 0h3v-9h-3v9zm-6-12h12v12h-12v-12z"/></svg>
            </a>
            <button 
              onClick={copyLink}
              className="w-16 flex items-center justify-center hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border-l border-zinc-800"
              title="Copy link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
