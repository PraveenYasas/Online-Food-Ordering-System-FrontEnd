import { useState } from 'react';
import HeroSection from "../hero/HeroSection";
import PromoSection from "../home/PromoSection";
import ShopsSection from "./ShopsSection";
import CategorySection from "./CategorySection";
import FoodItemsSection from "./FoodItemsSection";

export default function Home() {
  const [selectedShop, setSelectedShop] = useState('All Shops');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <main className="w-full flex flex-col bg-white pb-20">
      <HeroSection />
      
      {/* Promos with modern top spacing */}
      <div className="mt-10">
        <PromoSection />
      </div>
      
      {/* Shops Section */}
      <div className="mt-4">
        <ShopsSection 
          selectedShop={selectedShop} 
          onSelectShop={(shop) => {
            setSelectedShop(shop);
            setSelectedCategory('All'); 
          }} 
        />
      </div>
      
      {/* Categories Section */}
      <div className="mt-6 mb-8">
        <CategorySection 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
      </div>
      
      {/* Food Items with a modern rounded top container background */}
      <div className="bg-gray-50 rounded-t-[40px] pt-8 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <FoodItemsSection 
          selectedShop={selectedShop}
          selectedCategory={selectedCategory} 
        />
      </div>
      
    </main>
  );
}