'use client';

import BoardTable from './table';
import { Button, ButtonGroup } from '@chakra-ui/react';
import style from './board.module.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const DynamicTuiEditor = dynamic(() => import('./tuiEditor'), {
  ssr: false,
  // loading: () => <p>Loading...</p>,
});

export default function Board() {
  const [boardState, setBoardState] = useState<string>('board');
  const [boardData, setBoardData] = useState<any[]>([]);
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
      member:member_id (id)
    `);

    if (data) {
      setBoardData(data);
      console.log(boardData);
    }
  };

  useEffect(() => {
    if (queryParams) {
      const id = queryParams.get('id');
      if (id === 'board' && boardState === 'board') {
        console.log('board refresh!');
        getBoardData();
      }
    }
  }, [queryParams, boardState]);

  return (
    <div className={style.container}>
      {boardState === 'board' ? <BoardTable data={boardData} /> : null}
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
