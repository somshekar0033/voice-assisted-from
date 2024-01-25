import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import CheckIcon from "@mui/icons-material/Check";
import { getTranscription } from "../../services/speech-to-text.service";
import styles from "./DynamicTextField.module.css";
import VoicePlayAnimation from "../VoicePlayAnime/VoicePlayAnimation";
import { CircularProgress } from "@mui/material";
const audioStyle = {
  position: "absolute",
  left: "-9999px",
};

const DynamicTextField = ({lang, configValue, onNext }) => {
  const audioRef = useRef();
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [stream, setStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [buttonText, setButtonText] = useState("Answer");
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [iswaiting, setiswaiting] = useState(false);
  const barColor = "rgb(57,112,238)";

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.src = configValue.audioUrl;

    // Use the 'loadeddata' event to ensure the audio is loaded before attempting to play
    const handleCanPlay = () => {
      setIsSpeaking(true);
      audioElement.play();
    };
    const handleEnded = () => {
      // When audio playback is completed, hide the speaking animation
      setIsSpeaking(false);
    };
    audioElement.addEventListener("canplay", handleCanPlay);
    audioElement.addEventListener("ended", handleEnded);
    // Clean up the event listener when the component unmounts
    return () => {
      audioElement.removeEventListener("canplay", handleCanPlay);
      audioElement.removeEventListener("ended", handleEnded);
      setButtonText("Answer");
      setTranscription("");
    };
  }, [configValue]);

  useEffect(() => {
    const initializeRecorder = async () => {
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setStream(audioStream);
        const audioRecorder = new MediaRecorder(audioStream);
        setRecorder(audioRecorder);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    initializeRecorder();

    return () => {
      // Cleanup: Stop recording and release the microphone when the component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    if (!recorder) {
      console.error("Recorder not initialized.");
      return;
    }
    setIsRecording(true);
    setButtonText("Done");
    const chunks = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = () => {
      const audioBlob = new Blob(chunks, { type: "audio/wav" });
      setAudioBlob(audioBlob);
      setiswaiting(true);
    };

    recorder.start();
  };

  const stopRecording = () => {
    if (!recorder) {
      console.error("Recorder not initialized.");
      return;
    }
    setIsRecording(false);
    setButtonText("Re-do");
    // Stop the recording.
    recorder.stop();
  };
  const handleButtonClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  const handleTextFieldChange = (event) => {
    // Update the transcription state when the text field value changes
    setTranscription(event.target.value);
  };
  useEffect(() => {
    const sendAudioToAPI = async () => {
      if (!audioBlob) {
        console.error("No audio to send.");
        return;
      }
      let res = await getTranscription(audioBlob, lang);
      setTranscription(res);
      setiswaiting(false);
    };
    if (audioBlob) {
      sendAudioToAPI();
    }
  }, [audioBlob]);

  const handleDoneButtonClick = () => {
    if (transcription) {
      onNext(transcription);
    }
  };

  useEffect(() => {
    console.log(iswaiting);
  }, [iswaiting]);

  return (
    <>
      {isSpeaking && (
        <div className={styles.backdrop}>
          <VoicePlayAnimation barColor={barColor} />
        </div>
      )}
      <audio ref={audioRef} style={audioStyle} controls />
      <Typography variant="body" gutterBottom>
        <Card
          sx={{
            maxWidth: 1000,
            margin: "auto",
            borderRadius: 5,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s",
            "&:hover": {
              boxShadow: "0px 4px 20px rgba(233, 238, 203, 255)",
            },
            //   marginTop: 25,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {configValue.question}
            </Typography>

            {!isSpeaking && (
              <>
                <TextField
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  label={configValue.label}
                  htmlFor={configValue.for}
                  value={transcription}
                  onChange={handleTextFieldChange}
                  sx={{ marginTop: "5px" }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={isRecording ? <CheckIcon /> : <MicIcon />}
                    onClick={handleButtonClick}
                  >
                    {buttonText}
                  </Button>
                  <Button
                    variant="outlined"
                    style={{
                      color: transcription ? "green" : "grey",
                      borderColor: transcription ? "green" : "grey",
                    }}
                    startIcon={<CheckIcon />}
                    disabled={!transcription}
                    onClick={handleDoneButtonClick}
                  ></Button>
                </div>
              </>
            )}

            {iswaiting && (
              <div
                style={{
                  position: "absolute", // Change to absolute
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                  // background: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <CircularProgress />
              </div>
            )}
          </CardContent>
        </Card>
      </Typography>
    </>
  );
};

export default DynamicTextField;
