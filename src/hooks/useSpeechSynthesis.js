import { useCallback } from "react";

const useSpeechSynthesis = () => {

    const speak = useCallback((message) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(message);
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("La síntesis de voz no es compatible con este navegador.");
        }
    }, [])

    return speak;
}


export default useSpeechSynthesis;