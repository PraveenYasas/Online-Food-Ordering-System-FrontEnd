import React, { useRef, useState, useEffect } from 'react';

interface ShopsSectionProps {
  selectedShop: string;
  onSelectShop: (shop: string) => void;
  userId: number;
  searchQuery: string; // 🔥
}

interface RestaurantDTO {
  id: number;
  name: string;
  address: string;
  contactNumber: string;
  imageUrl?: string;
}

function ShopsSection({ selectedShop, onSelectShop, userId, searchQuery }: ShopsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [restaurants, setRestaurants] = useState<RestaurantDTO[]>([]);
  const [favoriteRestaurantIds, setFavoriteRestaurantIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/restaurants', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRestaurants(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching restaurants:", err);
        setLoading(false);
      });

    const fetchFavorites = () => {
      if (userId) {
        fetch(`http://localhost:8080/api/v1/favorites/restaurant/${userId}`, { cache: 'no-store' })
          .then(res => res.json())
          .then(data => {
            if (Array.isArray(data)) {
              setFavoriteRestaurantIds(data.map((fav: any) => fav.restaurant.id));
            }
          })
          .catch(err => console.error("Error fetching favorite restaurants:", err));
      }
    };

    fetchFavorites();

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { id, isFavorite } = customEvent.detail;
      setFavoriteRestaurantIds(prev => {
        if (isFavorite) {
          return prev.includes(id) ? prev : [...prev, id];
        } else {
          return prev.filter(favId => favId !== id);
        }
      });
    };

    window.addEventListener('syncRestaurantFavorite', handleSync);
    return () => window.removeEventListener('syncRestaurantFavorite', handleSync);
  }, [userId]);

  const toggleFavorite = (e: React.MouseEvent, restaurantId: number) => {
    e.stopPropagation(); 
    const willBeFavorite = !favoriteRestaurantIds.includes(restaurantId);

    fetch(`http://localhost:8080/api/v1/favorites/restaurant/${userId}/${restaurantId}`, { method: 'POST' })
      .then(res => {
        if (res.ok) {
          setFavoriteRestaurantIds(prev => 
            willBeFavorite ? [...prev, restaurantId] : prev.filter(id => id !== restaurantId)
          );
          window.dispatchEvent(new CustomEvent('syncRestaurantFavorite', { detail: { id: restaurantId, isFavorite: willBeFavorite } }));
        }
      })
      .catch(err => console.error("Error toggling favorite restaurant:", err));
  };

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

  // 🔥 කඩවල් ෆිල්ටර් කරන තැන
  const filteredRestaurants = restaurants.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return ( <div className="w-full py-10 flex justify-center items-center bg-white"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#34A853]"></div></div> );

  return (
    <div className="relative w-full py-4 bg-white">
      <div className="px-14 mb-2 flex justify-between items-end">
        <h2 className="text-2xl font-bold text-gray-900">Featured Restaurants</h2>
      </div>

      <button 
        onClick={() => scroll('left')} 
        className="absolute left-3 top-[55%] -translate-y-1/2 z-40 bg-white/90 backdrop-blur shadow-md hover:shadow-lg rounded-full p-2.5 hidden md:flex items-center justify-center transition-all border border-gray-100 cursor-pointer"
      >
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
      </button>

      <div 
        ref={scrollRef} 
        className={`flex gap-6 overflow-x-auto px-14 pt-4 pb-8 select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={startDrag} onMouseLeave={stopDrag} onMouseUp={stopDrag} onMouseMove={onDrag}
        onTouchStart={startDrag} onTouchEnd={stopDrag} onTouchMove={onDrag}
      >
        
        {/* All Shops Card */}
        {(!searchQuery || 'all shops'.includes(searchQuery.toLowerCase())) && (
          <div 
            onClick={() => onSelectShop('All Shops')}
            className={`w-[280px] min-w-[280px] shrink-0 flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer ${selectedShop === 'All Shops' ? 'ring-2 ring-[#34A853] border border-transparent shadow-md scale-[1.02]' : 'border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1'}`}
          >
            <div className="w-full h-full min-h-[220px] bg-[#f0f9f2] flex flex-col items-center justify-center text-[#34A853] p-6 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </div>
              <span className="font-bold text-lg text-gray-900">All Shops</span>
              <p className="text-xs text-gray-500 mt-1">Explore all menus</p>
            </div>
          </div>
        )}

        {/* Filtered Restaurant Cards */}
        {filteredRestaurants.map((shop) => {
          const isFavorite = favoriteRestaurantIds.includes(shop.id);
          const shopImage = shop.imageUrl ? (shop.imageUrl.startsWith('http') ? shop.imageUrl : `http://localhost:8080/api/v1${shop.imageUrl}`) : "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80";

          return (
            <div 
              key={shop.id} 
              onClick={() => onSelectShop(shop.name)}
              className={`w-[280px] min-w-[280px] shrink-0 flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer ${selectedShop === shop.name ? 'ring-2 ring-[#34A853] border border-transparent shadow-md scale-[1.02]' : 'border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1'}`}
            >
              <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                <img src={shopImage} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
                <button onClick={(e) => toggleFavorite(e, shop.id)} className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow text-[#d81b60] hover:bg-red-50 transition-colors cursor-pointer z-10">
                  <svg className={`w-4 h-4 ${isFavorite ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isFavorite ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
              </div>
              <div className="p-4 bg-white relative">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-[17px] text-gray-900 leading-tight truncate pr-2">{shop.name}</h3>
                  <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded text-xs font-bold text-gray-700 shrink-0">⭐ 4.5</div>
                </div>
                <p className="text-xs text-gray-500 font-medium truncate">Restaurant</p>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={() => scroll('right')} className="absolute right-3 top-[55%] -translate-y-1/2 z-40 bg-white/90 backdrop-blur shadow-md hover:shadow-lg rounded-full p-2.5 hidden md:flex items-center justify-center transition-all border border-gray-100 cursor-pointer">
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}

export default ShopsSection;