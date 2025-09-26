'use client'

import { useState } from 'react'
import { Heart, Send, Loader2 } from 'lucide-react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [suggestedPoint, setSuggestedPoint] = useState(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setResponse('')
    setSuggestedPoint(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: query }),
      })

      const data = await res.json()
      setResponse(data.response)
      setSuggestedPoint(data.suggestedPoint)
    } catch (error) {
      setResponse('Mi dispiace, c\'è stato un errore. Riprova.')
    } finally {
      setIsLoading(false)
    }
  }

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
      <div className="max-w-2xl mx-auto px-6 space-y-6">
        
        {/* Chat Interface - PROTAGONISTA */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            💬 Come ti senti oggi?
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Descrivi i tuoi sintomi o come ti senti... 
Es: 'Ho mal di testa', 'Sono molto stressato', 'Non riesco a dormire'"
                rows={4}
                className="w-full px-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analizzo i tuoi sintomi...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Trova il punto giusto per me
                </>
              )}
            </button>
          </form>
        </div>

        {/* Response Section */}
        {(response || isLoading) && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                <span className="ml-3 text-gray-600">Sto analizzando i tuoi sintomi...</span>
              </div>
            )}
            
            {response && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-600 text-white rounded-full p-2 flex-shrink-0">
                      <Heart className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800 mb-2">Il mio consiglio per te:</h3>
                      <p className="text-green-700 leading-relaxed">{response}</p>
                    </div>
                  </div>
                </div>

                {suggestedPoint && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-bold text-blue-800 text-lg mb-3">
                      📍 {suggestedPoint.name} ({suggestedPoint.code})
                    </h4>
                    <p className="text-blue-700 mb-4">{suggestedPoint.location_description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="font-semibold text-blue-800">Durata:</span>
                        <span className="text-blue-700 ml-2">{suggestedPoint.pressure_duration} secondi</span>
                      </div>
                      <div>
                        <span className="font-semibold text-blue-800">Pressione:</span>
                        <span className="text-blue-700 ml-2">{suggestedPoint.pressure_type}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="font-semibold text-blue-800">Tecnica:</span>
                      <p className="text-blue-700 mt-1">{suggestedPoint.technique_description}</p>
                    </div>

                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                      🎯 Inizia Sessione Guidata
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Quick Examples */}
        {!response && !isLoading && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">💡 Esempi di cosa puoi scrivermi:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button 
                onClick={() => setQuery('Ho un forte mal di testa che non passa')}
                className="bg-red-50 border border-red-200 rounded-xl p-4 text-left hover:bg-red-100 transition-colors"
              >
                <div className="text-2xl mb-2">😩</div>
                <div className="text-sm font-medium text-red-800">"Ho un forte mal di testa"</div>
              </button>
              <button 
                onClick={() => setQuery('Sono molto stressato e teso')}
                className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-left hover:bg-orange-100 transition-colors"
              >
                <div className="text-2xl mb-2">😰</div>
                <div className="text-sm font-medium text-orange-800">"Sono molto stressato"</div>
              </button>
              <button 
                onClick={() => setQuery('Non riesco a dormire bene')}
                className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left hover:bg-blue-100 transition-colors"
              >
                <div className="text-2xl mb-2">😴</div>
                <div className="text-sm font-medium text-blue-800">"Non riesco a dormire"</div>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Status indicator */}
      <div className="fixed bottom-4 right-4">
        <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          ✅ LLM Chat Attiva!
        </div>
      </div>
    </main>
  )
}
