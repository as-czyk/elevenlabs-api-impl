import { ELEVENLABS_API_KEY } from '../config.js';

const BASE_URL = "https://api.elevenlabs.io/v1";
const REQUEST_HEADERS = {
    'Content-Type': 'application/json',
    'xi-api-key': ELEVENLABS_API_KEY
};

/**
 * @namespace ElevenLabsApi
 * @description Represents the API for interacting with ElevenLabs.
 */

const ElevenLabsApi = {
    
    /**
     * @function getVoices
     * @description Retrieves the available voices from the ElevenLabs API.
     * @returns {Promise<Array<Voice>>} The array of available voices.
     */

    getVoices: async () => {
        try {
            const response = await fetch(`${BASE_URL}/voices`, {
                headers: REQUEST_HEADERS,
                method: 'GET',
            })

            const data = await response.json();

            return data.voices.map((voice) => {
                return {
                    name: voice.name,
                    id: voice.voice_id
                }
            })
        } catch (e) {
            console.error("Error occurred", e)
        }
    },

    /**
     * @function getModels
     * @description Retrieves the available models from the ElevenLabs API.
     * @returns {Promise<Array<Model>>} The array of available models.
     */

    getModels: async () => {
        try {
            const response = await fetch(`${BASE_URL}/models`, {
                headers: REQUEST_HEADERS,
                method: 'GET',
            })

            return await response.json();
        } catch (e) {
            console.error("Error occurred", e)
        }
    },



    /**
     * Converts text into speech.
     *
     * @param {string} text - The text to be converted into speech.
     * @param {Object} options - Configuration options for the speech.
     * @param {string} options.voice - The voice to be used for the speech.
     * @param {number} options.rate - The speed at which the speech should be spoken.
     * @param {number} options.pitch - The pitch at which the speech should be spoken.
     * @returns {Promise<Blob>} A Promise that resolves to a Blob representing the speech audio.
     * 
     * Note: Further Impl can be done to support the voice_settings object.
     */

    textToSpeech: async (textToConvert = "Hello World", voiceId = "2EiwWnXFnvU5JabPnv8n") => {

        const audioCtx = new AudioContext();

        try {
            const response = await fetch(`${BASE_URL}/text-to-speech/${voiceId}`, {
                headers: {
                    ...REQUEST_HEADERS,
                    accept: '*/*',
                },
                method: 'POST',
                body: JSON.stringify({
                    model_id: "eleven_monolingual_v1",
                    text: textToConvert,
                    voice_settings: {
                        similarity_boost: 0.5,
                        stability: 0.5,
                        style: 0.5,
                        use_speaker_boost: false
                    }
                })
            })

            const arrayBuffer = await response.arrayBuffer();
            const buffer = await audioCtx.decodeAudioData(arrayBuffer);
            const data = (() => {
                const source = new AudioBufferSourceNode(audioCtx);
                source.buffer = buffer;
                source.connect(audioCtx.destination);
                return source;
            })()

            return data;

        } catch (e) {
            console.error("Error occurred", e)
        }



    }
}

export { ElevenLabsApi }