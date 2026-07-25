import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import StoryModal from './StoryModal';

export default function Exhibition({ stories, initialStoryId }) {
  const [showMap, setShowMap] = useState(false);
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
        setShowMap(true);
        setSelectedStory(story);
      }
    }
    setTimeout(() => setIsLoaded(true), 100);
  }, [stories, initialStoryId]);

  const closeStory = () => {
    setSelectedStory(null);
    window.history.replaceState({}, '', '/');
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
    <div className="relative w-screen h-screen overflow-hidden bg-[#101518] text-[#DDE1E6] touch-none">
      
      {/* Landing Page - Cyber Brutalist Visionary Portal */}
      <AnimatePresence>
        {!showMap && (
          <motion.div 
            className="absolute inset-0 z-40 flex flex-col justify-end px-6 md:px-12 pb-safe bg-[#101518]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          >
            {/* Ambient cyber visualizer background */}
            <div className="absolute inset-0 z-0 opacity-25 pointer-events-none overflow-hidden">
               <img src={stories[0]?.image} alt="" className="w-full h-full object-cover grayscale contrast-150 mix-blend-luminosity scale-105 animate-pulse" style={{ animationDuration: '8s' }} />
               <div className="absolute inset-0 bg-gradient-to-t from-[#101518] via-[#101518]/85 to-transparent"></div>
               <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#6E2BDB]/15 rounded-full blur-[100px]"></div>
               <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-[#179FE8]/15 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl mb-12 md:mb-20">
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="w-20 md:w-32 h-[3px] bg-gradient-to-r from-[#6E2BDB] via-[#179FE8] to-[#0C6ED9] mb-8 md:mb-12 origin-left shadow-[0_0_15px_rgba(110,43,219,0.6)]"
              ></motion.div>

              <div className="mb-2 pb-2">
                <motion.h1 
                  initial={{ y: "50%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  className="font-heading text-[4.5rem] sm:text-7xl md:text-[9rem] lg:text-[11rem] font-bold text-[#DDE1E6] leading-[1.1] tracking-tighter uppercase"
                >
                  100 Bàn Tay
                </motion.h1>
              </div>
              <div className="mb-8 md:mb-12 pb-2">
                <motion.h1 
                  initial={{ y: "50%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  className="font-heading text-5xl sm:text-6xl md:text-[7rem] lg:text-[9rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6E2BDB] via-[#179FE8] to-[#0C6ED9] leading-[1.1] tracking-tighter uppercase drop-shadow-[0_0_35px_rgba(110,43,219,0.35)]"
                >
                  Dựng Xây.
                </motion.h1>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full border-t border-[#272A6E] pt-8">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="text-sm md:text-base text-zinc-300 max-w-md font-light leading-relaxed"
                >
                  Dự án triển lãm số lưu trữ những câu chuyện đời thường của người thợ xây dựng Việt Nam. Mộc mạc, thô ráp, và nguyên bản dưới ánh sáng công nghệ tương lai.
                </motion.p>
                
                <motion.button 
                  onClick={() => setShowMap(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="group flex items-center gap-5 bg-[#181f24]/80 hover:bg-[#6E2BDB]/20 border border-[#272A6E] hover:border-[#179FE8] px-6 py-4 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(59,42,133,0.3)] hover:shadow-[0_0_35px_rgba(23,159,232,0.5)]"
                >
                  <span className="font-heading text-sm uppercase tracking-[0.2em] font-bold text-[#DDE1E6] group-hover:text-white transition-colors">Bắt đầu khám phá</span>
                  <div className="w-10 h-10 bg-[#272A6E]/80 group-hover:bg-[#179FE8] rounded-full flex items-center justify-center transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white group-hover:translate-x-0.5 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-[#101518]/90 border border-[#272A6E] p-1.5 rounded-full backdrop-blur-md shadow-[0_0_30px_rgba(59,42,133,0.35)] max-w-[95vw] overflow-x-auto no-scrollbar">
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
                limitToBounds={true}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <TransformComponent wrapperClass="!w-full !h-full" contentClass="w-max h-max min-w-full min-h-full flex items-center justify-center p-12 md:p-24">
                        <div 
                          className="grid gap-[2px] md:gap-[3px] relative mx-auto" 
                          style={{ 
                            gridTemplateColumns: 'repeat(18, 32px)', 
                            gridTemplateRows: 'repeat(32, 32px)' 
                          }}
                        >
                          {stories.map((story) => {
                            const delay = story.grid_row * 0.015;
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
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
                                  transition={{ duration: 0.5, delay, ease: [0.76, 0, 0.24, 1] }}
                                  className="relative w-full h-full block"
                                  aria-label={`Câu chuyện ${story.id}`}
                                >
                                  <div className={`w-full h-full bg-[#181f24] overflow-hidden transition-all duration-300 ${
                                    !isRegionMatch ? 'opacity-15 grayscale scale-90 pointer-events-none' : ''
                                  } ${
                                    isSelected || isHovered ? 'border-2 border-[#179FE8] shadow-[0_0_18px_rgba(23,159,232,0.9)] scale-125 z-40' : (isRegionMatch && selectedRegion !== 'all' ? 'border border-[#179FE8]/80 shadow-[0_0_8px_rgba(23,159,232,0.3)]' : 'border border-[#272A6E]/60')
                                  }`}>
                                    <img 
                                      src={story.thumbnail} 
                                      alt="" 
                                      className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                                        isSelected || isHovered ? 'grayscale-0 opacity-100 scale-110' : 'grayscale opacity-70'
                                      }`}
                                      loading="lazy"
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
                                            RECORD #{String(story.id).padStart(3, '0')}
                                          </span>
                                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6E2BDB] bg-[#3B2A85]/40 px-1.5 py-0.5 rounded">
                                            {story.region}
                                          </span>
                                        </div>
                                        <div className="text-xs font-bold text-[#DDE1E6] mb-1">{story.job}</div>
                                        <div className="text-[11px] text-zinc-300 italic line-clamp-2 font-serif">"{story.quote}"</div>
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
                    <div className="absolute bottom-20 right-6 md:right-10 z-30 flex flex-col gap-1.5 bg-[#101518]/90 border border-[#272A6E] p-1.5 rounded-2xl backdrop-blur-md shadow-[0_0_25px_rgba(59,42,133,0.4)]">
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
            <div className="absolute bottom-0 left-0 w-full h-12 border-t border-[#272A6E] bg-[#101518]/90 backdrop-blur-md flex items-center justify-between px-6 z-20 pointer-events-none">
              <div className="text-[10px] uppercase tracking-widest text-[#179FE8] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#179FE8] animate-pulse"></span>
                Kéo / Thu phóng để trải nghiệm bản đồ 360°
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
