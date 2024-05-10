'use client';

import PomodoroTimer from '@/components/pomodoro/pomodoro';
import { ChangeEvent, useState } from 'react';

export default function Start() {
  const [selectedTab, setSelectedTab] = useState('menu');

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className="info">여기는 나의 정보</div>
      <input type="radio" name="tab" id="menu" defaultChecked />
      <div className="container">
        <input type="radio" name="tab" id="timer" />
        <section className={'timer'}>
          <label htmlFor="timer">
            <h1>Timer</h1>
            <PomodoroTimer />
          </label>
        </section>
        <input type="radio" name="tab" id="about" />
        <section className={'about'}>
          <h1>About</h1>
          <label htmlFor="about"></label>
        </section>
        <input type="radio" name="tab" id="work" />
        <section className={'work'}>
          <h1>Work</h1>
          <label htmlFor="work"></label>
        </section>
        <input type="radio" name="tab" id="contact" />
        <section className={'contact'}>
          <h1>Contact</h1>
          <label htmlFor="contact"></label>
        </section>
      </div>
      <div className="menu">
        <div>
          <label htmlFor="menu"></label>
          <label htmlFor="timer"></label>
        </div>
      </div>
    </div>
  );
}
