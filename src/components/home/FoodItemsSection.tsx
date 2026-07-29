import { useCart } from '../cart/CartContext';

interface FoodItemsSectionProps {
  selectedCategory: string;
}

const dummyFoods = [
  { id: 1, name: 'Classic Cheese Burger', price: 850.00, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', category: 'Burgers' },
  { id: 2, name: 'Spicy Chicken Fried Rice', price: 1200.00, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80', category: 'Asian' },
  { id: 3, name: 'Hot Garlic Noodles', price: 950.00, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80', category: 'Chinese' },
  { id: 4, name: 'Dark Chocolate Cake', price: 650.00, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', category: 'Desserts' },
  { id: 5, name: 'Seafood Paella', price: 1899.00, image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80', category: 'Asian' },
  { id: 6, name: 'Premium Grilled Steak', price: 2450.00, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'American' },
  { id: 7, name: 'Fresh Garden Salad', price: 750.00, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', category: 'Salads' },
  { id: 8, name: 'Cappuccino Coffee', price: 550.00, image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80', category: 'Coffee' },
];

function FoodItemsSection({ selectedCategory }: FoodItemsSectionProps) {
  const { addToCart } = useCart();

  const filteredFoods = selectedCategory === 'All' 
    ? dummyFoods 
    : dummyFoods.filter(food => food.category === selectedCategory);

  return (
    <div className="w-full py-10 px-6 sm:px-12 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedCategory === 'All' ? 'Popular Dishes' : `${selectedCategory} Dishes`}
        </h2>
      </div>
      
      {filteredFoods.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <span className="text-5xl mb-4 block">🍽️</span>
          <h3 className="text-lg font-bold text-gray-900">No items found</h3>
          <p className="text-gray-500 mt-2">We couldn't find any dishes for "{selectedCategory}".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <div key={food.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col">
              
              <div className="relative h-48 w-full overflow-hidden">
                <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                  ⭐ 4.8
                </div>
              </div>
              
              {/* Food Details & Button */}
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-bold tracking-wider text-[#34A853] uppercase mb-1">
                  {food.category}
                </span>
                <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{food.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">Freshly prepared and delivered hot to your doorstep.</p>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-black text-gray-900">LKR {food.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart({ id: food.id, name: food.name, price: food.price, quantity: 1 })}
                    className="bg-[#34A853] hover:bg-[#2b8f45] text-white p-2.5 rounded-xl transition-colors flex items-center justify-center shadow-md hover:shadow-lg active:scale-95"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  </button>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodItemsSection;