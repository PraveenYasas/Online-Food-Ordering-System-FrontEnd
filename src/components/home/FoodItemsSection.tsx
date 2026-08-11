import { useState, useEffect } from 'react';
import { useCart } from '../cart/CartContext';

interface FoodItemsSectionProps {
  selectedCategory: string;
  selectedShop: string;
  userId: number; 
}

interface FoodItemDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl?: string;
}

interface CategoryDTO {
  id: number;
  name: string;
}

function FoodItemsSection({ selectedCategory, selectedShop, userId }: FoodItemsSectionProps) {
  const { addToCart } = useCart();
  
  const [foods, setFoods] = useState<FoodItemDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [favoriteFoodIds, setFavoriteFoodIds] = useState<number[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/categories')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setCategories(data); })
      .catch(err => console.error(err));

    fetch('http://localhost:8080/api/v1/food-items')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFoods(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    if (userId) {
      fetch(`http://localhost:8080/api/v1/favorites/food/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setFavoriteFoodIds(data.map((fav: any) => fav.foodItem.id));
          }
        })
        .catch(err => console.error(err));
    }
  }, [userId]);

  const toggleFavorite = (foodId: number) => {
    fetch(`http://localhost:8080/api/v1/favorites/food/${userId}/${foodId}`, { method: 'POST' })
      .then(res => {
        if (res.ok) {
          setFavoriteFoodIds(prev => 
            prev.includes(foodId) ? prev.filter(id => id !== foodId) : [...prev, foodId]
          );
        }
      })
      .catch(err => console.error("Error toggling favorite:", err));
  };

  const getCategoryName = (id: number) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : 'Unknown';
  };

  const filteredFoods = foods.filter(food => {
    const catName = getCategoryName(food.categoryId);
    const matchCategory = selectedCategory === 'All' || catName === selectedCategory;
    const matchShop = selectedShop === 'All Shops' || true; 
    return matchCategory && matchShop;
  });

  if (loading) return ( <div className="w-full py-20 flex justify-center items-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#34A853]"></div></div> );

  return (
    <div className="w-full py-10 px-6 sm:px-12 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedShop === 'All Shops' ? (selectedCategory === 'All' ? 'Popular Dishes' : `${selectedCategory} Dishes`) : `Menu`}
        </h2>
      </div>
      
      {filteredFoods.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm"><span className="text-5xl mb-4 block opacity-50">🍽️</span><h3 className="text-lg font-bold text-gray-900">No items found</h3></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFoods.map((food) => {
            const categoryName = getCategoryName(food.categoryId);
            const imageUrl = food.imageUrl ? `http://localhost:8080/api/v1${food.imageUrl}` : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
            const isFavorite = favoriteFoodIds.includes(food.id); 

            return (
              <div key={food.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img src={imageUrl} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">⭐ 4.8</div>
                  
                  <button onClick={() => toggleFavorite(food.id)} className="absolute top-3 right-3 bg-white p-2 rounded-full shadow text-[#d81b60] hover:bg-red-50 transition-colors cursor-pointer z-10">
                    <svg className={`w-5 h-5 ${isFavorite ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isFavorite ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-1.5"><span className="text-[11px] font-bold tracking-wider text-[#34A853] uppercase">{categoryName}</span></div>
                  <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{food.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{food.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-black text-gray-900">LKR {food.price.toFixed(2)}</span>
                    <button onClick={() => addToCart({ id: food.id, name: food.name, price: food.price, quantity: 1, image: imageUrl })} className="bg-[#34A853] hover:bg-[#2b8f45] text-white p-2.5 rounded-xl transition-colors shadow-md">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FoodItemsSection;