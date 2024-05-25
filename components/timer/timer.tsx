'use client';

import React, { useState, useEffect } from 'react';
import style from './timer.module.css'; // CSS 파일을 별도로 관리한다고 가정합니다.
import bellSound from '@/public/sounds/bell.mp3'; // 종소리 파일 경로

export default function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 상태 불러오기
  useEffect(() => {
    const savedMinutes = localStorage.getItem('minutes');
    const savedSeconds = localStorage.getItem('seconds');
    const savedIsActive = localStorage.getItem('isActive');
    const savedIsFinished = localStorage.getItem('isFinished');
    setIsMounted(true);

    if (savedMinutes !== null) setMinutes(JSON.parse(savedMinutes));
    if (savedSeconds !== null) setSeconds(JSON.parse(savedSeconds));
    if (savedIsActive !== null) setIsActive(JSON.parse(savedIsActive));
    if (savedIsFinished !== null) setIsFinished(JSON.parse(savedIsFinished));
  }, []);

  useEffect(() => {
    if (isActive && typeof window !== 'undefined') {
      // 브라우저 환경인지 확인
      localStorage.setItem('minutes', JSON.stringify(minutes));
      localStorage.setItem('seconds', JSON.stringify(seconds));
      localStorage.setItem('isActive', JSON.stringify(isActive));
      localStorage.setItem('isFinished', JSON.stringify(isFinished));
    }

    let intervalId: NodeJS.Timeout;
    if (isActive) {
      intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalId);
            setIsFinished(true);
            setIsActive(false);
            playBellSound();
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
  }, [minutes, seconds, isActive, isFinished]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    localStorage.setItem('isActive', JSON.stringify(!isActive));
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsFinished(false);
  };

  const playBellSound = () => {
    const audio = new Audio(bellSound);
    audio.play();
  };

  const Timer = () => {
    return (
      <>
        <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
      </>
    );
  };

  return (
    <div className={style.timer_window}>
      <div className={style.timer}>
        {isMounted ? (
          Timer()
        ) : (
          <>
            <span>--</span>:<span>--</span>
          </>
        )}
      </div>
      <div className={style.buttons}>
        <button onClick={toggleTimer}>{isActive ? '일시정지' : '시작'}</button>
        <button onClick={resetTimer}>초기화</button>
      </div>
      {isFinished && <p>타이머가 종료되었습니다!</p>}
    </div>
  );
}
