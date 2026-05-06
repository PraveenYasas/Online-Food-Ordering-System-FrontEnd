const categories = [
  { name: 'Grocery', img: '🍌' }, { name: 'Soup', img: '🍜' },
  { name: 'Chinese', img: '🥡' }, { name: 'Burgers', img: '🍔' },
  { name: 'Desserts', img: '🍰' }, { name: 'BBQ', img: '🍗' },
  { name: 'Korean', img: '🍱' }, { name: 'Bakery', img: '🥐' },
  { name: 'Indian', img: '🍛' }, { name: 'Asian', img: '🍙' },
  { name: 'Salads', img: '🥗' }, { name: 'Smoothies', img: '🥤' }
]

export default function CategorySection() {
  return (
    <div className="flex gap-8 overflow-x-auto px-6 py-8 no-scrollbar bg-white">
      {categories.map((cat) => (
        <div key={cat.name} className="flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            {cat.img}
          </div>
          <span className="text-sm font-bold text-gray-800">{cat.name}</span>
        </div>
      ))}
    </div>
  )
}