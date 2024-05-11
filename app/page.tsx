import Info from '@/components/info/info';
import Main from '@/components/main/main';
import PomodoroTimer from '@/components/pomodoro/pomodoro';
import { useEffect } from 'react';

export default function Start() {
  return (
    <div>
      <Info />
      <Main />
    </div>
  );
}
