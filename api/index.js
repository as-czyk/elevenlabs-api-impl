import { ElevenLabsApi } from  './ElevenlabsApi.js'

/* Comment in audio to retrieve files */

const models = await ElevenLabsApi.getModels()
const voices = await ElevenLabsApi.getVoices();
//const audio = await ElevenLabsApi.textToSpeech();

console.log("MODELS", models);
console.log("VOICES", voices);

//audio.start()