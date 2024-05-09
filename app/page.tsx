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
      <input
        type="radio"
        name="tab"
        id="menu"
        checked={selectedTab === 'menu'}
        onChange={() => handleTabChange('menu')}
      />
      <div className="container">
        <input
          type="radio"
          name="tab"
          checked={selectedTab === 'home'}
          onChange={() => handleTabChange('home')}
          id="home"
        />
        <section className={'home'}>
          <h1>Home</h1>
          <label htmlFor="home">
            <PomodoroTimer />
          </label>
        </section>
        <input
          type="radio"
          name="tab"
          checked={selectedTab === 'about'}
          onChange={() => handleTabChange('about')}
          id="about"
        />
        <section className={'about'}>
          <h1>About</h1>
          <label htmlFor="about"></label>
        </section>
        <input
          type="radio"
          name="tab"
          checked={selectedTab === 'work'}
          onChange={() => handleTabChange('work')}
          id="work"
        />
        <section className={'work'}>
          <h1>Work</h1>
          <label htmlFor="work"></label>
        </section>
        <input
          type="radio"
          name="tab"
          checked={selectedTab === 'contact'}
          onChange={() => handleTabChange('contact')}
          id="contact"
        />
        <section className={'contact'}>
          <h1>Contact</h1>
          <label htmlFor="contact"></label>
        </section>
      </div>
      <div className="menu">
        <div>
          <label htmlFor="menu"></label>
          <label htmlFor="home"></label>
        </div>
      </div>
    </div>
  );
}
