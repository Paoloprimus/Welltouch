'use client'

import { useState } from 'react'
import { Heart, Send, Loader2, Sparkles, ArrowRight } from 'lucide-react'

interface SuggestedPoint {
  id: string
  code: string
  name: string
  location_description: string
  pressure_duration: number
  pressure_type: string
  technique_description: string
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [suggestedPoint, setSuggestedPoint] = useState<SuggestedPoint | null>(null)

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="pt-12 pb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Heart className="text-emerald-600 h-10 w-10" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              WellTouch
            </h1>
          </div>
          <p className="text-xl text-gray-600 font-medium">Digital pressure for natural wellness</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-600 font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Powered by AI</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          
          {/* Main Chat Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  Come ti senti oggi?
                </h2>
                <p className="text-gray-600 text-lg">
                  Descrivi i tuoi sintomi e ti aiuterò a trovare il punto di digitopressione perfetto
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Scrivi come ti senti... 
                    
Es: 'Ho mal di testa da questa mattina'
    'Sono molto stressato dal lavoro'
    'Non riesco a dormire bene'"
                    rows={5}
                    className="w-full px-6 py-6 text-lg bg-white/50 backdrop-blur-sm border-2 border-emerald-200/50 rounded-2xl focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 resize-none transition-all duration-300 placeholder-gray-500"
                    disabled={isLoading}
                  />
                  <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                    {query.length}/500
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white py-5 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      Analizzo i tuoi sintomi...
                    </>
                  ) : (
                    <>
                      <Send className="h-6 w-6" />
                      Trova il mio punto perfetto
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="relative mb-6">
                    <Loader2 className="h-16 w-16 animate-spin text-emerald-500" />
                    <div className="absolute inset-0 h-16 w-16 border-4 border-emerald-200 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Sto analizzando i tuoi sintomi</h3>
                  <p className="text-gray-600 text-lg">Un momento mentre trovo il punto perfetto per te...</p>
                </div>
              </div>
            </div>
          )}

          {/* Response Section */}
          {response && !isLoading && (
            <div className="space-y-6">
              {/* AI Response */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg">
                        <Heart className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-emerald-800 mb-3">Il mio consiglio per te:</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{response}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggested Point */}
              {suggestedPoint && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                    <div className="text-center mb-6">
                      <h4 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        📍 {suggestedPoint.name}
                      </h4>
                      <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                        {suggestedPoint.code}
                      </span>
                    </div>
                    
                    <div className="bg-white/50 rounded-2xl p-6 mb-6">
                      <h5 className="font-bold text-gray-800 text-lg mb-3">📍 Dove trovarlo:</h5>
                      <p className="text-gray-700 text-lg leading-relaxed">{suggestedPoint.location_description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white/50 rounded-2xl p-6">
                        <h6 className="font-bold text-gray-800 mb-2">⏱️ Durata</h6>
                        <p className="text-2xl font-bold text-blue-600">{suggestedPoint.pressure_duration}s</p>
                      </div>
                      <div className="bg-white/50 rounded-2xl p-6">
                        <h6 className="font-bold text-gray-800 mb-2">💪 Pressione</h6>
                        <p className="text-xl font-semibold text-purple-600 capitalize">{suggestedPoint.pressure_type}</p>
                      </div>
                    </div>

                    <div className="bg-white/50 rounded-2xl p-6 mb-8">
                      <h6 className="font-bold text-gray-800 text-lg mb-3">🔧 Come fare:</h6>
                      <p className="text-gray-700 text-lg leading-relaxed">{suggestedPoint.technique_description}</p>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 px-8 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                      <span>🎯</span>
                      Inizia Sessione Guidata
                      <ArrowRight className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Examples */}
          {!response && !isLoading && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                  💡 Esempi di cosa puoi scrivermi:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setQuery('Ho un forte mal di testa che non passa')}
                    className="group bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200/50 rounded-2xl p-6 text-left hover:from-red-100 hover:to-orange-100 hover:border-red-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">😩</div>
                    <div className="font-bold text-red-800 text-lg">"Ho un forte mal di testa"</div>
                    <div className="text-red-600 text-sm mt-2">Clicca per provare</div>
                  </button>
                  <button 
                    onClick={() => setQuery('Sono molto stressato e teso')}
                    className="group bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200/50 rounded-2xl p-6 text-left hover:from-orange-100 hover:to-yellow-100 hover:border-orange-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">😰</div>
                    <div className="font-bold text-orange-800 text-lg">"Sono molto stressato"</div>
                    <div className="text-orange-600 text-sm mt-2">Clicca per provare</div>
                  </button>
                  <button 
                    onClick={() => setQuery('Non riesco a dormire bene')}
                    className="group bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200/50 rounded-2xl p-6 text-left hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">😴</div>
                    <div className="font-bold text-blue-800 text-lg">"Non riesco a dormire"</div>
                    <div className="text-blue-600 text-sm mt-2">Clicca per provare</div>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="mt-16 pb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg border border-white/20">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-medium">Sistema AI attivo e funzionante</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
