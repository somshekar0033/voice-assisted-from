import React, { useState, useEffect, useRef } from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import VoicePlayAnimation from "./components/VoicePlayAnime/VoicePlayAnimation";
import styles from "./PMSForm.module.css";
import axios from "axios";
export default function PMSForm() {
  const audioRef = useRef();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [filePath, setfilePath] = useState(
    process.env.PUBLIC_URL + "/audios/welcome-note.wav"
  );
  const [stream, setStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [questio1Done, setquestio1Done] = useState(false);
  const [transcription, setTranscription] = useState("");
  const barColor = "rgb(57,112,238)";

  useEffect(() => {
    const audioElement = audioRef.current;
    // Set the audio file source
    audioElement.src = filePath;

    // Use the 'loadeddata' event to ensure the audio is loaded before attempting to play
    const handleCanPlay = () => {
      setIsSpeaking(true);
      audioElement.play();
    };
    const handleEnded = () => {
      // When audio playback is completed, hide the speaking animation
      setIsSpeaking(false);

      setTimeout(() => {
        setfilePath(process.env.PUBLIC_URL + "/audios/question_1.wav");
      }, 1000);
    };
    audioElement.addEventListener("canplay", handleCanPlay);
    audioElement.addEventListener("ended", handleEnded);
    // Clean up the event listener when the component unmounts
    return () => {
      audioElement.removeEventListener("canplay", handleCanPlay);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [filePath]);

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

  useEffect(() => {
    const startRecording = () => {
      if (!recorder) {
        console.error("Recorder not initialized.");
        return;
      }

      const chunks = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
      };

      recorder.start();
    };

    const stopRecording = () => {
      if (!recorder) {
        console.error("Recorder not initialized.");
        return;
      }

      // Stop the recording.
      recorder.stop();
    };

    if (
      !isSpeaking &&
      audioRef.current.src === "http://localhost:3000/audios/question_1.wav"
    ) {
      startRecording();
      setTimeout(() => {
        stopRecording();
        setquestio1Done(true);
      }, 6000);
    }
  }, [isSpeaking, recorder]);

  useEffect(() => {
    const playAudio = () => {
      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      }
    };

    const sendAudioToAPI = async () => {
      if (!audioBlob) {
        console.error("No audio to send.");
        return;
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
        const response = await axios.post(
          "https://demo.botaiml.com/indic2en/speech-to-text",
          formData
        );

        if (response.status === 200) {
          const transcriptionMatch =
            response.data.transcription.match(/\[([^)]+)\]/);

          if (transcriptionMatch && transcriptionMatch[1]) {
            const transcriptionText = transcriptionMatch[1].trim();
            setTranscription(transcriptionText);
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
    // if (audioBlob && questio1Done) {
    //   console.log("PLAY AUDIO");
    //   playAudio();
    // }
    if (audioBlob) {
      sendAudioToAPI();
    }
  }, [questio1Done, audioBlob]);

  const audioStyle = {
    position: "absolute",
    left: "-9999px",
  };

  return (
    <>
      {isSpeaking && (
        <div className={styles.backdrop}>
          <VoicePlayAnimation barColor={barColor} />
        </div>
      )}
      <audio ref={audioRef} style={audioStyle} controls />
      <Container sx={{ pt: 2, pb: 2 }}>
        <Box noValidate p={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h6">
                PM Street Vendor’s AtmaNirbhar Nidhi(PM SVANidhi)
              </Typography>
              <Typography variant="p">
                (Common Loan Application Form)
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box component="form" noValidate p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <TextField
                // className={classes.root}
                fullWidth
                id="application_number"
                label="Application Number"
                name="application_number"
                //   value={pmsLoanAppForm.application_number}
                // value={customerData.applicationNo}
                //   onChange={(e) => onValueChange(e, "pmsapplication")}
                color="secondary"
                focused
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <TextField
                // className={classes.root}
                fullWidth
                id="name_of_bank"
                label="Name of Bank/Lender"
                name="name_of_bank"
                //   value={pmsLoanAppForm.name_of_bank}
                //   onChange={(e) => onValueChange(e, "pmsapplication")}
                color="secondary"
                focused
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <TextField
                // className={classes.root}
                fullWidth
                id="name_of_street_vendor"
                label="Name of Street Vendor"
                name="name_of_street_vendor"
                //   value={pmsLoanAppForm.name_of_street_vendor}
                //   onChange={(e) => onValueChange(e, "pmsapplication")}
                color="secondary"
                focused
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <TextField
                // className={classes.root}
                fullWidth
                id="father_spouse_name"
                label="Father/Spouse Name"
                name="father_spouse_name"
                //   value={pmsLoanAppForm.father_spouse_name}
                //   onChange={(e) => onValueChange(e, "pmsapplication")}
                color="secondary"
                focused
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <TextField
                // className={classes.root}
                fullWidth
                id="dob"
                label="Date of Birth"
                name="dob"
                //   value={pmsLoanAppForm.father_spouse_name}
                //   onChange={(e) => onValueChange(e, "pmsapplication")}
                color="secondary"
                focused
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <TextField
                // className={classes.root}
                fullWidth
                id="marital_status"
                label="Marital Status"
                name="marrital_status"
                //   value={pmsLoanAppForm.marrital_status}
                //   onChange={(e) => onValueChange(e, "pmsapplication")}
                color="secondary"
                focused
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <TextField
                // className={classes.root}
                fullWidth
                id="mobile_number"
                label="Mobile Number"
                name="mobile_number"
                //   value={pmsLoanAppForm.mobile_number}
                //   onChange={(e) => onValueChange(e, "pmsapplication")}
                color="secondary"
                focused
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <TextField
                // className={classes.root}
                fullWidth
                id="gender"
                label="Gender"
                name="gender"
                //   value={pmsLoanAppForm.gender}
                //   onChange={(e) => onValueChange(e, "pmsapplication")}
                color="secondary"
                focused
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <TextField
                // className={classes.root}
                fullWidth
                id="social_category"
                label="Social Category"
                name="social_category"
                //   value={pmsLoanAppForm.social_category}
                //   onChange={(e) => onValueChange(e, "pmsapplication")}
                color="secondary"
                focused
              />
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              <FormControlLabel
                label="Are you vending in the same state you belong to?"
                control={
                  <Checkbox
                    id="samestate"
                    name="samestate"
                    //   checked={pmsLoanAppForm?.samestate}
                    title="Are you vending in the same state you belong to?"
                    //   onChange={(e) => onValueChecked(e)}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              <FormControlLabel
                label="Are you vending in the same district you belong to?"
                control={
                  <Checkbox
                    id="samedistrict"
                    name="samedistrict"
                    //   checked={pmsLoanAppForm?.samedistrict}
                    title="Are You vending In the same state you belong to?"
                    //   onChange={(e) => onValueChecked(e)}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              <FormControlLabel
                label="PwD (Divyagjan)"
                control={
                  <Checkbox
                    id="pwddivyagjan"
                    name="pwddivyagjan"
                    //   checked={pmsLoanAppForm?.pwddivyagjan}
                    //   onChange={(e) => onValueChecked(e)}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              <FormControlLabel
                label="Minority"
                control={
                  <Checkbox
                    id="minority"
                    name="minority"
                    //   checked={pmsLoanAppForm?.status}
                    //   onChange={(e) => onValueChecked(e)}
                  />
                }
              />
            </Grid>
            <>
              <Grid item xs={5} sm={5} md={3} lg={2}>
                <Button
                  fullWidth
                  type="button"
                  style={{ textTransform: "capitalize" }}
                  variant="contained"
                  // onClick={(e) => submitPMSApp(e)}
                >
                  Submit
                </Button>
              </Grid>
            </>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
