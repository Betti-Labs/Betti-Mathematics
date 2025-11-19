import React, { useState } from 'react'
import CosmicTorus from './CosmicTorus'
import Verification from './Verification'
import './App.css'

function App() {
  const [view, setView] = useState('demo'); // 'demo' or 'verify'

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 right-0 p-4 z-50 flex gap-4">
        <button
          onClick={() => setView('demo')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${view === 'demo' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
        >
          Cosmic Visualization
        </button>
        <button
          onClick={() => setView('verify')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${view === 'verify' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'}`}
        >
          Verify Engine
        </button>
      </nav>

      {view === 'demo' ? <CosmicTorus /> : <Verification />}

      <div className="fixed bottom-2 right-2 text-xs text-gray-600 pointer-events-none">
        v3.0 (Cosmic Torus)
      </div>
    </div>
  )
}

export default App
