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
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0808] text-[#e8e4e0] touch-none">
      
      {/* Landing Page */}
      <AnimatePresence>
        {!showMap && (
          <motion.div 
            className="absolute inset-0 z-40 flex flex-col justify-center md:justify-end px-6 md:px-12 bg-[#0a0808]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          >
            {/* Background hand image */}
            <div className="absolute inset-0 z-0 opacity-15 md:opacity-20">
               <img src={stories[0]?.image} alt="" className="w-full h-full object-cover grayscale contrast-150" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808] via-[#0a0808]/60 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl">
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="w-12 md:w-20 h-[2px] bg-[#D4622B] mb-6 md:mb-10 origin-left"
              ></motion.div>

              <div className="mb-2 pb-2">
                <motion.h1 
                  initial={{ y: "50%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  className="font-heading text-[4.5rem] sm:text-7xl md:text-[9rem] lg:text-[11rem] font-bold text-white leading-[1.1] tracking-tighter uppercase"
                >
                  100 Bàn Tay
                </motion.h1>
              </div>
              <div className="mb-8 md:mb-12 pb-2">
                <motion.h1 
                  initial={{ y: "50%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  className="font-heading text-5xl sm:text-6xl md:text-[7rem] lg:text-[9rem] font-bold text-[#FF5C00] leading-[1.1] tracking-tighter uppercase"
                >
                  Dựng Xây.
                </motion.h1>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-sm md:text-base text-[#8a8580] max-w-xs font-light leading-relaxed"
              >
                Mỗi bàn tay có một câu chuyện. 100 bàn tay dựng nên hình hài Việt Nam.
              </motion.p>
            </div>

            {/* Fixed CTA Button - always visible on mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative z-10 w-full pb-6 pt-4 md:pb-12"
            >
              <button 
                onClick={() => setShowMap(true)}
                className="w-full h-14 bg-[#D4622B] text-white font-heading font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#b85422] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                Bắt đầu khám phá
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map View */}
      <AnimatePresence>
        {showMap && (
          <motion.div 
            className="absolute inset-0 z-10 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex-1 w-full h-full relative">
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
                        gridTemplateColumns: 'repeat(15, 32px)', 
                        gridTemplateRows: 'repeat(30, 32px)' 
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
                              <div className={`w-full h-full bg-[#141110] overflow-hidden transition-all duration-300 ${
                                isSelected || isHovered ? 'border border-[#D4622B]' : 'border border-[#1a1513]'
                              }`}>
                                <img 
                                  src={story.thumbnail} 
                                  alt="" 
                                  className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                                    isSelected || isHovered ? 'grayscale-0 opacity-100 scale-110' : 'grayscale opacity-50'
                                  }`}
                                  loading="lazy"
                                />
                              </div>
                            </motion.button>
                            
                            <AnimatePresence>
                              {isHovered && !selectedStory && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute top-1/2 left-full ml-4 -translate-y-1/2 z-50 pointer-events-none whitespace-nowrap hidden md:block"
                                >
                                  <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
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
            <div className="absolute bottom-0 left-0 w-full h-12 border-t border-[#1a1513] bg-[#0a0808]/80 backdrop-blur-md flex items-center justify-between px-6 z-20 pointer-events-none">
              <div className="text-[10px] uppercase tracking-widest text-[#8a8580]">Vuốt / Kéo để di chuyển · Pinch để thu phóng</div>
              <div className="text-[10px] uppercase tracking-widest text-[#8a8580]">100 Records</div>
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
