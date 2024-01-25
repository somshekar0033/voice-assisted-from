import axios from "axios";
const APIURL_STT =
  "https://demo.botaiml.com/indic2en/lang_transcribe?language=";

export const getTranscription = async (audioBlob, lang) => {
  let paramLang;
  switch (lang) {
    case "English":
      paramLang = "en";
      break;

    case "Hindi":
      paramLang = "hi";
      break;

    default:
      paramLang = "en";
      break;
  }
  try {
    // Convert Blob to File
    const audioFile = new File([audioBlob], "audio.wav", {
      type: "audio/wav",
    });

    // Create FormData and append the audio file
    const formData = new FormData();
    formData.append("file", audioFile);
    // Make a POST request to the API with requestOptions
    const response = await axios.post(`${APIURL_STT}${paramLang}`, formData);

    if (response.status === 200) {
      const transcriptionMatch =
        response.data.transcription.match(/\[([^)]+)\]/);

      if (transcriptionMatch && transcriptionMatch[1]) {
        const transcriptionText = transcriptionMatch[1].trim();
        return transcriptionText;
      } else {
        console.error(
          "Invalid transcription format:",
          response.data.transcription
        );
      }
    } else {
      console.error(
        "API request failed:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error sending audio to API:", error);
  }
};
