'use client'

import { useState } from 'react'
import { Heart, Send, Loader2, Sparkles, ArrowRight, MapPin, Clock, Zap } from 'lucide-react'

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

  const quickExamples = [
    {
      emoji: '😩',
      text: 'Ho un forte mal di testa che non passa',
      gradient: 'from-red-50 to-orange-50',
      border: 'border-red-200',
      hover: 'hover:from-red-100 hover:to-orange-100',
      color: 'text-red-800'
    },
    {
      emoji: '😰',
      text: 'Sono molto stressato e teso',
      gradient: 'from-orange-50 to-yellow-50',
      border: 'border-orange-200',
      hover: 'hover:from-orange-100 hover:to-yellow-100',
      color: 'text-orange-800'
    },
    {
      emoji: '😴',
      text: 'Non riesco a dormire bene',
      gradient: 'from-blue-50 to-indigo-50',
      border: 'border-blue-200',
      hover: 'hover:from-blue-100 hover:to-indigo-100',
      color: 'text-blue-800'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50/30">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl animate-float animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="pt-16 pb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur-md opacity-75"></div>
              <div className="relative bg-white p-3 rounded-2xl shadow-lg">
                <Heart className="text-emerald-600 h-8 w-8" />
              </div>
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              WellTouch
            </h1>
          </div>
          <p className="text-2xl text-slate-600 font-light mb-4">Digital pressure for natural wellness</p>
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/60 shadow-sm">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium text-slate-700">Powered by AI</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto space-y-8">
          
          {/* Chat Card */}
          <div className="group">
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-slate-800 mb-4">
                  Come ti senti oggi?
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Descrivi i tuoi sintomi e ti aiuterò a trovare il punto di digitopressione perfetto per te
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
                    className="w-full px-6 py-5 text-lg bg-white/50 backdrop-blur-sm border-2 border-slate-200/60 rounded-2xl focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/50 resize-none transition-all duration-300 placeholder-slate-400 leading-relaxed"
                    disabled={isLoading}
                    maxLength={500}
                  />
                  <div className="absolute bottom-3 right-4 text-sm text-slate-400 bg-white/50 px-2 py-1 rounded-full">
                    {query.length}/500
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="w-full group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin relative z-10" />
                      <span className="relative z-10">Analizzo i tuoi sintomi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 relative z-10" />
                      <span className="relative z-10">Trova il mio punto perfetto</span>
                      <ArrowRight className="h-5 w-5 relative z-10" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="relative animate-fade-in">
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/40">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 border-4 border-emerald-200 rounded-full animate-pulse"></div>
                    <Loader2 className="absolute inset-0 m-auto h-16 w-16 animate-spin text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">Sto analizzando i tuoi sintomi</h3>
                  <p className="text-slate-600 text-lg">Un momento mentre trovo il punto perfetto per te...</p>
                </div>
              </div>
            </div>
          )}

          {/* Response Section */}
          {response && !isLoading && (
            <div className="space-y-6 animate-fade-in">
              {/* AI Response */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg">
                      <Sparkles className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Il mio consiglio per te</h3>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-slate-700 leading-relaxed">{response}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggested Point */}
              {suggestedPoint && (
                <div className="relative bg-gradient-to-br from-blue-50/50 to-indigo-50/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-white/80 px-6 py-3 rounded-full mb-4">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <h4 className="text-3xl font-bold text-slate-800">{suggestedPoint.name}</h4>
                    </div>
                    <span className="inline-block bg-white/80 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold border border-slate-200">
                      {suggestedPoint.code}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/80 rounded-2xl p-6">
                      <h5 className="font-bold text-slate-800 text-lg mb-3 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-blue-500" />
                        Dove trovarlo
                      </h5>
                      <p className="text-slate-700 leading-relaxed">{suggestedPoint.location_description}</p>
                    </div>
                    
                    <div className="bg-white/80 rounded-2xl p-6">
                      <h5 className="font-bold text-slate-800 text-lg mb-3 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-purple-500" />
                        Come fare
                      </h5>
                      <p className="text-slate-700 leading-relaxed">{suggestedPoint.technique_description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/80 rounded-2xl p-6 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <h6 className="font-bold text-slate-800">Durata</h6>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{suggestedPoint.pressure_duration}s</p>
                    </div>
                    <div className="bg-white/80 rounded-2xl p-6 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Zap className="h-5 w-5 text-purple-500" />
                        <h6 className="font-bold text-slate-800">Pressione</h6>
                      </div>
                      <p className="text-xl font-semibold text-purple-600 capitalize">{suggestedPoint.pressure_type}</p>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]">
                    <span>🎯</span>
                    Inizia Sessione Guidata
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick Examples */}
          {!response && !isLoading && (
            <div className="relative animate-fade-in">
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
                <h3 className="text-2xl font-bold text-center text-slate-800 mb-8">
                  💡 Esempi di cosa puoi chiedermi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickExamples.map((example, index) => (
                    <button 
                      key={index}
                      onClick={() => setQuery(example.text)}
                      className={`group bg-gradient-to-br ${example.gradient} border ${example.border} rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${example.hover}`}
                    >
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {example.emoji}
                      </div>
                      <div className={`font-semibold text-lg mb-2 ${example.color}`}>
                        {example.text}
                      </div>
                      <div className="text-sm text-slate-500 group-hover:text-slate-600">
                        Clicca per provare
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 pb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg border border-white/40">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-slate-700 font-medium">Sistema AI attivo e funzionante</span>
          </div>
        </footer>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
