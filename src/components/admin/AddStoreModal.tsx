import { useState } from 'react';

interface AddStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddStoreModal({ isOpen, onClose }: AddStoreModalProps) {
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [ownerEmail, setOwnerEmail] = useState(''); 
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleStoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', storeName);
    formData.append('address', address);
    formData.append('contactNumber', contact);
    formData.append('ownerEmail', ownerEmail); 
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const token = localStorage.getItem('token'); 

      const response = await fetch('http://localhost:8080/api/v1/restaurants', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` 
        },
        body: formData, 
      });

      if (response.ok) {
        alert("Store Registered Successfully! 🎉");
        onClose();
        window.location.reload(); 
      } else {
        alert("Failed to register store.");
      }
    } catch (error) {
      console.error("Error saving store:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-black p-5 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xl font-bold">Approve & Register New Store</h2>
            <p className="text-gray-300 text-xs mt-1">Fill in the details to onboard a new vendor</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable Form Area */}
        <div className="p-6 overflow-y-auto no-scrollbar">
          <form onSubmit={handleStoreSubmit} className="flex flex-col gap-5">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Store Name</label>
                <input type="text" required value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="e.g. C Foods" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Owner Email (Login ID)</label>
                <input type="email" required value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} placeholder="e.g. owner@cfoods.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none" />
              </div>
            </div>

            {/* 🔥 Store Category එක අයින් කරලා Contact Number එක විතරක් දැම්මා */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Contact Number</label>
              <input type="tel" required value={contact} onChange={(e) => setContact(e.target.value)} placeholder="e.g. 077 123 4567" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Store Address / Location</label>
              <textarea rows={2} required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. 123, Main Street, Colombo 04" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none resize-none"></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Store Cover Image (Required)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-black hover:bg-gray-50 transition-colors relative group cursor-pointer">
                <input type="file" accept="image/*" required onChange={(e) => { if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]); }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <svg className="w-8 h-8 mb-2 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">{imageFile ? imageFile.name : 'Click to upload or drag & drop'}</span>
              </div>
            </div>

            <div className="mt-2 flex gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="flex-1 bg-black text-white px-4 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 cursor-pointer">
                {isSubmitting ? 'Approving...' : 'Approve & Register Store'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}