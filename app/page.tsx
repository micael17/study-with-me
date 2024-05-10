import Info from '@/components/info/info';
import PomodoroTimer from '@/components/pomodoro/pomodoro';
import { useEffect } from 'react';

export default function Start() {
  /* useEffect(() => {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        const menu = document.getElementById('menu');
        if (menu) {
          menu.click();
        }
      }
    });
  }, []); */

  return (
    <div>
      <Info />
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
