import { useState, useEffect } from 'react';
import { useSpeechSynthesis } from '../../hooks';


export const TtsChat = () => {

    const speak = useSpeechSynthesis();

    const [enabled, setEnabled] = useState(() => JSON.parse(localStorage.getItem('enabled')) ?? false);
    const [language, setLanguage] = useState(() => localStorage.getItem('language') ?? "es-MX");
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(() => localStorage.getItem('selectedVoice') ?? "");
    //const [randomVoice, setRandomVoice] = useState(false);


    useEffect(() => {
        const loadVoice = () => {
            const available_voices = window.speechSynthesis.getVoices();
            //console.log('mirando que llega a aqui por el momento ', available_voices);
            setVoices(available_voices.filter(v => v.lang.startsWith(language)));
        };

        loadVoice();
        window.speechSynthesis.onvoiceschanged = loadVoice;
    }, [language]);



    const handleEnabledChange = () => {
        const new_enabled = !enabled;
        setEnabled(new_enabled);
        localStorage.setItem('enabled', JSON.stringify(new_enabled))
    }


    const handleLanguageChange = (e) => {
        const new_language = e.target.value;
        setLanguage(new_language);
        localStorage.setItem('language', new_language)
    }

    const handleVoiceChange = (e) => {
        const new_selected_voice = e.target.value;
        setSelectedVoice(new_selected_voice);
        localStorage.setItem('selectedVoice', new_selected_voice);
    };

    const handleTestSpeech = () => {
        if(enabled) speak("esto es una prueba de voz")
    }

    
    return (
        <>
            <div> 
                <h1>Text-to-Speech Chat</h1>


            </div>

            <div className="bg-gray-900 p-5 rounded-xl shadow-md text-white max-w-sm">
                <h2 className="text-lg font-bold mb-3">General Settings</h2>

                <div className="mb-3">
                    <label htmlFor="" className="flex items-center gap-2">
                        <input type="checkbox" checked={enabled} onChange={handleEnabledChange} />
                        <span>Enabled</span>
                    </label>
                </div>

                <div className="mb-3">
                    <label className="block text-sm">Language</label>
                    <select className="w-full p-2 bg-gray-800 rounded" value={language} onChange={handleLanguageChange}>
                        <option value="">Seleccione una opcion</option>
                        <option value="es-MX">Español (México)</option>
                        <option value="de-DE">Deutsch (Deutschland)</option>
                        <option value="en-US">English (United States)</option>
                        <option value="en-GB">English (United Kingdom)</option>
                        <option value="es-ES">Español (España)</option>
                        <option value="es-US">Español (Estados Unidos)</option>
                        <option value="fr-FR">Français (France)</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="block text-sm">Voice <span className="text-red-500 text-xs">NEW!</span></label>
                    <select className='w-full p-2 bg-gray-800 rounded' value={selectedVoice} onChange={handleVoiceChange}>
                        <option value="">Seleccione una opcion</option>
                        {voices.map(v => <option key={v.name} value={v.name}>{v.name}</option>)}
                    </select>
                </div>

                <button className="bg-blue-500 px-4 py-2 rounded w-full mt-3" onClick={handleTestSpeech}>
                    Test Voice
                </button>
            </div>
        </>
    )
}