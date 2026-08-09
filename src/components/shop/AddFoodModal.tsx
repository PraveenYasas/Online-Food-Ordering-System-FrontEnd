import { useState } from 'react';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: any[];
  token: string | null;
}

function AddFoodModal({ isOpen, onClose, categories, token }: AddFoodModalProps) {
  const [foodName, setFoodName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSaveFood = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!imageFile || !foodName || !price || !categoryId) {
      alert("Please fill in all fields with valid information and image!");
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const imageRes = await fetch('http://localhost:8080/api/v1/images/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (!imageRes.ok) throw new Error("Image upload failed");
      const imageUrl = await imageRes.text();

      const foodData = {
        name: foodName,
        categoryId: Number(categoryId),
        price: parseFloat(price),
        description: description,
        imageUrl: imageUrl 
      };

      const foodRes = await fetch('http://localhost:8080/api/v1/food-items', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(foodData)
      });

      if (foodRes.ok) {
        alert("Food item saved successfully!");
        setFoodName(''); setCategoryId(''); setPrice(''); setDescription(''); setImageFile(null);
        onClose(); // සේව් වුණාට පස්සේ Modal එක වහනවා
      } else {
        alert("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Error saving food:", error);
      alert("Error connecting to the server!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-200 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="bg-[#34A853] p-5 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xl font-bold">Add New Food Item</h2>
            <p className="text-white/80 text-xs mt-1">Fill in the details to add this item to your menu</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto no-scrollbar">
          <form className="flex flex-col gap-5" onSubmit={handleSaveFood}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Food Name</label>
                <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} placeholder="e.g. Spicy Chicken Burger" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Food Category</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none bg-white" required>
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Price (LKR)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 1200.00" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Item Status</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none bg-white">
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Description (Optional)</label>
              <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description about the food..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none resize-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Upload Food Image</label>
              <input type="file" id="foodImage" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]); }} />
              <label htmlFor="foodImage" className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-[#34A853] hover:bg-[#f0f9f2] transition-colors cursor-pointer group">
                {imageFile ? (
                  <>
                     <svg className="w-8 h-8 mb-2 text-[#34A853]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                     <span className="text-sm font-bold text-[#34A853]">{imageFile.name}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-8 h-8 mb-2 text-gray-400 group-hover:text-[#34A853] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#34A853] transition-colors">Click to upload food image</span>
                  </>
                )}
              </label>
            </div>
            <div className="mt-2 flex gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={onClose} disabled={isSaving} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" disabled={isSaving} className="flex-1 bg-[#34A853] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#2b8f45] transition-colors">
                {isSaving ? 'Saving...' : 'Save Food Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFoodModal;