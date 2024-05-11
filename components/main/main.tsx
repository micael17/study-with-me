'use client';

import { useEffect } from 'react';
import PomodoroTimer from '../pomodoro/pomodoro';
import './main.css';

export default function Main() {
  useEffect(() => {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        const menu = document.getElementById('menu');
        if (menu) {
          menu.click();
        }
      }
    });
  }, []);

  return (
    <div>
      <input type="radio" name="tab" id="menu" defaultChecked />
      <div className="container">
        <input type="radio" name="tab" id="timer" />
        <section className={'timer'}>
          <label htmlFor="timer">
            <h1>Timer</h1>
            <PomodoroTimer />
          </label>
        </section>
        <input type="radio" name="tab" id="board" />
        <section className={'board'}>
          <h1>Board</h1>
          <label htmlFor="board"></label>
        </section>
        <input type="radio" name="tab" id="youTube" />
        <section className={'youTube'}>
          <h1>YouTube</h1>
          <label htmlFor="youTube"></label>
        </section>
        <input type="radio" name="tab" id="myStudy" />
        <section className={'myStudy'}>
          <h1>My Study</h1>
          <label htmlFor="myStudy"></label>
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