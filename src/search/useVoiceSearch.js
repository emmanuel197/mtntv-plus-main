// Voice search with the browser's built-in speech recognition (Chrome, Edge, Safari).
// start() asks for the microphone and listens once. onText gets what was said; onError gets a
// message for the red "Voice input failed" card (mic blocked, nothing heard, or not supported).
import { useRef, useState } from 'react'

const FAILED = 'Mic permission denied or no input captured'

export function useVoiceSearch({ onText, onError }) {
  const [listening, setListening] = useState(false)
  const recognizer = useRef(null)

  const start = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Recognition) {
      onError('Voice search isn’t supported in this browser')
      return
    }
    if (listening) {
      recognizer.current?.stop()
      return
    }
    const r = new Recognition()
    r.lang = 'en-GB'
    r.interimResults = false
    r.maxAlternatives = 1
    let heard = false
    r.onresult = (e) => {
      heard = true
      onText(e.results[0][0].transcript)
    }
    r.onerror = () => {
      heard = true // stops onend below from reporting the same failure twice
      onError(FAILED)
    }
    r.onend = () => {
      setListening(false)
      if (!heard) onError(FAILED)
    }
    recognizer.current = r
    setListening(true)
    try {
      r.start()
    } catch {
      setListening(false)
      onError(FAILED)
    }
  }

  return { listening, start }
}
