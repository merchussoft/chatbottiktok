import { useCallback, useEffect, useState } from "react";

export const useSpeechSynthesis = (voiceName = "Microsoft Sabina - Spanish (Mexico)") => {

    const [ voices, setVoice ] = useState([]);

    useEffect(() => {
        const updateVoices = () => {
            const available_voices = window.speechSynthesis.getVoices();
            setVoice(available_voices)
        }

        window.speechSynthesis.addEventListener("voicesChanged", updateVoices)
        updateVoices();
        
        return () => window.speechSynthesis.removeEventListener("voicesChanged", updateVoices)
    }, []);

    const speak = useCallback((message) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(message);

            const selected_voice = voices.find(voice => voice.name === voiceName);
            
            if(selected_voice) {
                utterance.voice = selected_voice;
            } else {
                console.warn(`Voz '${voiceName}' no encontrada, usando la predeterminada.`)
            }

            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("La síntesis de voz no es compatible con este navegador.");
        }
    }, [voices, voiceName])

    return speak;
}