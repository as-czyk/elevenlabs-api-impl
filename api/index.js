import { ElevenLabsApi } from  './ElevenlabsApi.js'

const models = await ElevenLabsApi.getModels()
const voices = await ElevenLabsApi.getVoices();

// Function to get the initial state of the app; set models and voices in the dropdowns; invoked immediately
const initialUiState = (() => {

    const voicesSelect = document.getElementById('voiceDropdown');
    const modelsSelect = document.getElementById('modelDropdown');

    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voice.id;
        option.text = voice.name;
        voicesSelect.appendChild(option);
    });

    models.forEach((model) => {
        const option = document.createElement('option');
        option.value = model.model_id;
        option.text = model.name;
        modelsSelect.appendChild(option);
    });
})();


const onAudioSubmit = async (event) => {
    event.preventDefault();
    toggleLoader()

    const text = document.getElementById('textArea').value;
    const voiceId = document.getElementById('voiceDropdown').value;
    const modelId = document.getElementById('modelDropdown').value;

    const audio = await ElevenLabsApi.textToSpeech(text, voiceId, modelId);
    
    toggleLoader()
    audio.start();
}


/* Helpers */

// Function to toggle the loader
const toggleLoader = () => {
    document.getElementById('loaderContainer').classList.toggle('visible')
}


/* Event Listeners */

// Onclick Event Handler for the Button, fires onFormSubmit function
document.getElementById('generateAudio').addEventListener('click', onAudioSubmit);