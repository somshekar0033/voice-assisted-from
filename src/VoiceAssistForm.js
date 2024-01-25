import React, { useState, useRef, useEffect } from "react";

const SpeechToTextForm = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([
    "What is your application number?",
    "What is your name?",
    "Please provide a brief description of your request.",
    // Add more questions as needed
  ]);

  const [transcriptions, setTranscriptions] = useState([]);
  const [audioFile, setAudioFile] = useState(null);

  const audioRef = useRef(null);

  useEffect(() => {
    // Automatically play the audio prompt when the component mounts
    audioRef.current.play();
  }, [currentQuestionIndex]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
  };

  const handlePlayQuestion = () => {
    audioRef.current.play();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAudioFile(null); // Reset audio file for the new question
    } else {
      // All questions completed, submit the responses
      submitResponses();
    }
  };

  const submitResponses = async () => {
    try {
      if (!audioFile) {
        console.error("Please record your response before proceeding.");
        return;
      }

      const formData = new FormData();
      formData.append("audio", audioFile);

      const response = await fetch(
        "https://demo.botaiml.com/indic2en/speech-to-text",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setTranscriptions(result.transcription);
      } else {
        console.error("Error converting speech to text");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Speech to Text Form</h1>
      <p>{questions[currentQuestionIndex]}</p>
      <audio
        ref={audioRef}
        src={`/audio/question_${currentQuestionIndex + 1}.mp3`}
      />
      <button onClick={handlePlayQuestion}>Play Question</button>
      <br />
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <br />
      <button onClick={handleNextQuestion}>Next Question</button>
      <p>Responses:</p>
      <ul>
        {transcriptions.map((response, index) => (
          <li key={index}>{response}</li>
        ))}
      </ul>
    </div>
  );
};

export default SpeechToTextForm;
