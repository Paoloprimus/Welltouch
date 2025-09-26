import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    // Simulazione LLM (sostituiremo con OpenAI vero)
    const analysis = analyzeSymptoms(message.toLowerCase())
    
    // Cerca il punto nel database
    const { data: point, error } = await supabase
      .from('digipoints')
      .select('*')
      .eq('code', analysis.suggestedPointCode)
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      response: analysis.response,
      suggestedPoint: point
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Errore nel processare la richiesta' },
      { status: 500 }
    )
  }
}

// Simulazione intelligenza (da sostituire con OpenAI)
function analyzeSymptoms(message: string) {
  if (message.includes('mal di testa') || message.includes('cefalea') || message.includes('emicrania')) {
    return {
      suggestedPointCode: 'LI4',
      response: 'Capisco che hai mal di testa. Il punto LI4 (Hegu) è uno dei più efficaci per questo disturbo. Si trova tra pollice e indice ed è molto facile da localizzare.'
    }
  }
  
  if (message.includes('stress') || message.includes('ansia') || message.includes('tensione') || message.includes('nervoso')) {
    return {
      suggestedPointCode: 'EX-HN5',
      response: 'Vedo che stai vivendo stress e tensione. Il punto Yintang (EX-HN5) è perfetto per calmare la mente e ridurre l\'ansia. Si trova al centro della fronte.'
    }
  }
  
  if (message.includes('collo') || message.includes('cervicale') || message.includes('spalle')) {
    return {
      suggestedPointCode: 'GB20',
      response: 'La tensione al collo è molto comune. Il punto GB20 (Feng Chi) è specifico per questi disturbi. Si trova alla base del cranio ed è molto efficace.'
    }
  }
  
  if (message.includes('sonno') || message.includes('dormire') || message.includes('insonnia')) {
    return {
      suggestedPointCode: 'EX-HN5',
      response: 'I problemi del sonno possono essere molto frustranti. Il punto Yintang può aiutarti a rilassare la mente e favorire un sonno più sereno.'
    }
  }

  // Default
  return {
    suggestedPointCode: 'LI4',
    response: 'Ti consiglio di iniziare con il punto LI4 (Hegu), è uno dei più versatili e efficaci per molti disturbi comuni.'
  }
}
