'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import PomodoroTimer from '../pomodoro/pomodoro';
import './main.css';
import Board from '../board/board';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Main() {
  const [menuChecked, setMenuChecked] = useState<string>('menu');
  const router = useRouter();

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

  const handleMenu = (value: ChangeEvent) => {
    const id = value.target.id;
    router.push(`?id=${id}`);
    setMenuChecked(id);
  };

  return (
    <div>
      <input type="radio" name="tab" id="menu" checked={menuChecked === 'menu'} onChange={handleMenu} />
      <div className="container">
        <input type="radio" name="tab" id="timer" checked={menuChecked === 'timer'} onChange={handleMenu} />
        <section className={'timer'}>
          <label htmlFor="timer">
            <h1>Timer</h1>
            <PomodoroTimer />
          </label>
        </section>
        <input type="radio" name="tab" id="board" checked={menuChecked === 'board'} onChange={handleMenu} />
        <section className={'board'}>
          <label htmlFor="board">
            <h1 className="top">Board</h1>
            <Board />
          </label>
        </section>
        <input type="radio" name="tab" id="youTube" checked={menuChecked === 'youTube'} onChange={handleMenu} />
        <section className={'youTube'}>
          <h1 className="top">YouTube</h1>
          <label htmlFor="youTube"></label>
        </section>
        <input type="radio" name="tab" id="myStudy" checked={menuChecked === 'myStudy'} onChange={handleMenu} />
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
