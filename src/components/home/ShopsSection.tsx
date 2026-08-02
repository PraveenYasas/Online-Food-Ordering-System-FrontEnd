import React, { useRef, useState } from 'react';

interface ShopsSectionProps {
  selectedShop: string;
  onSelectShop: (shop: string) => void;
}

const shops = [
  { name: 'All Shops', image: '', type: 'Explore everything', rating: '', time: '' },
  { name: 'C Foods', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80', type: 'Sri Lankan • Asian', rating: '4.8', time: '15-25 min' },
  { name: 'Burger Hub', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80', type: 'Fast Food • Burgers', rating: '4.5', time: '10-20 min' },
  { name: 'Pizza Express', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', type: 'Italian • Pizza', rating: '4.9', time: '30-40 min' },
  { name: 'Asian Wok', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80', type: 'Chinese • Asian', rating: '4.2', time: '20-30 min' },
  { name: 'Sweet Tooth', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80', type: 'Desserts • Bakery', rating: '4.7', time: '10-15 min' },
];

function ShopsSection({ selectedShop, onSelectShop }: ShopsSectionProps) {
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

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const stopDrag = () => setIsDragging(false);

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault(); 
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const x = pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative w-full py-4 bg-white">
      <div className="px-14 mb-6 flex justify-between items-end">
        <h2 className="text-[26px] font-black text-gray-900 tracking-tight">Featured Restaurants</h2>
      </div>

      <button 
        onClick={() => scroll('left')} 
        className="absolute left-3 top-[55%] -translate-y-1/2 z-40 bg-white/90 backdrop-blur shadow-md hover:shadow-lg rounded-full p-2.5 hidden md:flex items-center justify-center transition-all border border-gray-100 cursor-pointer"
      >
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div 
        ref={scrollRef} 
        className={`flex gap-6 overflow-x-auto px-14 pb-8 select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={startDrag} 
        onMouseLeave={stopDrag} 
        onMouseUp={stopDrag} 
        onMouseMove={onDrag}
        onTouchStart={startDrag} 
        onTouchEnd={stopDrag} 
        onTouchMove={onDrag}
      >
        {shops.map((shop, index) => (
          <div 
            key={index} 
            onClick={() => onSelectShop(shop.name)}
            className={`w-260px shrink-0 flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 group ${
              selectedShop === shop.name 
                ? 'border-2 border-[#34A853] shadow-md ring-2 ring-[#34A853]/20 scale-[1.02]' 
                : 'border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1'
            }`}
          >
            {shop.name === 'All Shops' ? (
              <div className="w-full h-full min-h-220px bg-[#f0f9f2] flex flex-col items-center justify-center text-[#34A853] p-6 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                </div>
                <span className="font-bold text-lg text-gray-900">All Shops</span>
                <p className="text-xs text-gray-500 mt-1">Explore all menus</p>
              </div>
            ) : (
              <>
                {/* Modern Image Banner */}
                <div className="relative h-32 w-full overflow-hidden">
                  <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
                  
                  {/* Delivery Time Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold text-gray-800 shadow-sm flex items-center gap-1">
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {shop.time}
                  </div>
                </div>

                {/* Shop Details */}
                <div className="p-4 bg-white relative">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-[17px] text-gray-900 leading-tight truncate pr-2">{shop.name}</h3>
                    <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded text-xs font-bold text-gray-700 shrink-0">
                      ⭐ {shop.rating}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 font-medium truncate">{shop.type}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <button 
        onClick={() => scroll('right')} 
        className="absolute right-3 top-[55%] -translate-y-1/2 z-40 bg-white/90 backdrop-blur shadow-md hover:shadow-lg rounded-full p-2.5 hidden md:flex items-center justify-center transition-all border border-gray-100 cursor-pointer"
      >
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  );
}

export default ShopsSection;