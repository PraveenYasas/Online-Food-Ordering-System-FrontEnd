import { useState } from 'react';
import HeroSection from "../hero/HeroSection";
import PromoSection from "../home/PromoSection";
import ShopsSection from "./ShopsSection";
import CategorySection from "./CategorySection";
import FoodItemsSection from "./FoodItemsSection";

interface HomeProps {
  searchQuery?: string;
}

export default function Home({ searchQuery = '' }: HomeProps) {
  const [selectedShop, setSelectedShop] = useState('All Shops');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const currentUserId = Number(localStorage.getItem('userId')) || 0;

  return (
    <main className="w-full flex flex-col bg-white pb-20">
      <HeroSection />
      
      <div className="mt-10">
        <PromoSection />
      </div>
      
      <div className="mt-4">
        <ShopsSection 
          selectedShop={selectedShop} 
          onSelectShop={(shop) => {
            setSelectedShop(shop);
            setSelectedCategory('All'); 
          }} 
          userId={currentUserId}
          searchQuery={searchQuery}
        />
      </div>
      
      <div className="mt-6 mb-8">
        <CategorySection 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
      </div>
      
      <div className="bg-gray-50 rounded-t-[40px] pt-8 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <FoodItemsSection 
          selectedCategory={selectedCategory} 
          selectedShop={selectedShop} 
          userId={currentUserId}
          searchQuery={searchQuery}
        />
      </div>
      
    </main>
  );
}