function ShopDashboardTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <p className="text-gray-500 text-sm font-medium mb-1">Orders Today</p>
        <p className="text-3xl font-bold text-gray-900">24</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <p className="text-gray-500 text-sm font-medium mb-1">Revenue Today</p>
        <p className="text-3xl font-bold text-gray-900">LKR 45,200</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <p className="text-gray-500 text-sm font-medium mb-1">Top Selling Item</p>
        <p className="text-xl font-bold text-gray-900 mt-2">Cheese Burger</p>
      </div>
    </div>
  );
}

export default ShopDashboardTab;