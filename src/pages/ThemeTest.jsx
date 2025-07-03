import React from 'react';

// This is a test component to identify Tailwind CSS v4 compatibility issues
export default function ThemeTest() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Tailwind CSS v4 Test Page</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Opacity Tests</h2>
        
        {/* Old way (v3): hover:bg-opacity-90 */}
        <div className="p-4 mb-4 bg-purple-600 hover:bg-purple-600/90">
          Hover me (using /90 notation for 90% opacity)
        </div>
        
        {/* Test other opacity values */}
        <div className="p-4 mb-4 bg-blue-600 hover:bg-blue-600/80">
          Hover me (using /80 notation for 80% opacity)
        </div>
        
        <div className="p-4 mb-4 bg-green-600 hover:bg-green-600/70">
          Hover me (using /70 notation for 70% opacity)
        </div>
        
        <div className="p-4 mb-4 text-white/80">
          This text is at 80% opacity
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Color Tests</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-purple-600">Purple 600</div>
          <div className="p-4 bg-purple-700">Purple 700</div>
          <div className="p-4 bg-indigo-600">Indigo 600</div>
          <div className="p-4 bg-indigo-700">Indigo 700</div>
          <div className="p-4 bg-gray-800">Gray 800</div>
          <div className="p-4 bg-gray-900">Gray 900</div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Button Tests</h2>
        
        <div className="space-y-4">
          <button className="px-6 py-2 rounded-xl font-semibold shadow-md bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white hover:scale-[1.03]">
            Gradient Button (hover scale)
          </button>
          
          <button className="px-6 py-2 rounded-xl font-semibold shadow-md bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 hover:border-purple-600">
            Secondary Button
          </button>
          
          <button className="px-6 py-2 rounded-xl font-semibold shadow-md bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-600/5">
            Outline Button
          </button>
        </div>
      </section>
    </div>
  );
}
