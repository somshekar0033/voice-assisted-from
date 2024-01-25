import React from "react";
import styles from "./VoiceListenAnimation.module.css";

export default function VoiceListenAnimation() {
  return (
    <>
      <div className={styles.container}>
        <button className={styles.speech} />
        <i className="fa fa-microphone" aria-hidden="true"></i>
        <div className={styles.pulsering}></div>
      </div>
    </>
  );
}
