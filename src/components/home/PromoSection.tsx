const promos = [
  { title: 'Try Uber One free for 3 months', desc: 'Enjoy $0 Delivery Fee on eligible orders', color: 'bg-orange-50' },
  { title: 'Get your essentials from Keells', desc: 'A wide range of groceries', color: 'bg-green-50' },
  { title: 'Get almost everything delivered', desc: 'Order from grocery stores, pet supply shops, and more', color: 'bg-blue-50' },
  { title: '40% Off for New Users*', desc: 'Unlock big savings! Get up to 40% off on 1,000+ items', color: 'bg-emerald-50' }
]

function PromoSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 py-4 mb-10">
      {promos.map((promo) => (
        <div key={promo.title} className={`${promo.color} p-6 rounded-2xl cursor-pointer hover:opacity-90 transition min-h-40 flex flex-col justify-between`}>
          <div>
            <h3 className="text-xl font-bold leading-tight mb-2 text-black">{promo.title}</h3>
            <p className="text-sm text-gray-700">{promo.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PromoSection;