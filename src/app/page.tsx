'use client'

import { useState } from 'react'
import { Heart, Search, Map, Timer } from 'lucide-react'

export default function Home() {
  const [query, setQuery] = useState('')

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="text-green-600 h-8 w-8" />
          <h1 className="text-3xl font-bold text-gray-800">WellTouch</h1>
        </div>
        <p className="text-gray-600">Digital pressure for natural wellness</p>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 space-y-6">
        
        {/* Chat Interface */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            💬 Come stai oggi?
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Descrivi il tuo disturbo..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition-colors">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">🔥 Accesso Rapido</h3>
          <div className="grid grid-cols-3 gap-3">
            <button className="bg-red-50 border border-red-200 rounded-xl p-4 text-center hover:bg-red-100 transition-colors">
              <div className="text-2xl mb-2">😩</div>
              <div className="text-sm font-medium">Mal di testa</div>
            </button>
            <button className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center hover:bg-orange-100 transition-colors">
              <div className="text-2xl mb-2">😰</div>
              <div className="text-sm font-medium">Stress</div>
            </button>
            <button className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:bg-blue-100 transition-colors">
              <div className="text-2xl mb-2">😴</div>
              <div className="text-sm font-medium">Sonno</div>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-green-700 hover:to-blue-700 transition-all">
            <Map className="h-5 w-5" />
            Esplora Mappa Corporea
          </button>
        </div>

        {/* Last Session */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">📊 La tua ultima sessione</h3>
          <div className="flex items-center gap-3">
            <Timer className="h-5 w-5 text-green-600" />
            <div>
              <div className="font-medium">5 minuti</div>
              <div className="text-sm text-gray-600">Punto LI4 - Hegu</div>
            </div>
          </div>
        </div>

      </div>

      {/* Status indicator */}
      <div className="fixed bottom-4 right-4">
        <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          ✅ Setup completato!
        </div>
      </div>
    </main>
  )
}
