import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StoryModal({ story, onClose, onNext, onPrev }) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const getShareUrl = () => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isLocal ? 'https://100-ban-tay.vercel.app' : window.location.origin;
    return `${baseUrl}/story/${story.id}`;
  };

  const getShareText = () => {
    return `100 Bàn Tay Dựng Xây - Câu chuyện của ${story.job} tại ${story.region}:\n"${story.quote || story.story.split('\n')[0]}"\n\n👉 Khám phá tại: ${getShareUrl()}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getShareText()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const shareToFacebook = () => {
    const targetUrl = getShareUrl();
    const quoteText = `100 Bàn Tay Dựng Xây - "${story.quote || story.story.split('\n')[0]}" (${story.job} tại ${story.region})`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(targetUrl)}&quote=${encodeURIComponent(quoteText)}`;
    window.open(url, '_blank', 'width=600,height=550,scrollbars=yes');
  };

  const shareToZalo = () => {
    copyToClipboard();
    const url = `https://zalo.me/share?url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, '_blank');
  };

  const handleShareClick = () => {
    if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      navigator.share({
        title: `100 Bàn Tay Dựng Xây - ${story.job}`,
        text: `"${story.quote || story.story.split('\n')[0]}" - Câu chuyện của ${story.job} tại ${story.region}`,
        url: getShareUrl(),
      }).catch(() => setShowShareMenu(true));
    } else {
      setShowShareMenu(!showShareMenu);
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
        className="fixed inset-0 bg-white/95 backdrop-blur-md z-40 touch-none"
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
        className="fixed bottom-0 left-0 md:left-auto md:right-0 z-50 w-full h-[88dvh] max-h-dvh md:h-screen md:w-[600px] lg:w-[700px] bg-white border-t md:border-t-0 md:border-l border-zinc-200 flex flex-col overflow-hidden shadow-[-20px_0_50px_rgba(0,0,0,0.1)]"
      >
        {/* Drag handle for mobile */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1 bg-zinc-300 rounded-full"></div>
        </div>

        {/* Header - Humanist Documentary Style */}
        <div className="flex justify-between items-center px-6 py-4 md:py-5 border-b border-zinc-200 bg-white z-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#179FE8] font-mono">
            CÂU CHUYỆN SỐ {String(story.id).padStart(2, '0')}
          </div>
          <button 
            onClick={onClose}
            className="text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1.5"
          >
            <span>Đóng</span>
            <span className="text-sm">✕</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-[130px] md:pb-[100px] bg-[#FAFAFA]">
          
          <div className="w-full h-[40vh] md:h-[45vh] bg-zinc-100 border-b border-zinc-200 relative">
            <img 
              src={story.image} 
              alt="" 
              className="w-full h-full object-cover"
            />
            {/* Subtle gradient so white text in image if any, but we don't need it as much for light mode */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60"></div>
          </div>

          <div className="px-6 py-10 md:px-12 md:py-16 bg-white">
            
            <div className="flex gap-4 mb-8">
              <div className="text-xs uppercase tracking-widest text-[#6E2BDB] font-bold bg-[#6E2BDB]/10 px-3 py-1 border border-[#6E2BDB]/20 rounded-sm">
                {story.region}
              </div>
              <div className="text-xs uppercase tracking-widest text-[#179FE8] font-bold bg-[#179FE8]/10 px-3 py-1 border border-[#179FE8]/20 rounded-sm">
                {story.role || story.job}
              </div>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 mb-10 leading-[1.1] tracking-tighter uppercase">
              {story.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] gap-8 mb-12">
              <div className="text-zinc-700 text-sm md:text-base leading-relaxed font-light space-y-4">
                {story.story.split('\n').map((p, i) => p.trim() ? <p key={i}>{p}</p> : null)}
              </div>
              <div className="hidden md:block w-[1px] bg-zinc-200"></div>
              <div className="relative">
                <svg className="w-8 h-8 text-[#179FE8]/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="font-serif text-lg md:text-xl text-zinc-800 italic font-medium leading-snug">
                  "{story.quote || story.story.split('\n')[0]}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Share Cyber Popup */}
        <AnimatePresence>
          {showShareMenu && (
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute bottom-[75px] md:bottom-[60px] left-0 w-full bg-white border-t-2 border-[#179FE8] p-6 z-40 shadow-[0_-15px_40px_rgba(0,0,0,0.1)]"
            >
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-200">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#179FE8]">
                  [ CHIA SẺ CÂU CHUYỆN #{String(story.id).padStart(3, '0')} ]
                </div>
                <button 
                  onClick={() => setShowShareMenu(false)}
                  className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900 font-bold"
                >
                  [ Đóng ]
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={copyToClipboard}
                  className="w-full py-3 px-4 bg-white border border-zinc-200 hover:border-[#6E2BDB] text-left flex items-center justify-between group transition-all rounded-md"
                >
                  <span className="text-sm font-semibold text-zinc-800 group-hover:text-[#6E2BDB] transition-colors">
                    {copied ? "✅ ĐÃ SAO CHÉP LINK VÀO BỘ NHỚ!" : "📋 Sao Chép Link (Copy Link)"}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-zinc-600">
                    {copied ? "Copied" : "Click to copy"}
                  </span>
                </button>

                <button
                  onClick={shareToFacebook}
                  className="w-full py-3 px-4 bg-[#0C6ED9]/5 border border-[#179FE8]/20 hover:bg-[#0C6ED9]/10 text-left flex items-center justify-between group transition-all rounded-md"
                >
                  <span className="text-sm font-semibold text-[#179FE8] transition-colors">
                    💬 Chia sẻ lên Facebook
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#179FE8]">Facebook</span>
                </button>

                <button
                  onClick={shareToZalo}
                  className="w-full py-3 px-4 bg-[#532DA3]/5 border border-[#6E2BDB]/20 hover:bg-[#532DA3]/10 text-left flex items-center justify-between group transition-all rounded-md"
                >
                  <span className="text-sm font-semibold text-[#6E2BDB] transition-colors">
                    📲 Gửi qua Zalo (Tự động Copy + Mở Zalo)
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#6E2BDB]">Zalo</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Actions - Brutalist Cyber Footer Light Mode */}
        <div className="absolute bottom-0 left-0 w-full border-t border-zinc-200 bg-white flex z-50 pb-[max(16px,env(safe-area-inset-bottom))] md:pb-0">
          {onPrev && (
            <button 
              onClick={onPrev}
              className="w-24 md:w-28 py-4 px-2 text-center border-r border-zinc-200 hover:bg-zinc-50 transition-colors group flex flex-col justify-center items-center shrink-0"
              title="Câu chuyện trước"
            >
              <div className="text-[11px] uppercase tracking-widest text-[#179FE8] font-bold group-hover:text-[#6E2BDB] transition-colors">&lt; Trước</div>
            </button>
          )}

          <button 
            onClick={onNext}
            className="flex-1 py-4 px-4 text-center hover:bg-zinc-50 transition-colors group flex flex-col justify-center items-center"
            title="Câu chuyện tiếp theo"
          >
            <div className="text-[10px] uppercase tracking-widest text-[#179FE8] mb-0.5 font-bold group-hover:text-[#6E2BDB] transition-colors">Tiếp theo &gt;</div>
            <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider line-clamp-1">Khám phá câu chuyện mới</div>
          </button>
          
          <button 
            onClick={handleShareClick}
            className="w-24 md:w-28 border-l border-zinc-200 flex flex-col justify-center items-center hover:bg-[#179FE8] hover:text-white text-zinc-500 transition-all group shrink-0"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold group-hover:text-white">
              {showShareMenu ? "[ Đóng ]" : "Share 🔗"}
            </span>
          </button>
        </div>
      </motion.div>
    </>
  );
}
