'use client';

import React, { useState, useEffect } from 'react';
import styles from './pomodoro.module.css';
import bellSound from '@/public/sounds/bell.mp3'; // 종소리 파일 경로

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false); // 추가된 상태 변수

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isActive) {
      intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalId);
            // 타이머 종료 시 작업 추가
            setIsFinished(true); // 타이머 종료 시 상태 변경
            playBellSound(); // 종소리 재생
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(2);
    setIsFinished(false); // 초기화 시 상태 변경
  };

  const playBellSound = () => {
    const audio = new Audio(bellSound);
    audio.play();
  };

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={toggleTimer}>
          {isActive ? '일시정지' : '시작'}
        </button>
        <button className={styles.button} onClick={resetTimer}>
          초기화
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
