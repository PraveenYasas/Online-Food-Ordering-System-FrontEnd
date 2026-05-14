interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Dummy Data (Mock Data)
const favoriteRestaurants = [
  {
    id: 1,
    name: "C Foods",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviews: "1000+",
    category: "Sri Lankan",
    time: "35-50 min",
    deliveryFee: "LKR 45",
    promo: "1 pc with any LKR 2,000"
  },
  {
    id: 2,
    name: "Shanghai Family Restaurant",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: "500+",
    category: "Chinese",
    time: "25-40 min",
    deliveryFee: "LKR 50"
  }
];

const favoriteDishes = [
  {
    id: 1,
    name: "Chicken Cheese Kottu",
    restaurant: "C Foods",
    desc: "A delicious Sri Lankan street food made with shredded roti, chicken, and vegetables.",
    price: 1350.00,
    likes: "87%",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Seafood Paella",
    restaurant: "Shanghai Family Restaurant",
    desc: "Fresh mussels, shrimp, and fish in saffron rice with vegetables.",
    price: 1899.00,
    likes: "94%",
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Grilled Steak",
    restaurant: "Korean Mummy",
    desc: "Prime beef steak grilled to perfection with herbs and garlic butter.",
    price: 2450.00,
    likes: "95%",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  }
];

function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-120 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6">
      
      <div className="bg-gray-50 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header - Pink/Red Gradient Background */}
        <div className="bg-[#d81b60] p-6 text-white relative shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            My Favorites
          </h2>
          <p className="text-white/90 text-[15px] mt-1 md:ml-11">Your saved restaurants and dishes</p>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 md:p-6 overflow-y-auto no-scrollbar flex flex-col gap-8">
          
          {/* Favorite Restaurants Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#d81b60]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Favorite Restaurants ({favoriteRestaurants.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoriteRestaurants.map(rest => (
                <div key={rest.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="relative h-48 w-full">
                    <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
                    {rest.promo && (
                      <div className="absolute top-3 left-3 bg-[#d81b60] text-white px-3 py-1 rounded-md text-sm font-bold shadow">
                        {rest.promo}
                      </div>
                    )}
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow text-[#d81b60]">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </button>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-1 text-gray-900">{rest.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 font-medium flex items-center gap-1">
                      <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      <span className="text-black font-bold">{rest.rating}</span> ({rest.reviews}) • {rest.category}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                      <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {rest.time}</span>
                      <span>•</span>
                      <span>{rest.deliveryFee}</span>
                    </div>
                    <div className="flex gap-3 mt-auto">
                      <button className="flex-1 bg-[#d81b60] hover:bg-[#c2185b] text-white py-2.5 rounded-lg font-bold text-[15px] transition-colors">
                        Order Now
                      </button>
                      <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-[#d81b60] hover:bg-red-50 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Favorite Dishes Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#d81b60]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Favorite Dishes ({favoriteDishes.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {favoriteDishes.map(dish => (
                <div key={dish.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="relative h-48 w-full">
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-sm font-bold shadow flex items-center gap-1 text-gray-800">
                      👍 {dish.likes}
                    </div>
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow text-[#d81b60]">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </button>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-[17px] font-bold text-gray-900 mb-1 leading-tight">{dish.name}</h3>
                    <p className="text-sm text-gray-500 mb-2 font-medium">{dish.restaurant}</p>
                    <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2 leading-relaxed">{dish.desc}</p>
                    
                    <div className="flex items-center justify-between mb-4 mt-auto">
                      <span className="text-lg font-bold text-[#137333]">LKR {dish.price.toFixed(2)}</span>
                      <button className="bg-[#34A853] hover:bg-[#2b8f45] transition-colors text-white px-4 py-2 rounded-lg font-bold text-sm">
                        Add to Cart
                      </button>
                    </div>
                    
                    <button className="w-full py-2.5 border border-gray-200 rounded-lg flex items-center justify-center gap-2 text-gray-600 font-bold text-[14px] hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4 text-[#d81b60]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FavoritesModal;