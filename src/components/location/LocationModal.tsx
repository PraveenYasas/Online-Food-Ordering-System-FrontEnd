import { useState } from 'react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress?: (address: string) => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const [currentView, setCurrentView] = useState<'list' | 'details'>('list');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-120 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      
      {/* Modal Container */}
      <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] md:max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0 relative">
          <h2 className="text-xl font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">
            {currentView === 'list' ? 'Addresses' : 'Address info'}
          </h2>
          <div className="w-8"></div> 
          <button onClick={() => { onClose(); setCurrentView('list'); }} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto no-scrollbar flex-1">
          
          {/* ================= VIEW 1: ADDRESS LIST ================= */}
          {currentView === 'list' && (
            <div className="p-4 sm:p-6 animate-fade-in">
              
              {/* Search Bar */}
              <div className="relative mb-6">
                <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search for an address" 
                  className="w-full bg-gray-100 pl-12 pr-4 py-3.5 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-black border border-transparent transition-all" 
                />
              </div>

              {/* Saved Addresses */}
              <h3 className="font-bold text-lg text-gray-900 mb-2">Saved addresses</h3>
              
              <div className="flex flex-col mb-6">
                {/* Address Item 1 */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors px-2 rounded-lg" onClick={() => setCurrentView('details')}>
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-gray-900 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <div>
                      <p className="font-bold text-gray-900 text-[16px]">Work</p>
                      <p className="text-sm text-gray-500 mt-0.5">SLTJ Head Office, 241A Sri Saddarma Mawatha, Colombo</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                </div>

                {/* Address Item 2 */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors px-2 rounded-lg" onClick={() => setCurrentView('details')}>
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-black mt-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    <div>
                      <p className="font-bold text-gray-900 text-[16px]">Upali Hardware</p>
                      <p className="text-sm text-gray-500 mt-0.5">PX4W+FF9, Atulugama Rd, Bandaragama</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                </div>
              </div>

              {/* Time Preference */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-gray-900">Time preference</h3>
                <button className="text-sm font-semibold text-gray-900 hover:underline">See all</button>
              </div>
              
              <div className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 transition-colors px-2 rounded-lg">
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="font-bold text-gray-900 text-[16px]">Deliver now</p>
                </div>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-black transition-colors">
                  Schedule
                </button>
              </div>

            </div>
          )}

          {/* ================= VIEW 2: ADDRESS INFO DETAILS ================= */}
          {currentView === 'details' && (
            <div className="p-4 sm:p-6 flex flex-col gap-5 animate-fade-in">
              
              {/* Map Placeholder */}
              <div className="w-full h-40 bg-gray-200 rounded-xl relative overflow-hidden flex items-center justify-center">
                {/* Fake map image background */}
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Bandaragama,Sri+Lanka&zoom=14&size=600x300&maptype=roadmap&key=mock')] bg-cover bg-center opacity-50"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <svg className="w-8 h-8 text-black drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <span className="bg-white px-3 py-1.5 rounded-full shadow-md text-sm font-bold mt-2">Adjust pin</span>
                </div>
              </div>

              {/* Address Text */}
              <p className="text-[16px] font-medium text-gray-900">
                PX4W+FF9, Atulugama Rd, Bandaragama, Sri Lanka
              </p>

              {/* Form Fields */}
              <div>
                <label className="block text-[15px] font-bold text-gray-900 mb-2">Building type</label>
                <div className="relative">
                  <select className="w-full bg-gray-100 px-4 py-3.5 rounded-xl text-gray-900 font-medium focus:outline-none appearance-none cursor-pointer">
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Office</option>
                  </select>
                  <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              <div>
                <label className="block text-[15px] font-bold text-gray-900 mb-2">Building name</label>
                <input type="text" placeholder="e.g. Central Tower" className="w-full bg-gray-100 px-4 py-3.5 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-black border border-transparent transition-all" />
              </div>

              <div>
                <label className="block text-[15px] font-bold text-gray-900 mb-2">Landmark (required)</label>
                <input type="text" defaultValue="budda statue" className="w-full bg-gray-100 px-4 py-3.5 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-black border border-transparent transition-all" />
              </div>

              <div>
                <label className="block text-[15px] font-bold text-gray-900 mb-3">Dropoff options</label>
                <div className="flex items-center justify-between border border-gray-200 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#e6f4ea] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#137333]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-[15px]">Meet at my door</p>
                      <p className="text-xs text-[#137333] bg-[#e6f4ea] px-2 py-0.5 rounded inline-block mt-0.5 font-semibold">More options available</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-black transition-colors">Edit</button>
                </div>
              </div>

              <div>
                <label className="block text-[15px] font-bold text-gray-900 mb-2">Instructions for delivery person</label>
                <textarea 
                  placeholder="Example: Please knock instead of using the doorbell" 
                  className="w-full bg-gray-100 px-4 py-3.5 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-black border border-transparent transition-all h-24 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-[15px] font-bold text-gray-900 mb-2">Address label</label>
                <input type="text" placeholder="Add a label (e.g. school)" className="w-full bg-gray-100 px-4 py-3.5 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-black border border-transparent transition-all" />
              </div>

            </div>
          )}

        </div>

        {/* Footer (Only for Details View) */}
        {currentView === 'details' && (
          <div className="p-4 sm:p-6 border-t border-gray-100 flex items-center justify-between shrink-0 bg-white">
            <button 
              onClick={() => setCurrentView('list')} 
              className="px-6 py-3.5 text-gray-900 font-bold hover:bg-gray-100 rounded-xl transition-colors"
            >
              Back
            </button>
            <button 
              onClick={() => { onClose(); setCurrentView('list'); }} 
              className="px-8 py-3.5 bg-black hover:bg-gray-800 text-white font-bold rounded-xl transition-colors"
            >
              Save
            </button>
          </div>
        )}

      </div>
    </div>
  );
}