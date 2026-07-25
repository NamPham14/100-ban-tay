import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StoryModal from './StoryModal';

export default function MapGrid({ stories, initialStoryId = null }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredStory, setHoveredStory] = useState(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (initialStoryId) {
      const story = stories.find(s => s.id === parseInt(initialStoryId));
      if (story) setSelectedStory(story);
    } else {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      if (id) {
        const story = stories.find(s => s.id === parseInt(id));
        if (story) setSelectedStory(story);
      }
    }
    
    // Quick mount, animation starts immediately
    setTimeout(() => setIsLoaded(true), 50);
  }, [stories, initialStoryId]);

  const closeStory = () => {
    setSelectedStory(null);
    window.history.replaceState({}, '', window.location.pathname);
  };

  const openStory = (story) => {
    setSelectedStory(story);
    window.history.replaceState({}, '', `?id=${story.id}`);
  };

  const randomNext = () => {
    const nextStory = stories[Math.floor(Math.random() * stories.length)];
    openStory(nextStory);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-transparent flex flex-col">
      {/* Static Carved Caption */}
      <div className="absolute top-6 left-0 w-full z-20 pointer-events-none flex justify-center">
        <h1 className="font-slab text-sm md:text-base text-[#F5F5F0]/60 uppercase tracking-[0.25em] font-bold opacity-80 mix-blend-screen">
          Mỗi bàn tay có một câu chuyện.
        </h1>
      </div>

      {/* Full-bleed Map Area */}
      <div 
        ref={mapContainerRef}
        className="flex-1 w-full h-full overflow-auto no-scrollbar relative touch-pan-x touch-pan-y z-10 cursor-grab active:cursor-grabbing"
      >
        <div className="absolute inset-0 min-w-[800px] min-h-[850px] md:min-w-full md:min-h-full flex items-center justify-center pt-16 pb-8 md:p-8">
          <div 
            className="grid gap-[1px] md:gap-[3px] mx-auto relative" 
            style={{ 
              gridTemplateColumns: 'repeat(15, minmax(28px, 44px))', 
              gridTemplateRows: 'repeat(30, minmax(28px, 44px))' 
            }}
          >
            {stories.map((story) => {
              // Fade-in from North to South (Row 1 to 30)
              const delay = story.grid_row * 0.04;
              const isSelected = selectedStory?.id === story.id;
              
              return (
                <div
                  key={story.id}
                  style={{
                    gridColumn: story.grid_col,
                    gridRow: story.grid_row,
                  }}
                  className="relative z-10"
                  onMouseEnter={() => setHoveredStory(story)}
                  onMouseLeave={() => setHoveredStory(null)}
                >
                  <motion.button
                    onClick={() => openStory(story)}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: isLoaded ? 1 : 0, 
                    }}
                    transition={{ duration: 0.6, delay, ease: "easeOut" }}
                    className={`relative w-full h-full cursor-pointer transition-all duration-300 block ${
                      isSelected ? 'ring-2 ring-[#D9622B] z-40 scale-105' : 'hover:z-30 hover:scale-105 hover:brightness-125 hover:shadow-lg'
                    }`}
                    aria-label={`Câu chuyện của ${story.job} tại ${story.region}`}
                  >
                    <div className="w-full h-full bg-[#1C1C1C] overflow-hidden aspect-square rounded-[2px]">
                      <img 
                        src={story.thumbnail} 
                        alt="" 
                        className="w-full h-full object-cover grayscale opacity-90 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                        loading="lazy"
                      />
                    </div>
                  </motion.button>
                  
                  {/* Tooltip on Desktop */}
                  <AnimatePresence>
                    {hoveredStory?.id === story.id && !selectedStory && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 2 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none w-max hidden md:block"
                      >
                        <div className="bg-[#1C1C1C] text-[#F5F5F0] px-3 py-1.5 shadow-xl flex items-center gap-2 rounded-sm border border-[#333]">
                          <span className="text-xs font-slab font-bold text-[#D9622B] uppercase tracking-wider">{story.region}</span>
                        </div>
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#1C1C1C] absolute top-full left-1/2 -translate-x-1/2"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Story Modal (Slide-up Panel) */}
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
