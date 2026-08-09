interface ShopMenuTabProps {
  onOpenAddFood: () => void;
  foodItems: any[];
}

function ShopMenuTab({ onOpenAddFood, foodItems }: ShopMenuTabProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-lg text-gray-900">My Food Items</h3>
        <button 
          onClick={onOpenAddFood} 
          className="bg-[#34A853] hover:bg-[#2b8f45] text-white px-5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add New Item
        </button>
      </div>
      
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {!foodItems || foodItems.length === 0 ? (
           <div className="col-span-full text-center py-10 text-gray-500 font-medium">
             No food items added yet. Add your first item!
           </div>
         ) : (
           foodItems.map(item => {
             const safePrice = Number(item.price || 0);
             return (
               <div key={item.id} className="border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center relative group hover:border-[#34A853] transition-colors">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-3 overflow-hidden shadow-sm">
                    {item.imageUrl ? (
                      <img src={`http://localhost:8080${item.imageUrl}`} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      "🍔"
                    )}
                  </div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-[#34A853] font-semibold mt-1">LKR {safePrice.toFixed(2)}</p>
                  <div className="mt-3 flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
                     <span className="text-xs font-bold text-gray-600">Available</span>
                  </div>
               </div>
             );
           })
         )}
      </div>
    </div>
  );
}

export default ShopMenuTab;