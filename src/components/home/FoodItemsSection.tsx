import { useState, useEffect } from 'react';
import { useCart } from '../cart/CartContext';

interface FoodItemsSectionProps {
  selectedCategory: string;
  selectedShop: string;
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

function FoodItemsSection({ selectedCategory, selectedShop }: FoodItemsSectionProps) {
  const { addToCart } = useCart();
  
  // States for real data
  const [foods, setFoods] = useState<FoodItemDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/categories')
      .then(res => {
        if (!res.ok) throw new Error("Categories fetching failed");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(err => console.error("Error fetching categories:", err));

    fetch('http://localhost:8080/api/v1/food-items')
      .then(res => {
        if (!res.ok) throw new Error("Food items fetching failed");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setFoods(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching foods:", err);
        setLoading(false);
      });
  }, []);

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

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#34A853]"></div>
      </div>
    );
  }

  return (
    <div className="w-full py-10 px-6 sm:px-12 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedShop === 'All Shops' 
            ? (selectedCategory === 'All' ? 'Popular Dishes' : `${selectedCategory} Dishes`)
            : `Menu`}
        </h2>
      </div>
      
      {filteredFoods.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-5xl mb-4 block opacity-50">🍽️</span>
          <h3 className="text-lg font-bold text-gray-900">No items found</h3>
          <p className="text-gray-500 mt-2">
            We couldn't find any dishes for "{selectedCategory}" right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFoods.map((food) => {
            const categoryName = getCategoryName(food.categoryId);
            
            const imageUrl = food.imageUrl 
              ? `http://localhost:8080/api/v1${food.imageUrl}` 
              : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
            return (
              <div key={food.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col">
                
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img src={imageUrl} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                    ⭐ 4.8
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-1.5">
                     <span className="text-[11px] font-bold tracking-wider text-[#34A853] uppercase">
                       {categoryName}
                     </span>
                     {selectedShop === 'All Shops' && (
                       <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md truncate max-w-100px">
                         BiteDash Shop
                       </span>
                     )}
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{food.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {food.description || "Freshly prepared and delivered hot to your doorstep."}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-black text-gray-900">LKR {food.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart({ id: food.id, name: food.name, price: food.price, quantity: 1, image: imageUrl })}
                      className="bg-[#34A853] hover:bg-[#2b8f45] text-white p-2.5 rounded-xl transition-colors flex items-center justify-center shadow-md hover:shadow-lg active:scale-95"
                    >
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