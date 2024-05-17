'use client';

import BoardTable from './table';
import { Button, ButtonGroup } from '@chakra-ui/react';
import style from './board.module.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const DynamicTuiEditor = dynamic(() => import('./tuiEditor'), {
  ssr: false,
  // loading: () => <p>Loading...</p>,
});

export default function Board() {
  const [boardState, setBoardState] = useState<string>('board');
  const [data, setData] = useState<any[]>([]);
  const queryParams = useSearchParams();

  const handleWriteBtn = () => {
    setBoardState('write');
  };

  const handleBoardBtn = () => {
    setBoardState('board');
  };

  useEffect(() => {
    if (queryParams) {
      const id = queryParams.get('id');
      if (id === 'board' && boardState === 'board') {
        console.log('board refresh!');
        setData([]);
      }
    }
  }, [queryParams, boardState]);

  return (
    <div className={style.container}>
      {boardState === 'board' ? <BoardTable data={data} /> : null}
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
