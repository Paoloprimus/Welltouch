'use client'

import { useState } from 'react'
import { Heart, Send, Loader2, Sparkles, ArrowRight, MapPin, Clock, Zap, Map, X } from 'lucide-react'
import BodyMap from '@/components/BodyMap'

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
  const [showBodyMap, setShowBodyMap] = useState(false)

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

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await res.json()
      setResponse(data.response)
      setSuggestedPoint(data.suggestedPoint)
    } catch (error) {
      console.error('Error:', error)
      setResponse('Mi dispiace, c\'è stato un errore. Riprova.')
    } finally {
      setIsLoading(false)
    }
  }

  const quickExamples = [
    {
      emoji: '😩',
      text: 'Ho un forte mal di testa che non passa',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      hoverColor: 'hover:bg-red-100',
      textColor: 'text-red-800'
    },
    {
      emoji: '😰',
      text: 'Sono molto stressato e teso',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      hoverColor: 'hover:bg-orange-100',
      textColor: 'text-orange-800'
    },
    {
      emoji: '😴',
      text: 'Non riesco a dormire bene',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:bg-blue-100',
      textColor: 'text-blue-800'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur-md opacity-75"></div>
              <div className="relative bg-white p-3 rounded-2xl shadow-lg">
                <Heart className="text-emerald-600 h-8 w-8" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              WellTouch
            </h1>
          </div>
          <p className="text-xl text-gray-600 font-light mb-4">Digital pressure for natural wellness</p>
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/60 shadow-sm">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium text-gray-700">Powered by AI</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto space-y-8">
          {/* Chat Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Come ti senti oggi?
              </h2>
              <p className="text-lg text-gray-600">
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
                  rows={4}
                  className="w-full px-6 py-4 text-lg bg-white/50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/50 resize-none transition-all duration-300 placeholder-gray-500 leading-relaxed"
                  disabled={isLoading}
                  maxLength={500}
                />
                <div className="absolute bottom-3 right-3 text-sm text-gray-400 bg-white/80 px-2 py-1 rounded-full">
                  {query.length}/500
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analizzo i tuoi sintomi...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Trova il mio punto perfetto
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Body Map Button */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/40">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Oppure esplora direttamente
              </h3>
              <button 
                onClick={() => setShowBodyMap(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <Map className="h-5 w-5" />
                🗺️ Mappa del Corpo Interattiva
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/40">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 border-4 border-emerald-200 rounded-full animate-pulse"></div>
                  <Loader2 className="absolute inset-0 m-auto h-16 w-16 animate-spin text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Sto analizzando i tuoi sintomi</h3>
                <p className="text-gray-600 text-lg">Un momento mentre trovo il punto perfetto per te...</p>
              </div>
            </div>
          )}

          {/* Response Section */}
          {response && !isLoading && (
            <div className="space-y-6">
              {/* AI Response */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg">
                      <Sparkles className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Il mio consiglio per te</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{response}</p>
                  </div>
                </div>
              </div>

              {/* Suggested Point */}
              {suggestedPoint && (
                <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-white/80 px-6 py-3 rounded-full mb-4">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <h4 className="text-3xl font-bold text-gray-800">{suggestedPoint.name}</h4>
                    </div>
                    <span className="inline-block bg-white/80 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold border border-gray-200">
                      {suggestedPoint.code}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/80 rounded-2xl p-6">
                      <h5 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-blue-500" />
                        Dove trovarlo
                      </h5>
                      <p className="text-gray-700 leading-relaxed">{suggestedPoint.location_description}</p>
                    </div>
                    
                    <div className="bg-white/80 rounded-2xl p-6">
                      <h5 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-purple-500" />
                        Come fare
                      </h5>
                      <p className="text-gray-700 leading-relaxed">{suggestedPoint.technique_description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/80 rounded-2xl p-6 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <h6 className="font-bold text-gray-800">Durata</h6>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{suggestedPoint.pressure_duration}s</p>
                    </div>
                    <div className="bg-white/80 rounded-2xl p-6 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Zap className="h-5 w-5 text-purple-500" />
                        <h6 className="font-bold text-gray-800">Pressione</h6>
                      </div>
                      <p className="text-xl font-semibold text-purple-600 capitalize">{suggestedPoint.pressure_type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={() => setShowBodyMap(true)}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Map className="h-5 w-5" />
                      Vedi sulla Mappa
                    </button>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <span>🎯</span>
                      Inizia Sessione
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Examples */}
          {!response && !isLoading && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
                💡 Esempi di cosa puoi chiedermi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickExamples.map((example, index) => (
                  <button 
                    key={index}
                    onClick={() => setQuery(example.text)}
                    className={`${example.bgColor} ${example.borderColor} border-2 rounded-2xl p-6 text-left ${example.hoverColor} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
                  >
                    <div className="text-4xl mb-3">{example.emoji}</div>
                    <div className={`font-semibold text-lg mb-2 ${example.textColor}`}>
                      {example.text}
                    </div>
                    <div className="text-sm text-gray-600">Clicca per provare</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 pb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xl px-6 py-3 rounded-full border border-gray-200/60 shadow-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Sistema AI attivo e funzionante</span>
          </div>
        </footer>
      </div>

      {/* Body Map Modal */}
      {showBodyMap && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowBodyMap(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-full transition-colors z-10"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
            
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              🗺️ Mappa del Corpo
            </h2>
            
            <BodyMap 
              selectedPointId={suggestedPoint?.id}
              onPointSelect={(point) => {
                console.log('Punto selezionato:', point)
                // Qui puoi gestire la selezione del punto
                // setShowBodyMap(false) // Chiudi la mappa dopo selezione
              }} 
            />
          </div>
        </div>
      )}
    </div>
  )
}
