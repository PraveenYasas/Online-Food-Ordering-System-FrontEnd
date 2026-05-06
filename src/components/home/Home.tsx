import CategorySection from "../food/CategorySection"
import HeroSection from "../hero/HeroSection"
import PromoSection from "../home/PromoSection"

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <HeroSection />
      <hr className="border-gray-200" />
      <CategorySection />
      <hr className="border-gray-200" />
      <PromoSection />
    </main>
  )
}