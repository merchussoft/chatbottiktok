import { useState, useEffect, useCallback } from "react";

export const useSpeechSynthesis = () => {
    const [voices, setVoices] = useState([]);
    
    useEffect(() => {
        const loadVoices = () => {
            const voicesList = window.speechSynthesis.getVoices();
            setVoices(voicesList);
        };

        // Verifica si las voces ya están disponibles
        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
        } else {
            loadVoices();
        }

        // Limpia el event listener al desmontar el componente
        return () => {
            window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
        };
      }, []);

    const speak = useCallback((message) => {
        if ('speechSynthesis' in window) {

            const enabled = JSON.parse(localStorage.getItem('enabled'));
            const selectedVoiceName = localStorage.getItem('selectedVoice');

            if(!enabled) {
                console.warn('La sintesis de voz esta deshabilitada');
                return
            }

            const utterance = new SpeechSynthesisUtterance(message);
            console.log('aqui llegamos ', utterance)
            
            const selectedVoice = voices.find(v => v.name === selectedVoiceName)

            utterance.voice = selectedVoice
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("La síntesis de voz no es compatible con este navegador.");
        }
    }, [voices])

    return speak;
}