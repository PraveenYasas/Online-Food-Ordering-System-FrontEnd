import React, { useRef, useState, useEffect } from 'react';

interface CategorySectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

interface CategoryDTO {
  id: number;
  name: string;
  description?: string;
}

const categoryStyles: Record<string, { icon: string, bgColor: string }> = {
  'All': { icon: '🍽️', bgColor: 'bg-gray-100' },
  'Grocery': { icon: '🍌', bgColor: 'bg-orange-50' },
  'Soup': { icon: '🍜', bgColor: 'bg-red-50' },
  'Chinese': { icon: '🥡', bgColor: 'bg-gray-100' },
  'Burgers': { icon: '🍔', bgColor: 'bg-orange-100' },
  'Desserts': { icon: '🍰', bgColor: 'bg-pink-50' },
  'BBQ': { icon: '🍗', bgColor: 'bg-orange-50' },
  'Korean': { icon: '🍱', bgColor: 'bg-blue-50' },
  'Bakery': { icon: '🥐', bgColor: 'bg-yellow-50' },
  'Indian': { icon: '🍛', bgColor: 'bg-orange-50' },
  'Asian': { icon: '🍙', bgColor: 'bg-green-50' },
  'Salads': { icon: '🥗', bgColor: 'bg-green-100' },
  'Smoothies': { icon: '🥤', bgColor: 'bg-blue-50' },
  'Coffee': { icon: '☕', bgColor: 'bg-stone-100' },
  'American': { icon: '🌭', bgColor: 'bg-red-50' },
};

function CategorySection({ selectedCategory, onSelectCategory }: CategorySectionProps) {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/categories')
      .then(res => res.json())
      .then(data => {
        const allCategory = { id: 0, name: 'All' };
        setCategories([allCategory, ...data]);
      })
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

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
    <div className="relative w-full py-6 border-b border-gray-100 bg-white">
      
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-white shadow-md hover:shadow-lg rounded-full p-2 flex items-center justify-center transition-all border border-gray-100 cursor-pointer"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div 
        ref={scrollRef} 
        className={`flex gap-6 overflow-x-auto px-14 py-4 select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={startDrag} 
        onMouseLeave={stopDrag} 
        onMouseUp={stopDrag} 
        onMouseMove={onDrag}
        onTouchStart={startDrag} 
        onTouchEnd={stopDrag} 
        onTouchMove={onDrag}
      >
        {categories.map((cat) => {
          const style = categoryStyles[cat.name] || { icon: '🍽️', bgColor: 'bg-gray-100' };

          return (
            <div 
              key={cat.id} 
              onClick={() => onSelectCategory(cat.name)}
              className="flex flex-col items-center gap-3 min-w-17.5 cursor-pointer"
            >
              <div className={`w-18.75 h-18.75 rounded-full ${style.bgColor} flex items-center justify-center text-4xl transition-all duration-200 pointer-events-none ${selectedCategory === cat.name ? 'ring-4 ring-[#34A853] ring-offset-2 scale-105' : 'hover:scale-105'}`}>
                {style.icon}
              </div>
              <span className={`text-[15px] pointer-events-none transition-colors ${selectedCategory === cat.name ? 'font-bold text-[#34A853]' : 'font-semibold text-gray-800'}`}>
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>

      <button 
        onClick={() => scroll('right')} 
        className="absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-white shadow-md hover:shadow-lg rounded-full p-2 flex items-center justify-center transition-all border border-gray-100 cursor-pointer"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  );
}

export default CategorySection;