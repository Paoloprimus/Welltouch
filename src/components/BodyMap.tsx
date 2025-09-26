'use client'

import { useState, useEffect } from 'react'
import { X, MapPin, Clock, Target } from 'lucide-react'

interface DigipointLocation {
  id: string
  code: string
  name: string
  x: number // Percentuale posizione X (0-100)
  y: number // Percentuale posizione Y (0-100)
  body_part: string
  location_description: string
  pressure_duration: number
  difficulty_level: number
}

interface BodyMapProps {
  selectedPointId?: string
  onPointSelect?: (point: DigipointLocation) => void
}

export default function BodyMap({ selectedPointId, onPointSelect }: BodyMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<DigipointLocation | null>(null)
  const [points, setPoints] = useState<DigipointLocation[]>([])
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front')
  const [isLoading, setIsLoading] = useState(true)

  // Punti di esempio con coordinate (da sostituire con fetch dal database)
  const samplePoints: DigipointLocation[] = [
    // Vista frontale
    { id: '1', code: 'LI4', name: 'Hegu', x: 72, y: 45, body_part: 'hand', location_description: 'Tra pollice e indice', pressure_duration: 120, difficulty_level: 1 },
    { id: '2', code: 'EX-HN5', name: 'Yintang', x: 50, y: 22, body_part: 'head', location_description: 'Centro della fronte', pressure_duration: 60, difficulty_level: 1 },
    { id: '3', code: 'ST36', name: 'Zusanli', x: 48, y: 72, body_part: 'leg', location_description: 'Sotto il ginocchio', pressure_duration: 180, difficulty_level: 2 },
    // Vista posteriore
    { id: '4', code: 'GB20', name: 'Feng Chi', x: 45, y: 25, body_part: 'head', location_description: 'Base del cranio', pressure_duration: 180, difficulty_level: 2 }
  ]

  useEffect(() => {
    // Simula loading dei punti dal database
    setTimeout(() => {
      setPoints(samplePoints)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handlePointClick = (point: DigipointLocation) => {
    setSelectedPoint(point)
    onPointSelect?.(point)
  }

  const closePopup = () => {
    setSelectedPoint(null)
  }

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-green-500'
      case 2: return 'bg-yellow-500'  
      case 3: return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getDifficultyText = (level: number) => {
    switch (level) {
      case 1: return 'Facile'
      case 2: return 'Medio'
      case 3: return 'Avanzato'
      default: return 'Sconosciuto'
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* View Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-white/20">
          <button
            onClick={() => setViewMode('front')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              viewMode === 'front'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-emerald-600'
            }`}
          >
            👤 Frontale
          </button>
          <button
            onClick={() => setViewMode('back')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              viewMode === 'back'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-emerald-600'
            }`}
          >
            🔄 Posteriore
          </button>
        </div>
      </div>

      {/* Body Map Container */}
      <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="relative w-full aspect-[2/3] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden">
          
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
          )}

          {/* Simple Body Outline SVG */}
          <svg
            viewBox="0 0 200 300"
            className="absolute inset-0 w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
          >
            {viewMode === 'front' ? (
              // Vista frontale semplificata
              <g>
                {/* Testa */}
                <ellipse cx="100" cy="40" rx="25" ry="30" fill="#f0f9ff" stroke="#0891b2" strokeWidth="2"/>
                {/* Collo */}
                <rect x="90" y="65" width="20" height="15" fill="#f0f9ff" stroke="#0891b2" strokeWidth="2"/>
                {/* Torso */}
                <ellipse cx="100" cy="140" rx="40" ry="60" fill="#f0f9ff" stroke="#0891b2" strokeWidth="2"/>
                {/* Braccio sinistro */}
                <ellipse cx="60" cy="120" rx="12" ry="35" fill="#f0f9ff" stroke="#0891b2" strokeWidth="2"/>
                {/* Braccio destro */}
                <ellipse cx="140" cy="120" rx="12" ry="35" fill="#f0f9ff" stroke="#0891b2" strokeWidth="2"/>
                {/* Gamba sinistra */}
                <ellipse cx="80" cy="230" rx="15" ry="50" fill="#f0f9ff" stroke="#0891b2" strokeWidth="2"/>
                {/* Gamba destra */}
                <ellipse cx="120" cy="230" rx="15" ry="50" fill="#f0f9ff" stroke="#0891b2" strokeWidth="2"/>
              </g>
            ) : (
              // Vista posteriore semplificata
              <g>
                {/* Testa */}
                <ellipse cx="100" cy="40" rx="25" ry="30" fill="#fef3f2" stroke="#dc2626" strokeWidth="2"/>
                {/* Collo */}
                <rect x="90" y="65" width="20" height="15" fill="#fef3f2" stroke="#dc2626" strokeWidth="2"/>
                {/* Torso */}
                <ellipse cx="100" cy="140" rx="40" ry="60" fill="#fef3f2" stroke="#dc2626" strokeWidth="2"/>
                {/* Braccio sinistro */}
                <ellipse cx="140" cy="120" rx="12" ry="35" fill="#fef3f2" stroke="#dc2626" strokeWidth="2"/>
                {/* Braccio destro */}
                <ellipse cx="60" cy="120" rx="12" ry="35" fill="#fef3f2" stroke="#dc2626" strokeWidth="2"/>
                {/* Gamba sinistra */}
                <ellipse cx="120" cy="230" rx="15" ry="50" fill="#fef3f2" stroke="#dc2626" strokeWidth="2"/>
                {/* Gamba destra */}
                <ellipse cx="80" cy="230" rx="15" ry="50" fill="#fef3f2" stroke="#dc2626" strokeWidth="2"/>
              </g>
            )}
          </svg>

          {/* Interactive Points */}
          {!isLoading && points
            .filter(point => {
              // Filtra punti per vista (logic semplificata)
              if (viewMode === 'front') return !point.code.includes('GB20')
              return point.code.includes('GB20')
            })
            .map(point => (
              <button
                key={point.id}
                onClick={() => handlePointClick(point)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 ${
                  selectedPointId === point.id ? 'scale-125 z-20' : 'hover:z-10'
                }`}
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                }}
              >
                <div className={`relative ${getDifficultyColor(point.difficulty_level)} rounded-full p-3 shadow-lg hover:shadow-xl`}>
                  <MapPin className="h-4 w-4 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"></div>
                </div>
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity bg-black/80 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap pointer-events-none">
                  {point.code} - {point.name}
                </div>
              </button>
            ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Facile</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Medio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Avanzato</span>
          </div>
        </div>
      </div>

      {/* Point Details Popup */}
      {selectedPoint && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                📍 {selectedPoint.name}
              </h3>
              <span className="inline-block bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold">
                {selectedPoint.code}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-2xl p-4">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Posizione
                </h4>
                <p className="text-gray-700">{selectedPoint.location_description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-2xl p-4">
                  <h5 className="font-bold text-blue-800 mb-1 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Durata
                  </h5>
                  <p className="text-blue-700 text-lg font-semibold">{selectedPoint.pressure_duration}s</p>
                </div>

                <div className="bg-purple-50 rounded-2xl p-4">
                  <h5 className="font-bold text-purple-800 mb-1 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Livello
                  </h5>
                  <p className="text-purple-700 font-semibold">{getDifficultyText(selectedPoint.difficulty_level)}</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              🎯 Inizia Sessione Guidata
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
