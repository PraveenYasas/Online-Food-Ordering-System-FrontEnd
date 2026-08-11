import { useState, useEffect } from 'react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number; 
}

function FavoritesModal({ isOpen, onClose, userId }: FavoritesModalProps) {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<any[]>([]);
  const [favoriteDishes, setFavoriteDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && userId) {
      setLoading(true);
      
      fetch(`http://localhost:8080/api/v1/favorites/restaurant/${userId}`)
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setFavoriteRestaurants(data); })
        .catch(err => console.error(err));

      fetch(`http://localhost:8080/api/v1/favorites/food/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setFavoriteDishes(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [isOpen, userId]);

  const handleRemoveRestaurant = (restaurantId: number) => {
    fetch(`http://localhost:8080/api/v1/favorites/restaurant/${userId}/${restaurantId}`, { method: 'POST' })
      .then(res => {
        if (res.ok) setFavoriteRestaurants(prev => prev.filter(item => item.restaurant.id !== restaurantId));
      })
      .catch(err => console.error(err));
  };

  const handleRemoveFood = (foodItemId: number) => {
    fetch(`http://localhost:8080/api/v1/favorites/food/${userId}/${foodItemId}`, { method: 'POST' })
      .then(res => {
        if (res.ok) setFavoriteDishes(prev => prev.filter(item => item.foodItem.id !== foodItemId));
      })
      .catch(err => console.error(err));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-120 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6">
      <div className="bg-gray-50 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        <div className="bg-[#d81b60] p-6 text-white relative shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">My Favorites</h2>
          <p className="text-white/90 text-[15px] mt-1">Your saved restaurants and dishes</p>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto no-scrollbar flex flex-col gap-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#d81b60] mx-auto"></div>
              <p className="text-gray-500 mt-3 font-medium">Loading your favorites...</p>
            </div>
          ) : (
            <>
              {/* Restaurants Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">Favorite Restaurants ({favoriteRestaurants.length})</h3>
                {favoriteRestaurants.length === 0 ? (
                  <p className="text-gray-500 text-sm bg-white p-4 rounded-xl border border-gray-200">No favorite restaurants saved yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteRestaurants.map(fav => {
                      const rest = fav.restaurant;
                      return (
                        <div key={fav.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                          <div className="relative h-48 w-full bg-gray-100">
                            <img src={rest.image || "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80"} alt={rest.name} className="w-full h-full object-cover" />
                            <button onClick={() => handleRemoveRestaurant(rest.id)} className="absolute top-3 right-3 bg-white p-2 rounded-full shadow text-[#d81b60] hover:bg-red-50 cursor-pointer">
                              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            </button>
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-xl font-bold mb-1 text-gray-900">{rest.name}</h3>
                            <p className="text-sm text-gray-600 mb-4 font-medium flex items-center gap-1">📍 {rest.address} • 📞 {rest.contactNumber}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <hr className="border-gray-200" />

              {/* Dishes Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">Favorite Dishes ({favoriteDishes.length})</h3>
                {favoriteDishes.length === 0 ? (
                  <p className="text-gray-500 text-sm bg-white p-4 rounded-xl border border-gray-200">No favorite dishes saved yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {favoriteDishes.map(fav => {
                      const dish = fav.foodItem;
                      const imageUrl = dish.imageUrl ? (dish.imageUrl.startsWith('http') ? dish.imageUrl : `http://localhost:8080/api/v1${dish.imageUrl}`) : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";

                      return (
                        <div key={fav.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                          <div className="relative h-48 w-full bg-gray-100">
                            <img src={imageUrl} alt={dish.name} className="w-full h-full object-cover" />
                            <button onClick={() => handleRemoveFood(dish.id)} className="absolute top-3 right-3 bg-white p-2 rounded-full shadow text-[#d81b60] hover:bg-red-50 cursor-pointer">
                              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            </button>
                          </div>
                          <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-[17px] font-bold text-gray-900 mb-1 leading-tight">{dish.name}</h3>
                            <p className="text-sm text-gray-500 mb-2 font-medium">LKR {Number(dish.price || 0).toFixed(2)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoritesModal;