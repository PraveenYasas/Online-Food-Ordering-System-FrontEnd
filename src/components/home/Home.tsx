import { useState } from 'react';
import CategorySection from "./CategorySection"
import HeroSection from "../hero/HeroSection"
import PromoSection from "../home/PromoSection"
import FoodItemsSection from "./FoodItemsSection"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <main className="w-full flex flex-col">
      <HeroSection />
      <hr className="border-gray-200" />
      
      <CategorySection 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      
      <hr className="border-gray-200" />
      
      <FoodItemsSection selectedCategory={selectedCategory} />
      
      <hr className="border-gray-200" />
      <PromoSection />
    </main>
  )
}