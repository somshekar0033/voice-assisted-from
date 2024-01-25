import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import VoicePlayAnimation from "../VoicePlayAnime/VoicePlayAnimation";
import styles from "./HeaderCard.module.css";

const audioStyle = {
  position: "absolute",
  left: "-9999px",
};

const HeaderCard = ({ configValue, onNext }) => {
  const audioRef = useRef();
  const [isSpeaking, setIsSpeaking] = useState(false);
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
      onNext("new value");
    };
    audioElement.addEventListener("canplay", handleCanPlay);
    audioElement.addEventListener("ended", handleEnded);
    // Clean up the event listener when the component unmounts
    return () => {
      audioElement.removeEventListener("canplay", handleCanPlay);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [configValue]);

  return (
    <>
      {isSpeaking && (
        <div className={styles.backdrop}>
          <VoicePlayAnimation barColor={barColor} />
        </div>
      )}
      <audio ref={audioRef} style={audioStyle} controls />
      <Card
        sx={{
          maxWidth: 1000,
          margin: "auto",
          borderRadius: 5,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s",
          "&:hover": {
            //   boxShadow: "0px 4px 20px rgba(211, 238, 203, 255)",
          },
          background: "transparent",
        }}
      >
        <CardHeader
          title={configValue.title}
          subheader={configValue.subtitle}
          sx={{ textAlign: "center" }}
        />
      </Card>
    </>
  );
};

export default HeaderCard;
