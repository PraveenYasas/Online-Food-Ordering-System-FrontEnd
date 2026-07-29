import CategorySection from "./CategorySection"
import HeroSection from "../hero/HeroSection"
import PromoSection from "../home/PromoSection"
import FoodItemsSection from "./FoodItemsSection" // අලුතින් import කරපු කෑල්ල

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <HeroSection />
      <hr className="border-gray-200" />
      <CategorySection />
      <hr className="border-gray-200" />
      <FoodItemsSection />
      <hr className="border-gray-200" />
      <PromoSection />
    </main>
  )
}