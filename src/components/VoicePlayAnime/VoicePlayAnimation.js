import React from "react";
import styles from "./VoicePlayAnimation.module.css";

export default function VoicePlayAnimation({ barColor }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bars}>
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className={styles.bar}
              style={{ backgroundColor: barColor }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
