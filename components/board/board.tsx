'use client';

import BoardTable from './table';
import { Button, ButtonGroup } from '@chakra-ui/react';
import style from './board.module.css';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicTuiEditor = dynamic(() => import('./tuiEditor'), {
  // loading: () => <p>Loading...</p>,
});

export default function Board() {
  const [boardState, setBoardState] = useState<string>('board');

  const handleWriteBtn = () => {
    setBoardState('write');
  };

  const handleBoardBtn = () => {
    setBoardState('board');
  };

  return (
    <div className={style.container}>
      {boardState === 'board' ? <BoardTable /> : null}
      {boardState === 'write' ? <DynamicTuiEditor /> : null}
      <Button colorScheme="blue" onClick={handleWriteBtn}>
        글쓰기
      </Button>
      <Button colorScheme="blue" onClick={handleBoardBtn}>
        게시판으로 가기
      </Button>
    </div>
  );
}
