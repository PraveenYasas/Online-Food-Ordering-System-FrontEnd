import { useCart } from '../cart/CartContext';

const dummyFoods = [
  { id: 1, name: 'Cheese Burger', price: 850.00, image: '🍔', category: 'Fast Food' },
  { id: 2, name: 'Chicken Fried Rice', price: 1200.00, image: '🍛', category: 'Asian' },
  { id: 3, name: 'Spicy Noodles', price: 950.00, image: '🍜', category: 'Asian' },
  { id: 4, name: 'Chocolate Cake', price: 650.00, image: '🍰', category: 'Desserts' },
];

function FoodItemsSection() {
  const { addToCart } = useCart();

  return (
    <div className="w-full py-10 px-6 sm:px-12 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Dishes</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyFoods.map((food) => (
          <div key={food.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 group">
            
            {/* Food Image (Placeholder) */}
            <div className="w-full h-40 bg-gray-50 rounded-xl flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform duration-300">
              {food.image}
            </div>
            
            {/* Food Details */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-[#34A853] bg-[#e6f4ea] px-2 py-1 rounded-md mb-2 inline-block">
                {food.category}
              </span>
              <h3 className="font-bold text-lg text-gray-900">{food.name}</h3>
              <p className="text-gray-500 text-sm mt-1">LKR {food.price.toFixed(2)}</p>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart({ id: food.id, name: food.name, price: food.price, quantity: 1 })}
              className="w-full bg-white border-2 border-[#34A853] text-[#34A853] hover:bg-[#34A853] hover:text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Add to Cart
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodItemsSection;