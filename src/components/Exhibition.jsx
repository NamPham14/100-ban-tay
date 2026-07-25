import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import StoryModal from './StoryModal';

export default function Exhibition({ stories, initialStoryId }) {
  const [showMap, setShowMap] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [hoveredStory, setHoveredStory] = useState(null);
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

  const randomNext = () => {
    const nextStory = stories[Math.floor(Math.random() * stories.length)];
    openStory(nextStory);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#101518] text-[#DDE1E6] touch-none">
      
      {/* Landing Page - Cyber Brutalist Typography with Purple & Blue highlights */}
      <AnimatePresence>
        {!showMap && (
          <motion.div 
            className="absolute inset-0 z-40 flex flex-col justify-end px-6 md:px-12 pb-safe bg-[#101518]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          >
            <div className="absolute inset-0 z-0 opacity-25">
               <img src={stories[0]?.image} alt="" className="w-full h-full object-cover grayscale contrast-150 mix-blend-luminosity" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#101518] via-[#101518]/85 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl mb-12 md:mb-20">
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="w-16 md:w-24 h-[3px] bg-gradient-to-r from-[#6E2BDB] to-[#179FE8] mb-8 md:mb-12 origin-left"
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
                  className="font-heading text-5xl sm:text-6xl md:text-[7rem] lg:text-[9rem] font-bold text-[#6E2BDB] leading-[1.1] tracking-tighter uppercase drop-shadow-[0_0_25px_rgba(110,43,219,0.3)]"
                >
                  Dựng Xây.
                </motion.h1>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full border-t border-[#272A6E] pt-8">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="text-sm md:text-base text-zinc-400 max-w-sm font-light leading-relaxed"
                >
                  Dự án triển lãm số lưu trữ những câu chuyện đời thường của người thợ xây dựng Việt Nam. Mộc mạc, thô ráp, và nguyên bản.
                </motion.p>
                
                <motion.button 
                  onClick={() => setShowMap(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="group flex items-center gap-4 text-[#DDE1E6] hover:text-[#179FE8] transition-colors"
                >
                  <span className="font-heading text-sm uppercase tracking-[0.2em] font-semibold">Bắt đầu khám phá</span>
                  <div className="w-12 h-12 border border-[#272A6E] rounded-full flex items-center justify-center group-hover:border-[#179FE8] group-hover:bg-[#179FE8]/10 transition-all shadow-[0_0_15px_rgba(23,159,232,0.15)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map View - Deep Cyber Slate aesthetics */}
      <AnimatePresence>
        {showMap && (
          <motion.div 
            className="absolute inset-0 z-10 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
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

                        return (
                          <div
                            key={story.id}
                            className="relative"
                            style={{
                              gridColumn: story.grid_col,
                              gridRow: story.grid_row,
                              zIndex: isSelected ? 40 : (isHovered ? 30 : 10)
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
                                isSelected || isHovered ? 'border-2 border-[#179FE8] shadow-[0_0_12px_rgba(23,159,232,0.6)]' : 'border border-[#272A6E]/60'
                              }`}>
                                <img 
                                  src={story.thumbnail} 
                                  alt="" 
                                  className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                                    isSelected || isHovered ? 'grayscale-0 opacity-100 scale-110' : 'grayscale opacity-60'
                                  }`}
                                  loading="lazy"
                                />
                              </div>
                            </motion.button>
                            
                            {/* Minimalist tooltip */}
                            <AnimatePresence>
                              {isHovered && !selectedStory && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute top-1/2 left-full ml-4 -translate-y-1/2 z-50 pointer-events-none whitespace-nowrap hidden md:block"
                                >
                                  <div className="text-[10px] uppercase tracking-widest text-[#179FE8] font-bold bg-[#101518]/90 px-2 py-1 border border-[#272A6E]">
                                    {String(story.id).padStart(3, '0')} — {story.region}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                </TransformComponent>
              </TransformWrapper>
            </div>
            
            {/* Status bar */}
            <div className="absolute bottom-0 left-0 w-full h-12 border-t border-[#272A6E] bg-[#101518]/90 backdrop-blur-md flex items-center justify-between px-6 z-20 pointer-events-none">
              <div className="text-[10px] uppercase tracking-widest text-[#179FE8] font-semibold">Kéo / Thu phóng để tương tác</div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-400">100 Records — <span className="text-[#6E2BDB]">Vietnam Map</span></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <StoryModal 
            story={selectedStory} 
            onClose={closeStory} 
            onNext={randomNext} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
