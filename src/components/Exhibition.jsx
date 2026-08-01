import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import StoryModal from './StoryModal';

export default function Exhibition({ stories, initialStoryId }) {
  const [showMap, setShowMap] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);
  const [hoveredStory, setHoveredStory] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let idToLoad = null;
    if (initialStoryId) {
      idToLoad = parseInt(initialStoryId);
    } else {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      if (id) idToLoad = parseInt(id);
    }

    if (idToLoad) {
      const story = stories.find(s => s.id === idToLoad);
      if (story) {
        setSelectedStory(story);
      }
    }
    setTimeout(() => setIsLoaded(true), 100);
  }, [stories, initialStoryId]);

  const closeStory = () => {
    setSelectedStory(null);
    window.history.replaceState({}, '', '/trien-lam');
  };

  const openStory = (story) => {
    setSelectedStory(story);
    window.history.replaceState({}, '', `/story/${story.id}`);
  };

  const handleNextStory = () => {
    if (!selectedStory) return;
    const currentIndex = stories.findIndex(s => s.id === selectedStory.id);
    const nextStory = stories[(currentIndex + 1) % stories.length];
    openStory(nextStory);
  };

  const handlePrevStory = () => {
    if (!selectedStory) return;
    const currentIndex = stories.findIndex(s => s.id === selectedStory.id);
    const prevStory = stories[(currentIndex - 1 + stories.length) % stories.length];
    openStory(prevStory);
  };

  const regions = [
    { id: 'all', label: 'Tất Cả (100)' },
    { id: 'Bắc', label: 'Miền Bắc' },
    { id: 'Trung', label: 'Miền Trung' },
    { id: 'Nam', label: 'Miền Nam' },
    { id: 'Sa', label: 'Biển Đảo' }
  ];

  return (
    <div className="relative w-screen h-dvh min-h-dvh overflow-hidden bg-[#101518] text-[#DDE1E6] touch-none">
      {/* Back to Home Button */}
      <a href="/" className="absolute top-4 left-4 md:top-8 md:left-10 z-50 flex items-center gap-3 text-white transition-all bg-gradient-to-r from-[#6E2BDB] to-[#179FE8] px-5 py-3 rounded-full shadow-[0_0_20px_rgba(23,159,232,0.4)] hover:scale-105">
        <span className="text-xl leading-none font-bold">&larr;</span>
        <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Trở về Trang Chủ</span>
      </a>

      {/* Map View - Cyber Exhibition Dashboard */}
      <AnimatePresence>
        {showMap && (
          <motion.div 
            className="absolute inset-0 z-10 flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Floating Region Filter Console */}
            <div className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-[#101518]/90 border border-[#272A6E] p-1.5 rounded-full backdrop-blur-md shadow-[0_0_30px_rgba(59,42,133,0.35)] max-w-[95vw] overflow-x-auto no-scrollbar">
              {regions.map((tab) => {
                const active = selectedRegion === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedRegion(tab.id)}
                    className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full transition-all shrink-0 ${
                      active
                        ? 'bg-gradient-to-r from-[#6E2BDB] to-[#179FE8] text-white shadow-[0_0_15px_rgba(23,159,232,0.5)] scale-105'
                        : 'text-zinc-400 hover:text-[#DDE1E6] hover:bg-[#181f24]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Interactive Map Area */}
            <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
              <TransformWrapper
                initialScale={1}
                minScale={0.3}
                maxScale={4}
                centerOnInit={true}
                wheel={{ step: 0.1 }}
                pinch={{ step: 5 }}
                panning={{ velocityDisabled: false, lockAxisY: false, lockAxisX: false }}
                doubleClick={{ disabled: true }}
                limitToBounds={false}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <TransformComponent wrapperClass="!w-full !h-full" contentClass="w-max h-max min-w-full min-h-full flex items-center justify-center pt-64 pb-48 px-8 md:p-28 md:pt-60 md:pb-48">
                        <div 
                          className="grid gap-[2px] md:gap-[3px] relative mx-auto" 
                          style={{ 
                            gridTemplateColumns: 'repeat(18, 32px)', 
                            gridTemplateRows: 'repeat(32, 32px)' 
                          }}
                        >
                          {stories.map((story) => {
                            // Hiệu ứng 1: "Lên đèn" (Staggered Fade In)
                            // Dùng toán học để tạo delay ngẫu nhiên nhưng cố định theo ID (0.2s -> 1.8s) để không bị nháy khi React render lại
                            const pseudoRandom = Math.abs(Math.sin(story.id * 43.21)) * 1.6;
                            const delay = 0.2 + pseudoRandom;
                            
                            const isSelected = selectedStory?.id === story.id;
                            const isHovered = hoveredStory?.id === story.id;
                            
                            const isRegionMatch = selectedRegion === 'all' || 
                              (selectedRegion === 'Sa' ? story.region.includes('Sa') : story.region.includes(selectedRegion));

                            return (
                              <div
                                key={story.id}
                                className="relative"
                                style={{
                                  gridColumn: story.grid_col,
                                  gridRow: story.grid_row,
                                  zIndex: isSelected ? 40 : (isHovered ? 30 : (isRegionMatch ? 20 : 10))
                                }}
                                onMouseEnter={() => setHoveredStory(story)}
                                onMouseLeave={() => setHoveredStory(null)}
                              >
                                <motion.button
                                  onClick={() => openStory(story)}
                                  initial={{ opacity: 0, scale: 0.5, filter: 'brightness(3) blur(2px)' }}
                                  animate={
                                    isLoaded 
                                      ? { opacity: 1, scale: 1, filter: 'brightness(1) blur(0px)' }
                                      : { opacity: 0, scale: 0.5, filter: 'brightness(3) blur(2px)' }
                                  }
                                  transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
                                  className="relative w-full h-full block"
                                  style={{ willChange: 'transform, opacity, filter' }}
                                  aria-label={`Câu chuyện ${story.id}`}
                                >
                                  <div className={`w-full h-full bg-[#181f24] overflow-hidden transition-all duration-300 ${
                                    !isRegionMatch ? 'opacity-15 grayscale scale-90 pointer-events-none' : ''
                                  } ${
                                    isSelected || isHovered ? 'border-2 border-[#179FE8] shadow-[0_0_18px_rgba(23,159,232,0.9)] scale-125 z-40' : (isRegionMatch && selectedRegion !== 'all' ? 'border border-[#179FE8]/80 shadow-[0_0_8px_rgba(23,159,232,0.3)]' : 'border border-[#272A6E]/60')
                                  }`}>
                                    <img 
                                      src={story.thumbnail || story.image} 
                                      alt="" 
                                      className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                                        isSelected || isHovered ? 'grayscale-0 opacity-100 scale-110' : 'grayscale opacity-70'
                                      }`}
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  </div>
                                </motion.button>
                                
                                {/* Dynamic Glassmorphism Preview Card on Hover */}
                                <AnimatePresence>
                                  {isHovered && !selectedStory && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                      transition={{ duration: 0.2 }}
                                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 pointer-events-none w-64 hidden md:block"
                                    >
                                      <div className="bg-[#101518]/95 border-2 border-[#179FE8] p-3 rounded-xl shadow-[0_0_30px_rgba(23,159,232,0.4)] backdrop-blur-md">
                                        <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-[#272A6E]">
                                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#179FE8]">
                                            CÂU CHUYỆN SỐ {String(story.id).padStart(2, '0')}
                                          </span>
                                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6E2BDB] bg-[#3B2A85]/40 px-1.5 py-0.5 rounded">
                                            {story.region}
                                          </span>
                                        </div>
                                        <div className="text-xs font-bold text-[#DDE1E6] mb-1">{story.role || story.job}</div>
                                        <div className="text-[11px] text-zinc-300 italic line-clamp-2 font-serif">"{story.quote || story.story.split('\n')[0]}"</div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                    </TransformComponent>

                    {/* Floating Zoom Control Console */}
                    <div className="absolute bottom-24 md:bottom-20 right-4 md:right-10 z-30 flex flex-col gap-1.5 bg-[#101518]/90 border border-[#272A6E] p-1.5 rounded-2xl backdrop-blur-md shadow-[0_0_25px_rgba(59,42,133,0.4)]">
                      <button 
                        onClick={() => zoomIn()}
                        className="w-10 h-10 flex items-center justify-center text-lg font-bold text-[#DDE1E6] hover:bg-[#6E2BDB] hover:text-white rounded-xl transition-all"
                        title="Phóng to"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => resetTransform()}
                        className="w-10 h-10 flex items-center justify-center text-xs font-bold text-[#179FE8] hover:bg-[#179FE8] hover:text-white rounded-xl transition-all border-y border-[#272A6E]/50"
                        title="Mặc định"
                      >
                        ⌂
                      </button>
                      <button 
                        onClick={() => zoomOut()}
                        className="w-10 h-10 flex items-center justify-center text-lg font-bold text-[#DDE1E6] hover:bg-[#6E2BDB] hover:text-white rounded-xl transition-all"
                        title="Thu nhỏ"
                      >
                        −
                      </button>
                    </div>
                  </>
                )}
              </TransformWrapper>
            </div>
            
            {/* Status bar */}
            <div className="absolute bottom-0 left-0 w-full py-2.5 pb-[max(12px,env(safe-area-inset-bottom))] border-t border-[#272A6E] bg-[#101518]/95 backdrop-blur-md flex flex-wrap items-center justify-between px-4 md:px-6 z-20 pointer-events-none gap-1">
              <div className="text-[10px] uppercase tracking-widest text-[#179FE8] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#179FE8] animate-pulse shrink-0"></span>
                <span>Kéo / Thu phóng để trải nghiệm 360°</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-400">
                Hiển thị: <span className="text-[#6E2BDB] font-bold">{selectedRegion === 'all' ? '100 Bàn Tay' : `Khu Vực ${selectedRegion}`}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Modal with Sequential Navigation */}
      <AnimatePresence>
        {selectedStory && (
          <StoryModal 
            story={selectedStory} 
            onClose={closeStory} 
            onNext={handleNextStory}
            onPrev={handlePrevStory}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
