'use client';

import BoardTable from './table';
import { Button, ButtonGroup } from '@chakra-ui/react';
import style from './board.module.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Viewer from './viewer';

const DynamicEditor = dynamic(() => import('./editor'), {
  ssr: false,
  // loading: () => <p>Loading...</p>,
});

export default function Board() {
  const [boardState, setBoardState] = useState<string>('board');
  const [boardData, setBoardData] = useState<any[]>([]);
  const [writing, SetWriting] = useState<Writing>();
  const queryParams = useSearchParams();

  const handleWriteBtn = () => {
    setBoardState('write');
  };

  const handleBoardBtn = () => {
    setBoardState('board');
  };

  const getBoardData = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from('board').select(`
      *,
      member(id)
    `);

    if (data) {
      setBoardData(data);
      console.log(boardData);
    }
  };

  const handleDataFromChild = (writing: Writing) => {
    SetWriting(writing);
    setBoardState('view');
  };

  useEffect(() => {
    if (queryParams) {
      const id = queryParams.get('id');
      if (id !== 'board') {
        setTimeout(() => {
          setBoardState('board');
        }, 500);
      } else if (id === 'board' && boardState === 'board') {
        console.log('board refresh!');
        getBoardData();
      }
    }
  }, [queryParams, boardState]);

  return (
    <div className={style.container}>
      {boardState === 'board' ? <BoardTable onDataSend={handleDataFromChild} data={boardData} /> : null}
      {boardState === 'write' ? <DynamicEditor /> : null}
      {boardState === 'view' && writing ? <Viewer writing={writing} /> : null}
      <div className={style.buttons}>
        <Button className={style.button} onClick={handleWriteBtn}>
          글쓰기
        </Button>
        <Button className={style.button} onClick={handleBoardBtn}>
          게시판으로 가기
        </Button>
      </div>
    </div>
  );
}
