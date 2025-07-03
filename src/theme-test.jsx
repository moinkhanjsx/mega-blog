import React from 'react';

// Create a simple test component to verify dark theme across components
const ThemeTest = () => (
  <div className="min-h-screen bg-gray-950 py-8">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-white text-center mb-12">Dark Theme Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Basic UI Elements */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Typography</h2>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">Heading</h3>
          <p className="text-gray-300 mb-2">Standard paragraph text</p>
          <p className="text-gray-400 text-sm">Secondary text</p>
          <p className="text-purple-400 mt-2">Accent text</p>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Buttons</h2>
          <button className="w-full mb-3 px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition">
            Primary Button
          </button>
          <button className="w-full mb-3 px-4 py-2 rounded-lg bg-gray-800 text-white font-medium border border-gray-700 hover:bg-gray-700 transition">
            Secondary Button
          </button>
          <button className="w-full px-4 py-2 rounded-lg bg-transparent text-purple-400 font-medium border border-purple-500 hover:bg-purple-900/20 transition">
            Outline Button
          </button>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Form Elements</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Input Label</label>
            <input 
              type="text" 
              placeholder="Placeholder text..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Select</label>
            <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Cards & Containers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="font-medium text-gray-200">Basic Card</h3>
              <p className="text-gray-400 text-sm mt-2">Simple card component with minimal styling</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
              <h3 className="font-medium text-gray-200">Gradient Card</h3>
              <p className="text-gray-400 text-sm mt-2">Card with gradient background</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-purple-900/50 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <h3 className="font-medium text-purple-300">Accent Card</h3>
              <p className="text-gray-400 text-sm mt-2">Card with accent styling</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>Dark theme verification - All UI components should use consistent dark mode colors</p>
      </div>
    </div>
  </div>
);

export default ThemeTest;
