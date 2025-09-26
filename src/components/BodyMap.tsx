// Aggiungi import
import BodyMap from '@/components/BodyMap'

// Aggiungi state per controllo mappa
const [showBodyMap, setShowBodyMap] = useState(false)

// Sostituisci il bottone "Esplora Mappa Corporea" con:
<button 
  onClick={() => setShowBodyMap(true)}
  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-green-700 hover:to-blue-700 transition-all"
>
  <Map className="h-5 w-5" />
  Esplora Mappa Corporea
</button>

// Aggiungi modal per la mappa:
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
      
      <BodyMap onPointSelect={(point) => {
        // Qui puoi gestire la selezione del punto
        console.log('Punto selezionato:', point)
      }} />
    </div>
  </div>
)}
