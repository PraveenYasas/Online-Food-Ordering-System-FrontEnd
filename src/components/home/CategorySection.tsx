import React, { useRef, useState } from 'react';

const categories = [
  { name: 'Grocery', icon: '🍌', bgColor: 'bg-orange-50' },
  { name: 'Soup', icon: '🍜', bgColor: 'bg-red-50' },
  { name: 'Chinese', icon: '🥡', bgColor: 'bg-gray-100' },
  { name: 'Burgers', icon: '🍔', bgColor: 'bg-orange-100' },
  { name: 'Desserts', icon: '🍰', bgColor: 'bg-pink-50' },
  { name: 'BBQ', icon: '🍗', bgColor: 'bg-orange-50' },
  { name: 'Korean', icon: '🍱', bgColor: 'bg-blue-50' },
  { name: 'Bakery', icon: '🥐', bgColor: 'bg-yellow-50' },
  { name: 'Indian', icon: '🍛', bgColor: 'bg-orange-50' },
  { name: 'Asian', icon: '🍙', bgColor: 'bg-green-50' },
  { name: 'Salads', icon: '🥗', bgColor: 'bg-green-100' },
  { name: 'Smoothies', icon: '🥤', bgColor: 'bg-blue-50' },
  { name: 'Coffee', icon: '☕', bgColor: 'bg-stone-100' },
  { name: 'American', icon: '🌭', bgColor: 'bg-red-50' },
];

export default function CategorySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 400;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // --- Drag & Swipe Logic ටික ---
  
  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    
    setStartX(pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault(); 
    
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const x = pageX - scrollRef.current.offsetLeft;
    
    const walk = (x - startX) * 1.5; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative w-full py-6 border-b border-gray-100 bg-white group/slider">
      
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:shadow-lg rounded-full p-2 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div 
        ref={scrollRef} 
        className={`flex gap-6 overflow-x-auto px-12 select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        
        // Mouse Events
        onMouseDown={startDrag}
        onMouseLeave={stopDrag}
        onMouseUp={stopDrag}
        onMouseMove={onDrag}
        // Touch Events (For mobile devices)
        onTouchStart={startDrag}
        onTouchEnd={stopDrag}
        onTouchMove={onDrag}
      >
        {categories.map((cat, index) => (
          <div key={index} className="flex flex-col items-center gap-3 min-w-17.5">
            {/* Image Circle */}
            <div className={`w-18.75 h-18.75 rounded-full ${cat.bgColor} flex items-center justify-center text-4xl hover:scale-105 transition-transform duration-200 pointer-events-none`}>
              {cat.icon}
            </div>
            {/* Title */}
            <span className="text-[15px] font-semibold text-gray-800 pointer-events-none">
              {cat.name}
            </span>
          </div>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button 
        onClick={() => scroll('right')} 
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:shadow-lg rounded-full p-2 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  );
}